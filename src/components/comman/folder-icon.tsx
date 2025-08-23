import { FolderCode } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ExamFolderIcon() {
  const t = useTranslations();
  return (
    <h1 className=" gap-1.5 flex items-center font-GeistMono text-xl font-semibold leading-full tracking-none text-custom-blue-600">
      {t.rich("exam-app", {
        span: () => (
          <span className="">
            <FolderCode size={30} />
          </span>
        ),
      })}
    </h1>
  );
}
