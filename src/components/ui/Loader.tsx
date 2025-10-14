import { cn } from "@/utils/client/helpers";
import { Icon } from "@iconify/react";
import React from "react";

interface ILoader {
  className?: string;
}

const Loader = ({ className }: ILoader) => {
  return (
    <Icon
      icon="tabler:loader"
      role="status"
      aria-label="Loading"
      className={cn(
        "size-4 animate-[spin_2.5s_ease-in-out_infinite] duration-1000",
        className,
      )}
    />
  );
};

export default Loader;
