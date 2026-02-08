import { getExtFromMime } from "@/utils/handlers";
import { getUserId } from "./auth";
import { AddCoverType } from "..";
import { SupabaseClient } from "@supabase/supabase-js";
import { createServClient } from "../service/server";
import { createClient } from "../service/client";

const COVER = "cover";

export const saveCoverImg = async ({ year, month, originFile, resizeFile }: { year: string; month: string; originFile: File; resizeFile: Buffer }) => {
  const supabase = await createServClient();
  const id = await getUserId();
  if (!id) {
    throw new Error("id is required");
  }

  const originExt = getExtFromMime(originFile);
  const originPath = `${id}/${year}/${month}/origin_cover.${originExt}`;
  const resizePath = `${id}/${year}/${month}/cover.wepb`;

  const { data: files, error: fileErr } = await supabase.storage.from(COVER).list(`${id}/${year}/${month}`);

  if (fileErr) throw fileErr;

  const removeTargets = files?.filter((f) => f.name !== `cover.wepb` && f.name !== `origin_cover.${originExt}`) ?? [];

  if (removeTargets.length) {
    await supabase.storage.from(COVER).remove(removeTargets.map((f) => `${id}/${year}/${month}/${f.name}`));
  }

  const [origin, resize] = await Promise.all([
    supabase.storage.from(COVER).upload(originPath, originFile, {
      upsert: true,
      contentType: originFile.type,
    }),
    supabase.storage.from(COVER).upload(resizePath, resizeFile, {
      upsert: true,
      contentType: "image/webp",
      cacheControl: "public, max-age=86400",
    }),
  ]);

  if (origin.error) throw origin.error;
  if (resize.error) throw resize.error;

  const result = {
    origin: origin.data,
    resize: resize.data,
    base: `${id}/${year}/${month}`,
    id,
  };

  return result;
};

export const getCoverImgUrl = async (coverPath: string, supabase: SupabaseClient) => {
  if (!coverPath) return;

  const { data, error } = await supabase.storage.from(COVER).createSignedUrl(coverPath, 60 * 60);
  if (error) throw error;

  return data.signedUrl ?? null;
};

export const upsertCover = async (payload: AddCoverType) => {
  const supabase = await createServClient();

  const { data, error } = await supabase.from("month_cover").upsert(payload, { onConflict: "storage_id" }).select();

  if (error) throw error;

  return data;
};

export const selectCover = async (year: number, month: number, supabase: SupabaseClient) => {
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

  const { data: files, error } = await supabase.storage.from(COVER).list(path);
  if (error) throw error;

  if (files?.length) {
    const { error } = await supabase.storage.from(COVER).remove(files.map((f) => `${path}/${f.name}`));
    if (error) throw error;
  }

  const { data, error: delErr } = await supabase.from("month_cover").delete().eq("base_path", path);

  if (delErr) throw delErr;

  return data;
};
