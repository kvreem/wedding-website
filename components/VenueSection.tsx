import styles from '@components/VenueSection.module.scss';
import Image from 'next/image';
import Card from '@components/Card';
import Divider from '@components/Divider';
import ActionButton from '@components/ActionButton';

interface VenueSectionProps {
  onClose: () => void;
}

const VenueSection: React.FC<VenueSectionProps> = ({ onClose }) => {
  return (
    <div className={styles.root}>
      <div className="relative h-[calc(100vh-6rem)] flex flex-col">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
          <ActionButton onClick={onClose}>
            X
          </ActionButton>
        </div>
        <Card title="Details">
          <div className={styles.imageContainer}>
            <Image
              src="/images/lmb.jpg"
              alt="La Maison Bleue - Venue"
              width={400}
              height={200}
              className="w-full h-[22vh] object-cover"
            />
          </div>
          <Divider />
          <p className="text-xs md:text-sm lg:text-base">
            La Maison Bleue is an exquisite boutique hotel perched along the Red Sea in El Gouna. Its grand design seamlessly blends European and North African influences, creating a tranquil, luxurious retreat. Panoramic sea views, opulent interiors, and lush courtyards make it a breathtaking backdrop for an unforgettable celebration.
          </p>
          <Divider />
          <div className="grid grid-cols-2 gap-4 h-[35vh]">
            <div className="h-full">
              <Card title={<span className="text-xs md:text-sm lg:text-base whitespace-nowrap">Welcome Party</span>}>
                <div className="text-xs md:text-sm mb-2">
                  Thursday, 9/25/2025
                  <br />
                  <span className="text-xs">Desert Oasis</span>
                </div>
                <div className="relative h-[20vh]">
                  <Image
                    src="/images/welcomeparty.jpg"
                    alt="Welcome Party Setup"
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    style={{ objectPosition: 'center 40%' }}
                    className="object-cover"
                  />
                </div>
              </Card>
            </div>
            <div className="h-full">
              <Card title={<span className="text-xs md:text-sm lg:text-base whitespace-nowrap">Wedding Day</span>}>
                <div className="text-xs md:text-sm mb-2">
                  Friday, 9/26/2025
                  <br />
                  <span className="text-xs">Attire: Black tie, formal</span>
                </div>
                <div className="relative h-[20vh]">
                  <Image
                    src="/images/lmb-2.jpg"
                    alt="La Maison Bleue Wedding Setup"
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VenueSection; 