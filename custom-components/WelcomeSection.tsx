import React from 'react';
import Image from 'next/image';
import CardDouble from '../components/CardDouble';
import Message from '../components/Message';
import ActionButton from '../components/ActionButton';

interface WelcomeSectionProps {
  onClose: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onClose }) => {
  return (
    <div className="w-[500px] max-w-[90vw] mx-auto mt-20">
      <div className="relative">
        <div className="absolute top-0 right-0 -mt-4 -mr-4">
          <ActionButton onClick={onClose}>
            X
          </ActionButton>
        </div>
        <CardDouble title="Welcome.txt">
          <div className="flex flex-col items-center space-y-4 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <Image
              src="/images/floating/1.JPEG"
              alt="Heidi and Kareem"
              width={300}
              height={375}
              className="rounded-lg"
              priority
            />
            <Message>
              Dear Guests, 
              <br />
              <br />
              Thank you for sharing in this joyous time with us. Your love and support mean the world, and we can't wait for you to experience the magic of Egypt together. We look forward to creating lifelong memories with all of you.
              <br />
              <br />
              With love and gratitude,
              <br />
              Heidi & Kareem
            </Message>
          </div>
        </CardDouble>
      </div>
    </div>
  );
};

export default WelcomeSection; 