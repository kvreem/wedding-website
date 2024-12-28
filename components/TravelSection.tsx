import styles from '@components/TravelSection.module.scss';
import Image from 'next/image';
import Card from '@components/Card';
import ActionButton from '@components/ActionButton';
import Button from '@components/Button';
import Badge from '@components/Badge';
import Divider from '@components/Divider';

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
                    src="/images/hrg.jpg"
                    alt="Hurghada International Airport"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.image}
                  />
                </div>
                <div className={styles.badgeContainer}>
                  <Badge>30 min from venue</Badge>
                </div>
              </Card>
            </div>
            <div className={styles.airportCard}>
              <Card title="Cairo Airport (CAI)">
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/cai.jpg"
                    alt="Cairo International Airport"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.image}
                  />
                </div>
                <div className={styles.badgeContainer}>
                  <Badge>1 hour flight to HRG</Badge>
                </div>
              </Card>
            </div>
          </div>

          <div className={styles.infoSection}>
            <Divider type="DOUBLE" />
            <div className={styles.infoBlock}>
              <h3>Flying from the U.S.</h3>
              <p>Most flights from U.S. airports (SFO, LAX, JFK, MIA) will include at least one stop in Europe or the Middle East. Common layover cities include Frankfurt, Istanbul, Doha, or Dubai.</p>
            </div>

            <Divider />
            <div className={styles.infoBlock}>
              <h3>Arrival in Hurghada</h3>
              <p>Once you land at Hurghada International Airport, we'll have private shuttles arranged to take you directly to your accommodations in El Gouna.</p>
            </div>

            <Divider />
            <div className={styles.infoBlock}>
              <h3>Exploring Egypt</h3>
              <p>We highly recommend flying straight into Hurghada for the wedding and then exploring the rest of Egypt afterward. If you plan to visit Cairo or other destinations, please email <a href="mailto:concierge@heidiandkareem.com" className={styles.email}>concierge@heidiandkareem.com</a> so we can assist you with travel arrangements. Cairo, Luxor, and the Sinai Peninsula are all extremely accessible via short domestic flights from Hurghada.</p>
            </div>

            <Divider />
            <div className={styles.infoBlock}>
              <p className={styles.welcome}>We look forward to welcoming you to El Gouna!</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TravelSection; 