import styles from './Album.module.scss';
import Image from 'next/image';
import CardDouble from '@components/CardDouble';
import Button from '@components/Button';
import Divider from '@components/Divider';
import ActionButton from '@components/ActionButton';
import { useState } from 'react';

interface AlbumProps {
  onClose: () => void;
}

interface ImageItem {
  src: string;
  alt: string;
}

const Album: React.FC<AlbumProps> = ({ onClose }) => {
  // Combine both album and floating images, excluding h.JPG and f.JPG
  const images: ImageItem[] = [
    ...Array.from({ length: 13 }, (_, i) => {
      const char = String.fromCharCode(97 + i);
      if (char === 'h' || char === 'f') return null;
      return { src: `/images/album/${char}.JPG`, alt: `Album image ${i + 1}` };
    }).filter((item): item is ImageItem => item !== null),
    ...Array.from({ length: 6 }, (_, i) => ({ src: `/images/floating/${i + 1}${i < 3 ? '.JPEG' : '.JPG'}`, alt: `Floating image ${i + 1}` }))
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <div className="relative">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
            <ActionButton onClick={onClose}>
              X
            </ActionButton>
          </div>
          <CardDouble title="ALBUM">
            <div className={styles.imageContainer}>
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                width={600}
                height={400}
                className={styles.image}
                priority
              />
            </div>
            <Divider />
            <div className={styles.controls}>
              <Button onClick={handlePrevious}>PREVIOUS</Button>
              <Button onClick={handleNext}>NEXT</Button>
            </div>
          </CardDouble>
        </div>
      </div>
    </div>
  );
};

export default Album; 