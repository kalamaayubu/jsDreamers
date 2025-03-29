"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipWrapper = ({ children, label, isSidebarOpen }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={`${
            isSidebarOpen ? "hidden" : "block"
          } bg-white text-[15px] px-3 py-2 ml-10 -mb-7 rounded-md shadow-sm shadow-gray-500 transition-all duration-300`}
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
