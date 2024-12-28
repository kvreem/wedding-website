import styles from '@components/TravelSection.module.scss';
import Image from 'next/image';
import Card from '@components/Card';
import ActionButton from '@components/ActionButton';
import Button from '@components/Button';
import Badge from '@components/Badge';

interface TravelSectionProps {
  onClose: () => void;
}

const TravelSection: React.FC<TravelSectionProps> = ({ onClose }) => {
  return (
    <div className={styles.root}>
      <div className="relative">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
          <ActionButton onClick={onClose}>
            X
          </ActionButton>
        </div>
        <Card title="Getting Here">
          <div className={styles.travelContainer}>
            <div className={styles.airportCard}>
              <Card title="Hurghada Airport (HRG)">
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/hrg-airport.jpg"
                    alt="Hurghada International Airport"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.image}
                  />
                </div>
                <Button 
                  theme="PRIMARY"
                  onClick={() => window.open('https://www.hurghada-airport.com', '_blank')}
                >
                  Airport Info
                </Button>
                <div className={styles.badgeContainer}>
                  <Badge>30 min from venue</Badge>
                </div>
              </Card>
            </div>
            <div className={styles.airportCard}>
              <Card title="Cairo Airport (CAI)">
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/cai-airport.jpg"
                    alt="Cairo International Airport"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.image}
                  />
                </div>
                <Button 
                  theme="PRIMARY"
                  onClick={() => window.open('https://cairo-airport.com', '_blank')}
                >
                  Airport Info
                </Button>
                <div className={styles.badgeContainer}>
                  <Badge>1 hour flight to HRG</Badge>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TravelSection; 