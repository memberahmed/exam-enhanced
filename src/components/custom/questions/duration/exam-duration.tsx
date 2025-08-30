"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  renderLabel?: (progress: number) => string | number;
  shape?: "square" | "round";
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

const CircularProgress = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = "round",
}: CircularProgressProps) => {
  const size = 120;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const strokeDashoffset = circumference - (circumference * normalizedValue) / 100;
  const viewBox = `0 0 ${size} ${size}`;
  const center = size / 2;

  return (
    <div className={cn("relative w-20 h-20", className)}>
      <svg
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="w-full h-full"
      >
        {/* Base Circle - Background */}
        <circle
          r={radius}
          cx={center}
          cy={center}
          fill="transparent"
          strokeWidth={strokeWidth}
          className="stroke-custom-blue-100"
        />
        {/* Progress Circle */}
        <circle
          r={radius}
          cx={center}
          cy={center}
          strokeWidth={strokeWidth}
          strokeLinecap={shape}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="transparent"
          className={cn("stroke-custom-blue-600 transition-all duration-300 ease-out", progressClassName)}
          style={{
            // Ensure the stroke starts from 0 and grows
            transformOrigin: "center",
          }}
        />
      </svg>
      {showLabel && (
        <div
          className={cn(
            "absolute text-black font-GeistMono inset-0 flex items-center justify-center text-[12px]",
            labelClassName
          )}
        >
          {/* Time duration */}
          {renderLabel ? renderLabel(normalizedValue) : normalizedValue}
        </div>
      )}
    </div>
  );
};

type TimerProps = {
  duration: number; // Duration in minutes
  onTimerEnd: () => void; // Fire Form sumittion at end of time
  onTimeChange: (time: number) => void; // Calculate time of exam
};

export default function Timer({ duration, onTimerEnd, onTimeChange }: TimerProps) {
  // Total exam duration in milliseconds
  const totalDurationMs = duration * 60 * 1000;

  // Store the exam start time
  const [startTime] = React.useState(Date.now());

  // Tracks how much time has passed since the exam started
  const [elapsedTime, setElapsedTime] = React.useState(0);

  // Tracks the last reported minute to avoid firing onTimeChange too often
  const [lastReportedMinute, setLastReportedMinute] = React.useState(0);

  React.useEffect(() => {
    // Interval updates every second to track elapsed time and progress
    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const newElapsedTime = currentTime - startTime;

      // If exam time is finished
      if (newElapsedTime >= totalDurationMs) {
        clearInterval(timerId);
        setElapsedTime(totalDurationMs);

        // Report the final minutes spent
        const finalMinutes = Math.max(1, Math.ceil(totalDurationMs / 60000));
        onTimeChange(finalMinutes);

        // Trigger the "exam ended" callback
        onTimerEnd();
        return;
      }

      // Update elapsed time
      setElapsedTime(newElapsedTime);

      // Calculate minutes spent so far (rounded up, minimum = 1)
      const minutesSpent = Math.max(1, Math.ceil(newElapsedTime / 60000));

      // Only call onTimeChange when minutes actually increase
      if (minutesSpent !== lastReportedMinute) {
        setLastReportedMinute(minutesSpent);
        onTimeChange(minutesSpent);
      }
    }, 1000); // Run every second

    // Clean up interval on unmount
    return () => clearInterval(timerId);
  }, [startTime, totalDurationMs, onTimerEnd, onTimeChange, lastReportedMinute]);

  // Calculate progress percentage for the circular progress UI
  const progressValue = Math.min((elapsedTime / totalDurationMs) * 100, 100);

  // Remaining time in milliseconds (for label display)
  const remainingTime = Math.max(totalDurationMs - elapsedTime, 0);

  return (
    <div className="max-w-xs mx-auto w-20 h-20 flex flex-col items-center">
      <CircularProgress
        value={progressValue}
        showLabel
        renderLabel={() =>
          Intl.DateTimeFormat("en-us", {
            minute: "2-digit",
            second: "2-digit",
          }).format(remainingTime)
        }
        shape="square"
      />
    </div>
  );
}
