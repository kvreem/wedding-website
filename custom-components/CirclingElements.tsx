'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CirclingElementsProps {
  children?: React.ReactNode;
  radius?: number;
  duration?: number;
  className?: string;
}

const CirclingElements: React.FC<CirclingElementsProps> = ({
  children,
  radius = 150,
  duration = 20,
  className = '',
}) => {
  const childrenArray = React.Children.toArray(children);
  const numberOfChildren = childrenArray.length;

  // Calculate responsive radius based on viewport width and height
  const responsiveRadius = `min(${radius}px, 20vh, 20vw)`;

  return (
    <div className={`fixed inset-0 flex items-center justify-center overflow-hidden pointer-events-none ${className}`}>
      <div className="relative w-screen h-screen flex items-center justify-center">
        {childrenArray.map((child, index) => {
          const offset = (360 / numberOfChildren) * index;
          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-circling pointer-events-auto"
              style={{
                '--offset': `${offset}`,
                '--radius': responsiveRadius,
                '--duration': `${duration}s`,
              } as React.CSSProperties}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CirclingElements; 