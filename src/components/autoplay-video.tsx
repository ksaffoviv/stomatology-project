"use client";

import { useState } from "react";

type Props = {
  src: string;
  poster: string;
  title: string;
  className?: string;
};

export function AutoplayVideo({ src, poster, title, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const showStub = !src || failed;

  return (
    <>
      {!showStub ? (
        <video
          className={`absolute inset-0 h-full w-full object-cover ${className}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster || undefined}
          aria-label={title}
          disablePictureInPicture
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}

      {showStub ? (
        <div className="absolute inset-0 bg-sage-dark">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(236_228_214/0.18),transparent_55%)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/30 text-paper">
              <PlayIcon />
            </span>
            <p className="mt-4 font-serif text-xl text-paper">Видео клиники</p>
            <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-cream/75">
              Заглушка: зацикленный ролик кабинета появится, когда будет файл.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden>
      <path d="M8 5.5v11l9-5.5-9-5.5Z" />
    </svg>
  );
}
