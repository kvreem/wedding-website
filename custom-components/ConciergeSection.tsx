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
          <FloatingElement depth={1.5} className="absolute top-[10%] left-[15%] w-[150px] h-[150px]">
            <Image src="/images/album/f.JPG" alt="Album image f" className="rounded-lg object-cover" fill priority />
          </FloatingElement>
          <FloatingElement depth={2} className="absolute top-[20%] right-[20%] w-[120px] h-[120px]">
            <Image src="/images/album/g.JPG" alt="Album image g" className="rounded-lg object-cover" fill priority />
          </FloatingElement>
          <FloatingElement depth={1} className="absolute bottom-[25%] left-[25%] w-[180px] h-[180px]">
            <Image src="/images/album/h.JPG" alt="Album image h" className="rounded-lg object-cover" fill priority />
          </FloatingElement>
          <FloatingElement depth={2.5} className="absolute top-[40%] left-[40%] w-[140px] h-[140px]">
            <Image src="/images/album/i.JPG" alt="Album image i" className="rounded-lg object-cover" fill priority />
          </FloatingElement>
          <FloatingElement depth={1.8} className="absolute bottom-[15%] right-[15%] w-[160px] h-[160px]">
            <Image src="/images/album/j.JPG" alt="Album image j" className="rounded-lg object-cover" fill priority />
          </FloatingElement>
        </Floating>
      </div>
    </div>
  );
};

export default ConciergeSection; 