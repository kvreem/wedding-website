import styles from './StaysSection.module.scss';
import Image from 'next/image';
import Card from '@components/Card';
import ActionButton from '@components/ActionButton';
import Button from '@components/Button';
import Badge from '@components/Badge';
import Divider from '@components/Divider';

interface StaysSectionProps {
  onClose: () => void;
}

const StaysSection: React.FC<StaysSectionProps> = ({ onClose }) => {
  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <div className="relative">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
            <ActionButton onClick={onClose}>X</ActionButton>
          </div>
          <Card title="WHERE TO STAY">
            <div className={styles.eventsContainer}>
              <div className={styles.hotelCard}>
                <Card title="CASA COOK">
                  <div className={styles.imageContainer}>
                    <Image src="/images/casacook.jpg" alt="Casa Cook Hotel Room" fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.image} priority />
                  </div>
                  <Button theme="PRIMARY" onClick={() => window.open('https://casacook.com/casa-cook-el-gouna', '_blank')}>
                    Visit Website
                  </Button>
                  <div className={styles.badgeContainer}><Badge>5 min from venue</Badge></div>
                </Card>
              </div>
          
              <div className={styles.hotelCard}>
                <Card title="COOKS CLUB">
                  <div className={styles.imageContainer}>
                    <Image src="/images/cooksclub.jpg" alt="Cooks Club El Gouna" fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.image} priority />
                  </div>
                  <Button theme="PRIMARY" onClick={() => window.open('https://www.cooksclub.com/en', '_blank')}>
                    Visit Website
                  </Button>
                  <div className={styles.badgeContainer}><Badge>8 min from venue</Badge></div>
                </Card>
              </div>
            </div>

            <div className={styles.infoSection}>
              <Divider type="DOUBLE" />
              <p className={styles.disclaimer}>Our concierge will reach out after your RSVP to assist with booking.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaysSection;
