import React from 'react';
import Image from 'next/image';
import styles from './DesktopIcons.module.scss';

interface DesktopIcon {
  name: string;
  icon: string;
  onClick?: () => void;
}

interface DesktopIconsProps {
  icons: DesktopIcon[];
}

const DesktopIcons: React.FC<DesktopIconsProps> = ({ icons }) => {
  // Sort icons alphabetically by name
  const sortedIcons = [...icons].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.desktopContainer}>
      {sortedIcons.map((icon, index) => (
        <div 
          key={index} 
          className={styles.iconWrapper}
          onClick={icon.onClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              icon.onClick?.();
            }
          }}
        >
          <div className={styles.icon}>
            <Image
              src={`/desktop-icons/${icon.icon}`}
              alt={icon.name}
              width={24}
              height={24}
              className={styles.iconImage}
            />
          </div>
          <span className={styles.iconLabel} data-icon={icon.name}>{icon.name}</span>
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons; 