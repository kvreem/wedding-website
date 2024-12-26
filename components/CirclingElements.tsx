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

  // Calculate responsive radius based on viewport width
  const responsiveRadius = `min(${radius}px, 25vw)`;

  return (
    <div className={`relative h-[500px] w-[500px] ${className}`}>
      {childrenArray.map((child, index) => {
        const offset = (360 / numberOfChildren) * index;
        return (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-circling"
            style={{
              '--offset': offset,
              '--radius': responsiveRadius,
              '--duration': duration,
            } as React.CSSProperties}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default CirclingElements; 