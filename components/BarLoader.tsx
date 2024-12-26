'use client';

import * as React from 'react';

import styles from './BarLoader.module.scss';

interface BarLoaderProps {
  progress: number;
}

const BarLoader = ({ progress }: BarLoaderProps) => {
  const width = 50; // Total width of the loading bar in characters
  const filledWidth = Math.floor((width * progress) / 100);
  const emptyWidth = width - filledWidth;

  const filledChar = '█';
  const emptyChar = '░';

  const getLoadingMessage = (progress: number) => {
    if (progress < 25) {
      return "Verifying guest list...";
    } else if (progress < 50) {
      return "Proof reading Our Story...";
    } else if (progress < 75) {
      return "Updating RSVPs...";
    } else {
      return "Checking the weather in Gouna...";
    }
  };

  return (
    <div className={styles.barLoader}>
      <div className={styles.progressText}>
        {getLoadingMessage(progress)}
        <span className={styles.percentage}>{Math.round(progress)}%</span>
      </div>
      <div className={styles.bar}>
        {filledChar.repeat(filledWidth)}{emptyChar.repeat(emptyWidth)}
      </div>
    </div>
  );
};

export default BarLoader;
