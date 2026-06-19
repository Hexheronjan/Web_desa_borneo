"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-slate-200", className)}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 bg-slate-900 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

function ProgressTrack({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-slate-200", className)} {...props} />;
}

function ProgressIndicator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-full bg-slate-900 transition-all", className)} {...props} />;
}

function ProgressLabel({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-sm font-medium", className)} {...props} />;
}

function ProgressValue({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-sm text-slate-500 tabular-nums", className)} {...props} />;
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
