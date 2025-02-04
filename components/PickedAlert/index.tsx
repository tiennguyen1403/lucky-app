import React from "react";
import { useRouter } from "next/navigation";
import { ProfileCircle } from "iconsax-react";

const className = `bg-primary text-white px-6 py-2 w-40 rounded-lg text-xl font-medium tracking-wide flex items-center justify-center gap-2`;

const PickedAlert: React.FC = () => {
  const router = useRouter();
  const goToProfile = () => router.push("/profile");

  return (
    <div className="col-span-10 flex flex-col items-center gap-4 pt-20 md:pt-28 px-6">
      <p className="text-center text-secondary text-2xl md:text-3xl">
        Ồ, bạn đã chơi vòng này rồi, vào profile xem kết quả nhé
      </p>
      <button className={className} onClick={goToProfile}>
        <ProfileCircle variant="Bold" color="#ffffff" size={24} />
        <span>Profile</span>
      </button>
    </div>
  );
};

export default PickedAlert;
