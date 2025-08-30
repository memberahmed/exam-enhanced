"use client";

import { useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import * as motion from "motion/react-client";
type DiplomaCardProps = {
  diploma: Diploma;
  index: number;
};

export default function DiplomaCard({ diploma, index }: DiplomaCardProps) {
  //   Navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = new URLSearchParams(searchParams);

  const handlClick = (id: string) => {
    query.set("subject", id);
    router.push(`/exams?${query.toString()}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileTap={{ scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.25,
        duration: 0.3,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      onClick={() => handlClick(diploma._id)}
      className="relative cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-[448px] w-full">
        <Image src={diploma.icon} alt={diploma.name} sizes="100%" className="object-contain" fill />
      </div>
      <p
        className="absolute bottom-2.5 left-1/2  -translate-x-1/2 
               w-[calc(100%-20px)]  h-[70px] 
               flex items-center justify-start
               bg-[#155DFC]/50 backdrop-blur-[6px] 
               text-white font-GeistMono font-semibold text-xl
               px-4 py-[7.5px] 
               "
      >
        {diploma.name}
      </p>
      
    </motion.div>
  );
}
