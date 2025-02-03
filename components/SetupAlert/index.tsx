import React from "react";
import { useRouter } from "next/navigation";
import { ProfileCircle } from "iconsax-react";

const className = `bg-primary text-white px-6 py-2 w-40 rounded-lg text-xl font-medium tracking-wide flex items-center justify-center gap-2`;

const SetupAlert: React.FC = () => {
  const router = useRouter();
  const goToProfile = () => router.push("/profile");

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 px-2 -translate-y-24">
      <p className="text-primary text-3xl md:text-5xl font-bold text-center">
        Chưa tới giờ chơi, vào profile để chia bao lì xì nhé
      </p>
      <button className={className} onClick={goToProfile}>
        <ProfileCircle variant="Bold" color="#ffffff" size={24} />
        <span>Profile</span>
      </button>
    </div>
  );
};

export default SetupAlert;
