'use client';

import React, { useRef } from 'react';
import Card from '@components/Card';
import TextArea from '@components/TextArea';
import ActionButton from '@components/ActionButton';
import Image from 'next/image';
import { ImageTrail } from "../fancy/components/image/image-trail";
import styles from './Story.module.scss';

interface StoryProps {
  onClose: () => void;
  hasPlayed: boolean;
  onAutoPlayComplete: () => void;
}

const storyText = `It all began in the heart of New York City, where two paths unexpectedly crossed. Kareem had just embarked on the exciting journey of starting his own company, while Heidi had recently moved to start her new role at a Marketing firm.

Their connection was instant, sparked by a shared love for coffee, traveling, and the importance of family. Kareem delighted in showing Heidi around his favorite corners of the city, from cozy cafes to iconic restaurants, while Heidi loved capturing every moment with her camera, turning their adventures into a collection of treasured memories.

Their love grew with each new discovery, photo taken, and each cup of coffee shared. In the summer of 2024, Kareem proposed, marking the beginning of a new chapter in their story.

As they prepare for their wedding, they've traveled back to their roots in Egypt, a place deeply meaningful to them both. From the banks of the Nile to the shores of the Mediterranean and the Red Sea, they've explored breathtaking venues to celebrate their union surrounded by loved ones.

Heidi and Kareem can't wait to share this next chapter with you and are so grateful to have you as part of their journey.`;

const Story: React.FC<StoryProps> = ({ onClose, hasPlayed, onAutoPlayComplete }) => {
  const [isFastForwarded, setIsFastForwarded] = React.useState(false);
  const [showTrail, setShowTrail] = React.useState(false);
  const trailContainerRef = useRef<HTMLDivElement>(null);

  const handleFastForward = () => {
    setIsFastForwarded(true);
    onAutoPlayComplete();
    setShowTrail(true);
  };

  const handleAutoPlayComplete = () => {
    onAutoPlayComplete();
    setShowTrail(true);
  };

  const showFastForward = !hasPlayed && !isFastForwarded;

  // Images in specific order
  const storyImages = [
    'drag1.jpg',
    'drag2.jpg',
    'drag3.jpg',
    'drag4.jpg'
  ];

  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <div className="relative">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
            <ActionButton onClick={onClose}>X</ActionButton>
          </div>
          <Card title="OUR STORY">
            <div className={styles.storyContainer}>
              <TextArea
                autoPlay={!hasPlayed && !isFastForwarded ? storyText : undefined}
                autoPlaySpeedMS={50}
                readOnly
                value={(hasPlayed || isFastForwarded) ? storyText : undefined}
                onAutoPlayComplete={handleAutoPlayComplete}
              />
              {showFastForward && (
                <div className={styles.controls}>
                  <ActionButton onClick={handleFastForward}>
                    {'>>'}
                  </ActionButton>
                </div>
              )}

              {(showTrail || hasPlayed) && (
                <div 
                  ref={trailContainerRef} 
                  className={styles.trailContainer}
                >
                  <ImageTrail
                    containerRef={trailContainerRef}
                    newOnTop={true}
                    rotationRange={15}
                    interval={100}
                  >
                    {storyImages.map((image, index) => (
                      <div
                        key={image}
                        className={styles.imageContainer}
                      >
                        <Image
                          src={`/images/story/${image}`}
                          alt={`Story image ${index + 1}`}
                          width={100}
                          height={120}
                          className="object-cover w-full h-full"
                          priority
                          unoptimized
                        />
                      </div>
                    ))}
                  </ImageTrail>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Story; 