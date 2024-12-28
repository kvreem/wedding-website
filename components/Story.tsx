'use client';

import React from 'react';
import Card from './Card';
import TextArea from './TextArea';
import ActionButton from './ActionButton';

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

  const handleFastForward = () => {
    setIsFastForwarded(true);
    onAutoPlayComplete();
  };

  const showFastForward = !hasPlayed && !isFastForwarded;

  return (
    <div className="w-full max-w-[90vw] md:max-w-[600px] mx-auto px-4">
      <Card title="Our Story">
        <div className="space-y-8 py-4">
          <TextArea
            autoPlay={!hasPlayed && !isFastForwarded ? storyText : undefined}
            autoPlaySpeedMS={50}
            readOnly
            value={(hasPlayed || isFastForwarded) ? storyText : undefined}
            onAutoPlayComplete={onAutoPlayComplete}
          />
          <div className="flex justify-between items-center pt-4">
            {showFastForward && (
              <ActionButton onClick={handleFastForward}>
                >>
              </ActionButton>
            )}
            <div className={showFastForward ? '' : 'ml-auto'}>
              <ActionButton onClick={onClose}>
                X
              </ActionButton>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Story; 