import styles from '@components/StaysSection.module.scss';
import Image from 'next/image';
import Card from '@components/Card';
import ActionButton from '@components/ActionButton';
import Button from '@components/Button';
import Badge from '@components/Badge';

interface StaysSectionProps {
  onClose: () => void;
}

const StaysSection: React.FC<StaysSectionProps> = ({ onClose }) => {
  return (
    <div className={styles.root}>
      <div className="relative">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
          <ActionButton onClick={onClose}>
            X
          </ActionButton>
        </div>
        <Card title="Where to Stay">
          <div className={styles.staysContainer}>
            <div className={styles.hotelCard}>
              <Card title="Casa Cook">
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/casacook1.jpg"
                    alt="Casa Cook Hotel Room"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.image}
                  />
                </div>
                <Button 
                  theme="PRIMARY"
                  onClick={() => window.open('https://casacook.com/casa-cook-el-gouna', '_blank')}
                >
                  Book Now
                </Button>
                <div className={styles.badgeContainer}>
                  <Badge>5 min from venue</Badge>
                </div>
              </Card>
            </div>
            <div className={styles.hotelCard}>
              <Card title="Sheraton">
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/sheraton.jpg"
                    alt="Sheraton El Gouna"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.image}
                  />
                </div>
                <Button 
                  theme="PRIMARY"
                  onClick={() => window.open('https://www.marriott.com/en-us/hotels/hrgsi-sheraton-miramar-resort-el-gouna/overview/', '_blank')}
                >
                  Book Now
                </Button>
                <div className={styles.badgeContainer}>
                  <Badge>9 min from venue</Badge>
                </div>
              </Card>
            </div>
            <div className={styles.hotelCard}>
              <Card title="Cooks Club">
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/cooksclub.jpg"
                    alt="Cooks Club El Gouna"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.image}
                  />
                </div>
                <Button 
                  theme="PRIMARY"
                  onClick={() => window.open('https://www.cooksclub.com/en', '_blank')}
                >
                  Book Now
                </Button>
                <div className={styles.badgeContainer}>
                  <Badge>8 min from venue</Badge>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StaysSection; 