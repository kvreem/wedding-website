import React from 'react';
import Image from 'next/image';
import styles from './DesktopIcons.module.scss';
import { useLanguage } from '../translations/LanguageContext';

interface DesktopIcon {
  name: string;
  icon: string;
  onClick?: () => void;
  translationKey: string;
}

interface DesktopIconsProps {
  icons: DesktopIcon[];
}

const DesktopIcons: React.FC<DesktopIconsProps> = ({ icons }) => {
  const { t } = useLanguage();
  
  // Sort icons alphabetically by translated name
  const sortedIcons = [...icons].sort((a, b) => 
    t(`desktopIcons.${a.translationKey}`).localeCompare(t(`desktopIcons.${b.translationKey}`))
  );

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
              alt={t(`desktopIcons.${icon.translationKey}`)}
              width={24}
              height={24}
              className={styles.iconImage}
            />
          </div>
          <span className={styles.iconLabel} data-icon={icon.name}>
            {t(`desktopIcons.${icon.translationKey}`)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons; 