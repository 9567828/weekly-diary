"use clinet";

import { FormEvent, useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import style from "./calendar.module.scss";
import { useUpsertCoverMutation } from "@/hooks/useMutation/useCoverMutation";
import { createPortal } from "react-dom";
import { getCroppedImage } from "@/hooks/getCroppedImg";
import { handleCoverInvalidateQueries } from "@/utils/handlers";
import { useQueryClient } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/useHooks";

interface ICropperProps {
  img: string;
  onClose: () => void;
  onSuccess: () => void;
  year: number;
  month: number;
}

export default function ImgCropper({ img, year, month, onClose, onSuccess }: ICropperProps) {
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const { mutate, isPending } = useUpsertCoverMutation();
  const [mount, setMount] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [croppedPixels, setCroppedPixels] = useState({ width: 0, height: 0, x: 0, y: 0 });

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedPixels(croppedAreaPixels);
  };

  const handleSaveImg = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!croppedPixels) return;
    const blob = await getCroppedImage(img, croppedPixels);
    const cropFile = new File([blob], "image.jpg", { type: blob.type });

    if (!cropFile) return;

    mutate(
      { year, month, croppedFile: cropFile },
      {
        onSuccess: (data) => {
          handleCoverInvalidateQueries(queryClient);
          onSuccess();
          onClose();
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  const handleImgRotation = () => {
    setRotate((prev) => prev + (90 % 360));
  };

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return createPortal(
    <div className={style["cropper-dim"]}>
      <form encType="multipart/form-data" onSubmit={handleSaveImg}>
        <div className={style["btn-wrap"]}>
          <button type="button" onClick={onClose}>
            <img src="/imgs/icons/ic_Close.svg" alt="닫기" />
          </button>
          <button type="submit" className={style["confirm-btn"]} disabled={isPending}>
            완료
          </button>
        </div>
        <Cropper image={img} crop={crop} zoom={zoom} rotation={rotate} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} onRotationChange={undefined} />
        <div className={style["controls-wrap"]}>
          {!isMobile && (
            <div className={style.control}>
              <img src="/imgs/icons/ic_zoom.svg" alt="확대" />
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(Number(e.target.value));
                }}
                className={style.range}
              />
            </div>
          )}
          <div>
            <button type="button" onClick={handleImgRotation}>
              <img src="/imgs/icons/ic_rotate.svg" alt="회원" />
            </button>
          </div>
        </div>
      </form>
    </div>,
    document.body,
  );
}
