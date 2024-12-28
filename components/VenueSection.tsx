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
      <div className="relative">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
          <ActionButton onClick={onClose}>
            X
          </ActionButton>
        </div>
        <Card title="La Maison Bleue">
          <div className={styles.imageContainer}>
            <Image
              src="/images/lmb.jpg"
              alt="La Maison Bleue - Venue"
              width={800}
              height={500}
              className={styles.image}
            />
          </div>
          <Divider />
          <p className={styles.description}>
            La Maison Bleue is an exquisite boutique hotel perched along the Red Sea in El Gouna. Its grand design seamlessly blends European and North African influences, creating a tranquil, luxurious retreat. Panoramic sea views, opulent interiors, and lush courtyards make it a breathtaking backdrop for an unforgettable celebration.
          </p>
          <Divider />
          <div className={styles.eventsContainer}>
            <div className={styles.eventCard}>
              <Card title="Welcome Party">
                <div className={styles.eventTime}>
                  Thursday, 9/25/2025
                  <br />
                  <span className={styles.attire}>Desert Oasis</span>
                </div>
                <div className={styles.eventImage}>
                  <Image
                    src="/images/welcomeparty.jpg"
                    alt="Welcome Party Setup"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectPosition: 'center 40%' }}
                  />
                </div>
              </Card>
            </div>
            <div className={styles.eventCard}>
              <Card title="Wedding Day">
                <div className={styles.eventTime}>
                  Friday, 9/26/2025
                  <br />
                  <span className={styles.attire}>Attire: Black tie, formal</span>
                </div>
                <div className={styles.eventImage}>
                  <Image
                    src="/images/lmb-2.jpg"
                    alt="La Maison Bleue Wedding Setup"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
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