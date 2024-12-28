import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface ImageTrailProps {
  children: React.ReactNode[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  newOnTop?: boolean;
  rotationRange?: number;
  interval?: number;
}

interface TrailImage {
  id: string;
  element: React.ReactNode;
}

export const ImageTrail: React.FC<ImageTrailProps> = ({
  children,
  containerRef,
  newOnTop = true,
  rotationRange = 15,
  interval = 100,
}) => {
  const [images, setImages] = useState<TrailImage[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const lastMouseMove = useRef<number>(0);

  // Spring configuration for smooth movement
  const springConfig = { damping: 20, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseMove.current < interval) return;
      lastMouseMove.current = now;

      const rect = containerRef.current!.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      mouseX.set(relativeX);
      mouseY.set(relativeY);

      // Add new image at mouse position
      const rotation = (Math.random() * 2 - 1) * rotationRange;
      const id = now.toString();
      const newImage: TrailImage = {
        id,
        element: (
          <motion.div
            key={id}
            initial={{ x: relativeX, y: relativeY, opacity: 1, scale: 1, rotate: rotation }}
            animate={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ position: "absolute", pointerEvents: "none" }}
            onAnimationComplete={() => {
              setImages(prev => prev.filter(img => img.id !== id));
            }}
          >
            {React.cloneElement(children[Math.floor(Math.random() * children.length)] as React.ReactElement)}
          </motion.div>
        ),
      };

      setImages(prev => newOnTop ? [newImage, ...prev] : [...prev, newImage]);
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [children, containerRef, interval, mouseX, mouseY, newOnTop, rotationRange]);

  return <>{images.map(img => img.element)}</>;
}; 