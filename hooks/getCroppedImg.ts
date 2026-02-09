import { Area, Size } from "react-easy-crop";

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(width: number, height: number, rotation: number): Size {
  const rotRad = getRadianAngle(rotation);

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export async function getCroppedImage(imageSrc: string, pixelCrop: Area, rotate: number): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const { width: rotatedWidth, height: rotatedHeight } = rotateSize(image.width, image.height, rotate);

  canvas.width = rotatedWidth;
  canvas.height = rotatedHeight;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(getRadianAngle(rotate));
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  // 회전 된 전체 이미지에서 사용자가 선택한 영역 추출
  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

  // 최종 결과물 캔버스 크기 설정 (zoom이 반영된 최종 크기)
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.95);
  });
}

// 기본 줌 코드
// export async function getCroppedImage(imageSrc: string, crop: Area, size = 1080): Promise<Blob> {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d")!;

//   canvas.width = size;
//   canvas.height = size;

//   ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, size, size);

//   return new Promise((resolve) => {
//     canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.95);
//   });
// }

// 회전 된 코드
// export async function getCroppedImage(imageSrc: string, pixelCrop: Area, rotate: number): Promise<Blob> {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d")!;

//   const rotatedSize = rotateSize(image.width, image.height, rotate);

//   canvas.width = rotatedSize.width;
//   canvas.height = rotatedSize.height;

//   ctx.translate(canvas.width / 2, canvas.height / 2);
//   ctx.rotate((rotate * Math.PI) / 180);
//   ctx.translate(-image.width / 2, -image.height / 2);

//   ctx.drawImage(image, 0, 0);

//   return new Promise((resolve) => {
//     canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.95);
//   });
// }
