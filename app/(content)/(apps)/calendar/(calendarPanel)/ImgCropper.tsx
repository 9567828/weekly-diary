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
import ImgLoading from "./ImgLoading";

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
  const [isProcessing, setIsProcessing] = useState(false);

  // const [prev, setPrev] = useState("");

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedPixels(croppedAreaPixels);
  };

  const handleSaveImg = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!croppedPixels) return;

    setIsProcessing(true);

    try {
      const blob = await getCroppedImage(img, croppedPixels, rotate);
      if (!blob) {
        setIsProcessing(false);
        return;
      }

      const cropFile = new File([blob], "image.jpg", { type: blob.type });

      if (!cropFile) return;

      // 이미지 테스트 용
      // const reader = new FileReader();
      // reader.readAsDataURL(cropFile);
      // reader.onload = () => {
      //   setPrev(reader.result as string);
      // };

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
            setIsProcessing(false);
          },
        },
      );
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  const handleImgRotation = () => {
    setRotate((prev) => prev + (90 % 360));
  };

  useEffect(() => {
    setMount(true);
  }, []);

  if (isProcessing || isPending) {
    return createPortal(
      <div className={style["loading-container"]}>
        <div className={style["loading-wrap"]}>
          <ImgLoading />
          <p>등록 중 입니다...</p>
        </div>
      </div>,
      document.body,
    );
  }

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

        <>
          <Cropper
            image={img}
            crop={crop}
            zoom={zoom}
            rotation={rotate}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={undefined}
          />
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
                <img src="/imgs/icons/ic_rotate.svg" alt="회전" />
              </button>
            </div>
          </div>
        </>

        {/* 테스트용 */}
        {/* {prev ? (
          <img src={prev} alt="미리보기" style={{ width: "100%", height: "100dvh", position: "absolute", top: "0", left: 0, aspectRatio: "4/3" }} />
        ) : (
          <>
            <Cropper
              image={img}
              crop={crop}
              zoom={zoom}
              rotation={rotate}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={undefined}
            />
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
                  <img src="/imgs/icons/ic_rotate.svg" alt="회전" />
                </button>
              </div>
            </div>
          </>
        )} */}
      </form>
    </div>,
    document.body,
  );
}
