import React, { useState, useEffect, RefObject, createContext, useContext, useRef, useCallback } from 'react';
import { useAnimationFrame } from 'framer-motion';

// Hook for mouse position
const useMousePosition = (containerRef?: RefObject<HTMLDivElement>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;
        setPosition({ x: relativeX, y: relativeY });
      } else {
        setPosition({ x, y });
      }
    };

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return position;
};

// Context for floating elements
const FloatingContext = createContext<{
  registerElement?: (ref: HTMLElement | SVGElement, depth: number) => void;
  unregisterElement?: (ref: HTMLElement | SVGElement) => void;
}>({});

interface FloatingProps {
  children: React.ReactNode;
  sensitivity?: number;
  easingFactor?: number;
  className?: string;
}

interface FloatingElementProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  depth = 1,
  className = '',
}) => {
  const { registerElement, unregisterElement } = useContext(FloatingContext);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current && registerElement && unregisterElement) {
      registerElement(elementRef.current, depth);
      return () => {
        if (elementRef.current) {
          unregisterElement(elementRef.current);
        }
      };
    }
  }, [depth, registerElement, unregisterElement]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export const Floating: React.FC<FloatingProps> = ({
  children,
  sensitivity = 0.1,
  easingFactor = 0.05,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition(containerRef);
  const elements = useRef(new Map<HTMLElement | SVGElement, { depth: number; position: { x: number; y: number } }>());

  const registerElement = useCallback((ref: HTMLElement | SVGElement, depth: number) => {
    elements.current.set(ref, { depth, position: { x: 0, y: 0 } });
  }, []);

  const unregisterElement = useCallback((ref: HTMLElement | SVGElement) => {
    elements.current.delete(ref);
  }, []);

  useAnimationFrame(() => {
    elements.current.forEach((data, element) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const targetX = (mousePosition.x - centerX) * sensitivity * data.depth;
        const targetY = (mousePosition.y - centerY) * sensitivity * data.depth;

        data.position.x += (targetX - data.position.x) * easingFactor;
        data.position.y += (targetY - data.position.y) * easingFactor;

        element.style.transform = `translate(${data.position.x}px, ${data.position.y}px)`;
      }
    });
  });

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </FloatingContext.Provider>
  );
}; 