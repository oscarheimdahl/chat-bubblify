import { cloneElement, ReactElement } from "react";

import { cn } from "@/utils/cn";

export const IconButton = (props: {
  label: string;
  className?: string;
  onClick: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ReactElement<any>;
}) => {
  return (
    <div
      aria-label={props.label}
      className={cn(
        "rounded-xl border-4 border-black bg-amber-600 p-5 text-5xl text-white transition-all hover:brightness-110",
        props.className,
      )}
      onClick={props.onClick}
    >
      <div className="flex items-center gap-2 transition-all">
        {cloneElement(props.icon, {
          className: "size-16",
        })}
      </div>
    </div>
  );
};
