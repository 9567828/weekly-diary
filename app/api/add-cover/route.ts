import { AddCoverType } from "@/utils/supabase";
import { saveCoverImg, upsertCover } from "@/utils/supabase/sql/cover";
import { NextResponse } from "next/server";
import sharp from "sharp";

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const croppedFile = formData.get("croppedFile") as File;
  const year = formData.get("year") as string;
  const month = formData.get("month") as string;

  if (!(croppedFile instanceof File)) {
    return NextResponse.json({ message: "invalid file" }, { status: 400 });
  }

  const buffer = Buffer.from(await croppedFile.arrayBuffer());

  const resized = await sharp(buffer).webp({ quality: 80 }).toBuffer();

  const { resize, id, base } = await saveCoverImg({ year, month, resizeFile: resized });

  const newObj: AddCoverType = {
    year: Number(year),
    month: Number(month),
    path: resize.path,
    base_path: base,
    user_id: id!,
  };

  const data = await upsertCover(newObj);

  return NextResponse.json({ result: data });
};
