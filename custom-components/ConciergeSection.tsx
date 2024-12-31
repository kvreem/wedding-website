import styles from './ConciergeSection.module.scss';
import Card from '@components/Card';
import ActionButton from '@components/ActionButton';
import { Floating, FloatingElement } from '../fancy/components/ParallaxFloating';
import Image from 'next/image';

interface ConciergeSectionProps {
  onClose: () => void;
}

const ConciergeSection: React.FC<ConciergeSectionProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[90vw] md:max-w-[600px] px-4">
        <div className="relative">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
            <ActionButton onClick={onClose}>
              X
            </ActionButton>
          </div>
          <Card title="CONTACT">
            <div className={styles.contactContainer}>
              <p>For questions and assistance please email:</p>
              <a href="mailto:concierge@heidiandkareem.com" className={styles.email}>
                concierge@heidiandkareem.com
              </a>
            </div>
          </Card>
        </div>
      </div>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Floating sensitivity={0.03} easingFactor={0.02} className="relative w-full h-full">
          <FloatingElement depth={1.5} className="absolute top-[10%] left-[15%] w-[250px] h-[250px]">
            <Image src="/images/floating/1.JPEG" alt="Floating image 1" className="rounded-lg object-cover" fill priority />
          </FloatingElement>
          <FloatingElement depth={2} className="absolute top-[20%] right-[20%] w-[200px] h-[200px]">
            <Image src="/images/floating/2.JPEG" alt="Floating image 2" className="rounded-lg object-cover" fill priority />
          </FloatingElement>
          <FloatingElement depth={1} className="absolute bottom-[25%] left-[25%] w-[300px] h-[300px]">
            <Image src="/images/floating/3.JPEG" alt="Floating image 3" className="rounded-lg object-cover" fill priority />
          </FloatingElement>
        </Floating>
      </div>
    </div>
  );
};

export default ConciergeSection; 