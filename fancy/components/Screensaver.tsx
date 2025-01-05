import React, { useEffect, useState, useRef } from 'react';
import { useDimensions } from './hooks/useDimensions';
import styles from './Screensaver.module.scss';

interface ScreensaverProps {
  onDismiss: () => void;
  speed?: number;
}

const Screensaver: React.FC<ScreensaverProps> = ({ 
  onDismiss,
  speed = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const [isMoving, setIsMoving] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.body.classList.add(styles.hasScreensaver);
    return () => {
      document.body.classList.remove(styles.hasScreensaver);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const imageFiles = [
    '/images/floating/1.JPEG',
    '/images/floating/2.JPEG',
    '/images/floating/3.JPEG',
    '/images/floating/4.JPG',
    '/images/floating/5.JPG',
    '/images/floating/6.JPG',
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isMobile && (e.code === 'Enter' || e.code === 'Space')) {
        e.preventDefault();
        onDismiss();
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (isMobile) {
        e.preventDefault();
        onDismiss();
      }
    };

    // Event listeners for dismissal
    window.addEventListener('keydown', handleKeyPress);
    if (isMobile) {
      window.addEventListener('touchstart', handleTouch);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (isMobile) {
        window.removeEventListener('touchstart', handleTouch);
      }
    };
  }, [onDismiss, isMobile]);

  useEffect(() => {
    if (!isMoving || !containerRef.current) return;

    const animate = () => {
      setPosition(prev => {
        const newX = prev.x + speed * direction.x;
        const newY = prev.y + speed * direction.y;
        const bounds = containerRef.current?.getBoundingClientRect();
        
        if (!bounds) return prev;

        let newDirection = { ...direction };
        
        // Check boundaries and update direction
        if (newX <= 0 || newX >= bounds.width - 300) {
          newDirection.x *= -1;
          setDirection(newDirection);
        }
        if (newY <= 0 || newY >= bounds.height - 300) {
          newDirection.y *= -1;
          setDirection(newDirection);
        }

        return {
          x: newX <= 0 ? 0 : newX >= bounds.width - 300 ? bounds.width - 300 : newX,
          y: newY <= 0 ? 0 : newY >= bounds.height - 300 ? bounds.height - 300 : newY
        };
      });
    };

    const animationFrame = setInterval(animate, 32);
    return () => clearInterval(animationFrame);
  }, [isMoving, speed, direction]);

  return (
    <div ref={containerRef} className={styles.screensaver}>
      <div 
        className={styles.imageStack}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      >
        {imageFiles.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Floating image ${index + 1}`}
            className={styles.stackedImage}
            style={{
              zIndex: imageFiles.length - index,
              transform: `translateY(${index * -10}px)`
            }}
          />
        ))}
      </div>
      <div className={styles.dismissPrompt}>
        {isMobile ? 
          "(✿﹏●) TAP TO CONTINUE (✿﹏●)" :
          "(✿﹏●) PRESS ENTER OR SPACE TO CONTINUE (✿﹏●)"
        }
      </div>
    </div>
  );
};

export default Screensaver; 