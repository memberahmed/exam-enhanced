import { CircleX } from "lucide-react";

declare type FeedbackErrorProps = {
  error?: string;
};

export default function FeedbackError({ error }: FeedbackErrorProps) {
  if (!error) return null;
  return (
    <>
      <div className=" relative flex items-center justify-center text-custom-red-600 font-GeistMono text-base min-h-10 border border-custom-red-600 bg-custom-red-50">
        <p className="text-custom-red-600 text-[14px] p-2">{error}</p>
        <span className="absolute  bg-white left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 ">
          <CircleX />
        </span>
      </div>
    </>
  );
}
