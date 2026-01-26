import { getExtFromMime } from "@/utils/handlers";
import { createClient } from "../client";
import { getUserId } from "./auth";
import { AddCoverType } from "..";

const COVER = "cover";

export const saveCoverImg = async ({ year, month, file }: { year: number; month: number; file: File }) => {
  const supabase = createClient();
  const id = await getUserId();

  if (!id) {
    throw new Error("id is required");
  }

  const ext = getExtFromMime(file);
  const path = `${id}/${year}/${month}/cover.${ext}`;

  const { data: files, error: fileErr } = await supabase.storage.from(COVER).list(`${id}/${year}/${month}`);

  if (fileErr) throw fileErr;

  const removeTargets = files?.filter((f) => f.name !== `cover.${ext}`) ?? [];

  if (removeTargets.length) {
    await supabase.storage.from(COVER).remove(removeTargets.map((f) => `${id}/${year}/${month}/${f.name}`));
  }

  const { data, error } = await supabase.storage.from(COVER).upload(path, file, {
    upsert: true,
    contentType: file.type,
  });

  if (error) throw error;

  const result = {
    data,
    id,
  };

  return result;
};

export const getCoverImgUrl = async (coverPath: string) => {
  const supabase = createClient();
  if (!coverPath) return;

  const { data, error } = await supabase.storage.from(COVER).createSignedUrl(coverPath, 60 * 60);
  if (error) throw error;

  return data.signedUrl ?? null;
};

export const insertCover = async (payload: AddCoverType) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("month_cover").upsert(payload, { onConflict: "storage_id" }).select();

  if (error) throw error;

  return data;
};

export const selectCover = async (year: number, month: number) => {
  const supabase = createClient();
  const id = await getUserId();

  if (!id) throw new Error("id is required");

  const { data, error } = await supabase.from("month_cover").select("*").eq("user_id", id).eq("year", year).eq("month", month).maybeSingle();
  if (error) throw error;

  return data;
};
