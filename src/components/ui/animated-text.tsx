import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedGradientText = ({ text, className = "" }: AnimatedTextProps) => {
  const controls = useAnimationControls();
  const { theme } = useTheme();

  useEffect(() => {
    controls.start({
      backgroundPosition: ["0% 50%", "-200% 50%"],
      transition: {
        duration: 3,
        ease: "linear",
        repeat: Infinity,
      }
    });
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      className={`font-bold ${className}`}
      style={{
        backgroundImage: theme === 'dark'
          ? "linear-gradient(to right, #ffffff, #6b7280, #6b7280, #6b7280, #ffffff)"
          : "linear-gradient(to right, #000000, #4b5563, #4b5563, #4b5563, #000000)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textFillColor: "transparent",
      }}
    >
      {text}
    </motion.div>
  );
}; 