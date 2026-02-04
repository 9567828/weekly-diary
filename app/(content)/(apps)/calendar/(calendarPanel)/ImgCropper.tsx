"use clinet";

import { useEffect, useState } from "react";
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
  originFile: File | null;
  onClose: () => void;
  onSuccess: () => void;
  year: number;
  month: number;
}

export default function ImgCropper({ img, originFile, year, month, onClose, onSuccess }: ICropperProps) {
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const { mutate, isPending } = useUpsertCoverMutation();
  const [mount, setMount] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState({ width: 0, height: 0, x: 0, y: 0 });

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedPixels(croppedAreaPixels);
  };

  const handleSaveImg = async () => {
    if (!croppedPixels) return;
    const blob = await getCroppedImage(img, croppedPixels);
    const cropFile = new File([blob], "image.jpg", { type: blob.type });

    if (!originFile || !cropFile) return;

    mutate(
      { year, month, originFile, croppedFile: cropFile },
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

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return createPortal(
    <div className={style["cropper-dim"]}>
      <div className={style["btn-wrap"]}>
        <button type="button" onClick={onClose}>
          <img src="/imgs/icons/ic_close.svg" alt="닫기" />
        </button>
        <button type="button" className={style["confirm-btn"]} onClick={handleSaveImg} disabled={isPending}>
          완료
        </button>
      </div>
      <Cropper image={img} crop={crop} zoom={zoom} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} />
      {!isMobile && (
        <div className={style.controls}>
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
            className={style["zoom-range"]}
          />
        </div>
      )}
    </div>,
    document.body,
  );
}
