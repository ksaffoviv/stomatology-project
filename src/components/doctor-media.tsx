import Image from "next/image";

type Props = {
  name: string;
  photo: string;
  video?: string;
  className?: string;
};

export function DoctorMedia({ name, photo, video, className = "aspect-[4/3]" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-sage-dark ${className}`}>
      {video ? (
        <video
          className="h-full w-full object-cover"
          poster={photo}
          src={video}
          controls
          playsInline
          preload="metadata"
        />
      ) : photo ? (
        photo.startsWith("/uploads/") ? (
          <img src={photo} alt={name} className="h-full w-full object-cover object-top" />
        ) : (
          <Image src={photo} alt={name} fill className="object-cover object-top" sizes="(min-width: 1024px) 50vw, 100vw" />
        )
      ) : (
        <div className="flex h-full min-h-48 items-center justify-center text-sm text-paper/70">Нет фото</div>
      )}
    </div>
  );
}
