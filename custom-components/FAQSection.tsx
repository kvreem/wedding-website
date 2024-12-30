import styles from './FAQSection.module.scss';
import Card from '@components/Card';
import Divider from '@components/Divider';
import ActionButton from '@components/ActionButton';

interface FAQSectionProps {
  onClose: () => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ onClose }) => {
  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <div className="relative">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
            <ActionButton onClick={onClose}>X</ActionButton>
          </div>
          <Card title="FAQs">
            <div className={styles.faqContainer}>
              <div className={styles.question}>
                <h3>Can we bring our kids?</h3>
                <p>This is a kid-free event. We appreciate your understanding and would have loved to accommodate children otherwise.</p>
              </div>
              
              <Divider />
              
              <div className={styles.question}>
                <h3>How do I get around?</h3>
                <p>El Gouna is a private, gated community with convenient options like Uber and TukTuk taxis. Our concierge will also coordinate transportation to and from the airport, your hotel, and our wedding venues.</p>
              </div>
              
              <Divider />
              
              <div className={styles.question}>
                <h3>What are things I should do in El Gouna?</h3>
                <p>El Gouna is famous for its stunning Red Sea beaches and world-class kite surfing. It also boasts an 18-hole golf course, a variety of excellent restaurants, and other local attractions. We'll update our website with special offers as we get closer to the big day.</p>
              </div>

              <Divider />
              
              <div className={styles.question}>
                <h3>Is there a registry?</h3>
                <p>We do not have one—having all our loved ones together to celebrate is all we need.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQSection; 