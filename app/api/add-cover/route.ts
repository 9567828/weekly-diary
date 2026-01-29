import { AddCoverType } from "@/utils/supabase";
import { saveCoverImg, upsertCover } from "@/utils/supabase/sql/cover";
import { NextResponse } from "next/server";
import sharp from "sharp";

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const year = formData.get("year") as string;
  const month = formData.get("month") as string;

  const buffer = Buffer.from(await file.arrayBuffer());

  const resized = await sharp(buffer)
    .resize({ width: 1080, withoutEnlargement: true })
    .webp({
      quality: 70,
      effort: 6,
    })
    .toBuffer();

  const { origin, resize, id, base } = await saveCoverImg({ year, month, originFile: file, resizeFile: resized });

  const newObj: AddCoverType = {
    year: Number(year),
    month: Number(month),
    path: resize.path,
    base_path: base,
    origin_path: origin.path,
    storage_id: resize.id,
    user_id: id!,
  };

  const data = await upsertCover(newObj);

  return NextResponse.json({ result: data });
};
