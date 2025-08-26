"use client";
import { usePathname } from "@/i18n/navigation";

export default function About() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      <div>About div</div>
    </>
  );
}
