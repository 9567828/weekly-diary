import { getExtFromMime } from "@/utils/handlers";
import { getUserId } from "./auth";
import { AddCoverType, CoverRow } from "..";
import { SupabaseClient } from "@supabase/supabase-js";
import { createServClient } from "../service/server";
import { createClient } from "../service/client";
import { v4 as uuid } from "uuid";

const ORIGIN_COVER = "origin_cover";
const RESIZE_COVER = "resize_cover";

export const saveCoverImg = async ({ year, month, resizeFile }: { year: string; month: string; resizeFile: Buffer }) => {
  const supabase = await createServClient();
  const id = await getUserId();
  if (!id) {
    throw new Error("id is required");
  }

  const basePath = `${id}/${year}/${month}`;
  const fileId = uuid();
  const resizePath = `${basePath}/resize_${fileId}.webp`;

  const { data: resizeFiles, error: resizeFileErr } = await supabase.storage.from(RESIZE_COVER).list(basePath);
  if (resizeFileErr) throw resizeFileErr;

  const removeResizeTargets = resizeFiles?.filter((f) => !f.name.includes("_resize"));

  if (removeResizeTargets.length) {
    await supabase.storage.from(RESIZE_COVER).remove(removeResizeTargets.map((f) => `${basePath}/${f.name}`));
  }

  const { data: resize, error: resizeErr } = await supabase.storage.from(RESIZE_COVER).upload(resizePath, resizeFile, {
    upsert: true,
    contentType: "image/webp",
    cacheControl: "public, max-age=86400",
  });

  if (resizeErr) throw resizeErr;

  const result = {
    resize,
    base: `${id}/${year}/${month}`,
    id,
  };

  return result;
};

export const upsertCover = async (payload: AddCoverType) => {
  const supabase = await createServClient();

  const { data, error } = await supabase.from("month_cover").upsert(payload, { onConflict: "user_id,year,month" }).select();

  if (error) throw error;

  return data;
};

export const selectCover = async (year: number, month: number, supabase: SupabaseClient): Promise<CoverRow> => {
  const id = await getUserId();
  if (!id) throw new Error("id is required");

  const { data, error } = await supabase.from("month_cover").select("*").eq("user_id", id).eq("year", year).eq("month", month).maybeSingle();
  if (error) throw error;

  return data;
};

export const deleteCover = async (path: string) => {
  const supabase = createClient();
  const id = await getUserId();
  if (!id) throw new Error("id is required");

  const { data: files, error } = await supabase.storage.from(RESIZE_COVER).list(path);

  if (error) throw error;

  if (files?.length) {
    const { error } = await supabase.storage.from(RESIZE_COVER).remove(files.map((f) => `${path}/${f.name}`));
    if (error) throw error;
  }

  const { data, error: delErr } = await supabase.from("month_cover").delete().eq("base_path", path);

  if (delErr) throw delErr;

  return data;
};
