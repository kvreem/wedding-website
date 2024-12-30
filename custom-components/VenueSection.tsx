import styles from './VenueSection.module.scss';
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
        <Card title="Details">
          <div className={styles.mainImageContainer}>
            <Image
              src="/images/lmb.jpg"
              alt="La Maison Bleue - Venue"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
          <Divider />
          <p className="text-xs md:text-sm lg:text-base">
            La Maison Bleue is an exquisite boutique hotel perched along the Red Sea in El Gouna. Its grand design seamlessly blends European and North African influences, creating a tranquil, luxurious retreat. Panoramic sea views, opulent interiors, and lush courtyards make it a breathtaking backdrop for an unforgettable celebration.
          </p>
          <Divider />
          <div className={styles.eventsSection}>
            <div className={styles.dateHeader}>Thursday, 9/25/2025</div>
            <div className={styles.eventsContainer}>
              <div className={styles.eventCard}>
                <Card title="Katb Kitab (Ceremony)">
                  <div className={styles.imageContainer}>
                    <Image
                      src="/images/katbkitab.JPG"
                      alt="Katb Kitab Ceremony"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.eventTime}>
                    <span className={styles.attire}>Afternoon</span>
                    <span className={styles.attire}>Attire: Cocktail</span>
                  </div>
                </Card>
              </div>
              <div className={styles.eventCard}>
                <Card title="Welcome Party">
                  <div className={styles.imageContainer}>
                    <Image
                      src="/images/welcomeparty.jpg"
                      alt="Welcome Party Setup"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.image}
                      style={{ objectPosition: 'center 40%' }}
                    />
                  </div>
                  <div className={styles.eventTime}>
                    <span className={styles.attire}>Evening</span>
                    <span className={styles.attire}>Desert Oasis</span>
                  </div>
                </Card>
              </div>
            </div>

            <div className={styles.dateHeader}>Friday, 9/26/2025</div>
            <div className={styles.eventsContainer}>
              <div className={styles.eventCard}>
                <Card title="Reception">
                  <div className={styles.imageContainer}>
                    <Image
                      src="/images/lmb-2.jpg"
                      alt="La Maison Bleue Wedding Setup"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.eventTime}>
                    <span className={styles.attire}>Attire: Black tie, formal</span>
                  </div>
                </Card>
              </div>
              <div className={styles.eventCard}>
                <Card title="After Party">
                  <div className={styles.imageContainer}>
                    <Image
                      src="/images/afterparty.JPG"
                      alt="After Party"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.eventTime}>
                    <span className={styles.attire}>Late Night</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VenueSection; 