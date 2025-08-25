import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export default function Heading() {
  const words = ["better", "shorter", "custom", "awesome"];
  return (
    <motion.h1
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      className={cn(
        "relative mb-6 max-w-2xl text-left text-4xl leading-normal font-bold tracking-tight text-zinc-700 md:text-7xl dark:text-zinc-100",
      )}
      layout
    >
<div className="flex items-center space-x-2">
    
  <ContainerTextFlip words={words}   />
  <span className="bg-gradient-to-r ml-3 from-zinc-500 to-zinc-200 text-transparent bg-clip-text">
      URLS
  </span>
</div>

    </motion.h1>
  );
}
