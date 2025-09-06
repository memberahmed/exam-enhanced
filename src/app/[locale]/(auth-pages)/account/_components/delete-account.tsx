"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Loader2Icon, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import useDeleteAccount from "../_hooks/use-delete-accoutn";
import FeedbackError from "@/components/comman/feedback-error";
import { useDirection } from "@/lib/utils/get-dirrction.util";

export default function DeleteAccount() {
  // Traslations
  const t = useTranslations();

  // Hooks
  const dir = useDirection();
  const { deleteUserAccount, isPending, error } = useDeleteAccount();
  return (
    <Dialog>
      <div>
        {/* Trigger */}
        <DialogTrigger asChild>
          <Button
            variant={"destructive"}
            className=" w-full font-medium text-base tracking-none capitalize leading-full h-[46px]"
            type="button"
          >
            {t("delete-my-accoutn")}
          </Button>
        </DialogTrigger>

        {/* Content */}
        <DialogContent dir={dir} className="sm:max-w-[558px] flex-col  border border-custom-gray-200  gap-2.5 p-0 m-0">
          {/* container for dialoge content */}
          <div className="md:h-[300px] space-y-[30px] flex flex-col items-center justify-center p-9">
            {/* Alrte traingle */}
            <div className="w-28 h-28 text-center bg-custom-red-50  rounded-full flex items-center justify-center">
              <div className="w-20 h-20  bg-custom-red-100 rounded-full flex items-center justify-center">
                <TriangleAlert size={50} className="text-custom-red-600" />
              </div>
            </div>
            {/* Header */}
            <DialogHeader className="text-center flex-col flex justify-center items-center space-y-2.5">
              {/* Main title */}
              <DialogTitle className="font-medium text-lg tracking-none leading-full ">
                {t("sure-delete-account")}
              </DialogTitle>
              {/* Description */}
              <DialogDescription className="font-normal text-sm tracking-none leading-full text-custom-gray-500">
                {t("delete-account-confirmations")}
              </DialogDescription>
            </DialogHeader>

            {/* Feedback from back end */}
            {error && <FeedbackError error={error.message} />}
          </div>

          {/* Footer */}
          <DialogFooter className="grid grid-cols-2 border  border-custom-gray-50 gap-2.5 p-6 w-full">
            {/* Cancel button */}
            <DialogClose asChild>
              <Button className="bg-custom-gray-200 text-black h-12 w-56 hover:bg-custom-gray-300">
                {t("cancel")}
              </Button>
            </DialogClose>

            {/* Confirm button */}
            <Button
              disabled={isPending}
              onClick={() => deleteUserAccount()}
              className="text-white h-12 w-56 capitalize"
            >
              {isPending
                ? t.rich("loading", {
                    span: () => <Loader2Icon className="animate-spin" />,
                  })
                : t("save-changes")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
