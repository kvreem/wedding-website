import * as React from 'react';
import Navigation from '../components/Navigation';
import ActionButton from '../components/ActionButton';
import DropdownMenu from '../components/DropdownMenu';
import Avatar from '../components/Avatar';
import { toggleDebugGrid } from '../components/DebugGrid';
import { useModals } from '../components/page/ModalContext';
import ModalAlert from '../components/modals/ModalAlert';
import ModalTrigger from '@components/ModalTrigger';
import styles from './MainNavigation.module.scss';
import ModalError from '@root/components/modals/ModalError';
import dynamic from 'next/dynamic';
import { useIdleTimer } from '@fancy/components/hooks/useIdleTimer';
import CirclingElements from './CirclingElements';
import DesktopIcons from './DesktopIcons';

const Screensaver = dynamic(() => import('@fancy/components/Screensaver'), {
  ssr: false,
});

interface MainNavigationProps {
  temperature?: number;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ 
  temperature
}) => {
  const { open } = useModals();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isCelsius, setIsCelsius] = React.useState(true);
  const [mainMenuOpen, setMainMenuOpen] = React.useState(false);
  const [mainMenuPosition, setMainMenuPosition] = React.useState({ top: 0, left: 0 });
  const mainButtonRef = React.useRef<HTMLDivElement>(null);
  const [socialMenuOpen, setSocialMenuOpen] = React.useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = React.useState(false);
  const [socialMenuPosition, setSocialMenuPosition] = React.useState({ top: 0, left: 0 });
  const [themeMenuPosition, setThemeMenuPosition] = React.useState({ top: 0, left: 0 });
  const socialButtonRef = React.useRef<HTMLDivElement>(null);
  const themeButtonRef = React.useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isDebugMode, setIsDebugMode] = React.useState(false);
  const [isScreensaverActive, setIsScreensaverActive] = React.useState(false);
  const { isIdle } = useIdleTimer(60000); // 60 seconds

  // Only activate screensaver on idle, don't deactivate on activity
  React.useEffect(() => {
    if (isIdle) {
      setIsScreensaverActive(true);
    }
  }, [isIdle]);

  const tempFahrenheit = temperature ? Math.round((temperature * 9/5) + 32) : null;
  const degreeSymbol = '°';

  const handleCloseAllMenus = () => {
    setMainMenuOpen(false);
    setSocialMenuOpen(false);
    setThemeMenuOpen(false);
  };

  const handleMainClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mainButtonRef.current) {
      const rect = mainButtonRef.current.getBoundingClientRect();
      setMainMenuPosition({ top: rect.bottom, left: rect.left });
      setMainMenuOpen(true);
    }
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setThemeMenuOpen(false);
    if (socialButtonRef.current) {
      const rect = socialButtonRef.current.getBoundingClientRect();
      setSocialMenuPosition({ top: rect.top, left: rect.right + 8 });
      setSocialMenuOpen(!socialMenuOpen);
    }
  };

  const handleThemeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSocialMenuOpen(false);
    if (themeButtonRef.current) {
      const rect = themeButtonRef.current.getBoundingClientRect();
      setThemeMenuPosition({ top: rect.top, left: rect.right + 8 });
      setThemeMenuOpen(!themeMenuOpen);
    }
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.body.classList.toggle('theme-dark');
    handleCloseAllMenus();
  };

  const handleDebugModeToggle = () => {
    const newDebugMode = !isDebugMode;
    setIsDebugMode(newDebugMode);
    toggleDebugGrid();
    handleCloseAllMenus();
  };

  const handleScreensaverToggle = () => {
    setIsScreensaverActive(true);
    handleCloseAllMenus();
  };

  const handleScreensaverDismiss = () => {
    setIsScreensaverActive(false);
  };

  const mainMenuItems = [
    {
      children: 'Sleep',
      onClick: handleScreensaverToggle
    },
    { 
      children: <div ref={socialButtonRef} style={{ display: 'flex', alignItems: 'center' }}>
        Social Media <span style={{ marginLeft: '4px', lineHeight: 1 }}>&#x21FE;</span>
      </div>, 
      onClick: () => handleSocialClick(new MouseEvent('click') as any)
    },
    { 
      children: <div ref={themeButtonRef} style={{ display: 'flex', alignItems: 'center' }}>
        Theme <span style={{ marginLeft: '4px', lineHeight: 1 }}>&#x21FE;</span>
      </div>, 
      onClick: () => handleThemeClick(new MouseEvent('click') as any)
    },
  ];

  const socialMenuItems = [
    { 
      children: 'Instagram',
      href: 'https://instagram.com/heidiandkareem',
      target: '_blank'
    },
  ];

  const themeMenuItems = [
    { children: isDebugMode ? 'Exit Debug Mode' : 'Debug Mode', onClick: handleDebugModeToggle },
    { children: isDarkMode ? 'Light Mode' : 'Dark Mode', onClick: handleDarkModeToggle },
  ];

  const left = (
    <div className={styles.actionGroup}>
      <div ref={mainButtonRef}>
        <ActionButton onClick={handleMainClick}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            Heidi &#10084; Kareem <span style={{ marginLeft: '4px', lineHeight: 1 }}>&#x2193;</span>
          </span>
        </ActionButton>
      </div>
    </div>
  );

  const right = (
    <div className={styles.weatherModule}>
      <span className={styles.weatherIcon}>&#9788;</span>
      <span className="hidden md:inline">TEMPERATURE IN GOUNA: </span>
      <span className="md:hidden">GOUNA: </span>
      <span>
        {temperature ? (
          `${isCelsius ? temperature : tempFahrenheit}${degreeSymbol}${isCelsius ? 'C' : 'F'}`
        ) : (
          'Loading...'
        )}
      </span>
      <ActionButton onClick={() => setIsCelsius(!isCelsius)}>
        {isCelsius ? 'F' : 'C'}
      </ActionButton>
    </div>
  );

  return (
    <>
      <CirclingElements />
      <DesktopIcons icons={[]} />
      <div className={styles.navigationWrapper}>
        <Navigation
          left={left}
          right={right}
        />
        {mainMenuOpen && (
          <DropdownMenu
            style={{
              position: 'fixed',
              top: mainMenuPosition.top,
              left: mainMenuPosition.left,
              zIndex: 1001
            }}
            items={mainMenuItems}
            onClose={handleCloseAllMenus}
          />
        )}
        {socialMenuOpen && (
          <DropdownMenu
            style={{
              position: 'fixed',
              top: socialMenuPosition.top,
              left: socialMenuPosition.left,
              zIndex: 1002
            }}
            items={socialMenuItems}
            onClose={() => setSocialMenuOpen(false)}
          />
        )}
        {themeMenuOpen && (
          <DropdownMenu
            style={{
              position: 'fixed',
              top: themeMenuPosition.top,
              left: themeMenuPosition.left,
              zIndex: 1002
            }}
            items={themeMenuItems}
            onClose={() => setThemeMenuOpen(false)}
          />
        )}
      </div>
      {isScreensaverActive && <Screensaver onDismiss={handleScreensaverDismiss} />}
    </>
  );
};

export default MainNavigation; 