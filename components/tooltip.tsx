"use client";

import { ReactNode } from "react";
import {
  Tooltip as BaseTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function Tooltip({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode | string;
}) {
  return (
    <TooltipProvider>
      <BaseTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </BaseTooltip>
    </TooltipProvider>
  );
}
