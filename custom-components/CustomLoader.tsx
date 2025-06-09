import * as React from 'react';
import BlockLoader from '@components/BlockLoader';
import styles from './CustomLoader.module.scss';

const LOADING_STEPS = [
  'DOWNLOADING HIBISCUS.DLL 🌺',
  'INSTALLING ZAFFE.EXE 🪘',
  'WATCHING SWORD-CAKE-CUTTING.MP4 🍰🗡️',
  'UPLOADING TAMALLY-MAAK-AMR-DIAB.MP3 💿',
  'CHECKING THE WEATHER IN EL GOUNA 🌴'
];

const ASCII_ART = `                       #######
            ######    ########       #####
        ###########/#####\\#####  #############
    ############/##########--#####################
  ####         ######################          #####
 ##          ####      ##########/@@              ###
#          ####        ,-.##/\`.#\\#####               ##
          ###         /  |$/  |,-. ####                 #
         ##           \\_,'$\\_,'|  \\  ###
         #              \\_$$$$$\`._/   ##
                          $$$$$_/     ##
                          $$$$$        #
                          $$$$$
                          $$$$$
                          $$$$$
                          $$$$$
                         $$$$$
                         $$$$$
                         $$$$$
                         $$$$$        ___
                         $$$$$    _.-'   \`-._
                        $$$$$   ,'           \`.
                        $$$$$  /               \\
~~~~~~~~~~~~~~~~~~~~~~~$$$$$~~~'~~~~~~~~~~~~~~~~\`~~~~~~~~~~~~
   ~      ~  ~    ~  ~ $$$$$  ~   ~       ~          ~
       ~ ~      .o,    $$$$$     ~    ~  ~        ~
  ~            ~ ^   ~ $$$$$~        ______    ~        ~
_______________________$$$$$________|\\\\\\\\\\\_________________
                       $$$$$        |>\\\\\\\\\\\\
    ______             $$$$$        |>>\\\\\\\\\\\\\\
   \\Q%=/\\,\\            $$$$$       /\\>>|#####|
    \`------\`           $$$$$      /=|\\>|#####|
                       $$$$$        ||\\|#####|
                      $$$$$$$          ||"""||
                      $$$$$$$          ||   ||
                     $$$$$$$$$
"""""""""""""""""""""$$$$$$$$$"""""""""""""""""""""""""""""""
PACKING BAGS...BUYING TICKETS TO EGYPT...APPLYING SPF-30.....`;

interface CustomLoaderProps {
  onLoadingComplete?: () => void;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({ onLoadingComplete }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [showAsciiArt, setShowAsciiArt] = React.useState(false);
  const [countdown, setCountdown] = React.useState(5);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    const stepDuration = 1500; // 1.5 seconds per step
    let currentStepTimeout: NodeJS.Timeout;

    const progressSteps = () => {
      if (currentStep < LOADING_STEPS.length - 1) {
        currentStepTimeout = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, stepDuration);
      } else {
        setTimeout(() => {
          setShowAsciiArt(true);
          setShowPrompt(true);
        }, stepDuration);
      }
    };

    progressSteps();

    return () => {
      if (currentStepTimeout) {
        clearTimeout(currentStepTimeout);
      }
    };
  }, [currentStep]);

  React.useEffect(() => {
    if (!showPrompt) return;

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [showPrompt]);

  React.useEffect(() => {
    if (!showPrompt) return;

    const handleInteraction = (event: Event) => {
      event.preventDefault();
      onLoadingComplete?.();
    };

    if (isMobile) {
      window.addEventListener('touchstart', handleInteraction);
      return () => window.removeEventListener('touchstart', handleInteraction);
    } else {
      window.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.code === 'Space') {
          handleInteraction(event);
        }
      });
      return () => window.removeEventListener('keydown', handleInteraction);
    }
  }, [showPrompt, onLoadingComplete, isMobile]);

  React.useEffect(() => {
    if (countdown === 0) {
      onLoadingComplete?.();
    }
  }, [countdown, onLoadingComplete]);

  return (
    <div className={styles.loader}>
      {!showAsciiArt ? (
        <div className={styles.loadingSteps}>
          {LOADING_STEPS.slice(0, currentStep + 1).map((step, index) => (
            <div key={index} className={styles.loadingStep}>
              <span>{step}</span>
              {index === currentStep && <BlockLoader mode={1} />}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.loadingSteps}>
            <pre className={styles.asciiArt}>{ASCII_ART}</pre>
          </div>
          {showPrompt && (
            <div className={styles.prompt}>
              {isMobile ? `TAP TO ENTER [${countdown}]` : `PRESS SPACE TO ENTER [${countdown}]`}
              <br />
              BY ENTERING YOU AGREE TO RSVP BY 08/01/2025 
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomLoader; 