import styles from './ConciergeSection.module.scss';
import Card from '@components/Card';
import ActionButton from '@components/ActionButton';

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
    </div>
  );
};

export default ConciergeSection; 