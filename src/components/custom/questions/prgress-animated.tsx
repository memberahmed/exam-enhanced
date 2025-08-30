"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

type ProgressAnimationProps = {
  value: number; // القيمة من الأب
};

export default function ProgressAnimation({ value }: ProgressAnimationProps) {
  return (
    <div className="w-full">
      <style>
        {`@keyframes progress {
            to {
              left: calc(100% - 2rem);
            }
          }
          .progress {
            transform-origin: center;
            animation: progress 1.25s ease-in-out infinite;
          }
        `}
      </style>

      <ProgressPrimitive.Root className="relative h-4 w-full overflow-hidden rounded-none bg-custom-blue-100">
        <ProgressPrimitive.Indicator
          className="relative h-full w-full flex-1 bg-custom-blue-600 transition-all"
          style={{ transform: `translateX(-${100 - value}%)` }}
        >
          <div className="absolute left-0 w-6 h-full bg-primary-foreground blur-[10px] inset-y-0 progress" />
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  );
}
