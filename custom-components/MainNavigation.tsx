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

interface MainNavigationProps {
  temperature?: number;
  onStoryClick?: () => void;
  onAlbumClick?: (imageName: string) => void;
  onDetailsClick?: (section: 'travel' | 'programme' | 'stays') => void;
  onMenuClick?: (section: string) => void;
  onRSVPClick?: () => void;
  onConciergeClick?: () => void;
  onFAQClick?: () => void;
  onPlaylistClick?: () => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ 
  temperature,
  onStoryClick,
  onAlbumClick,
  onDetailsClick,
  onMenuClick,
  onRSVPClick,
  onConciergeClick,
  onFAQClick,
  onPlaylistClick
}) => {
  const { open } = useModals();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [albumMenuOpen, setAlbumMenuOpen] = React.useState(false);
  const [detailsMenuOpen, setDetailsMenuOpen] = React.useState(false);
  const [albumMenuPosition, setAlbumMenuPosition] = React.useState({ top: 0, left: 0 });
  const [detailsMenuPosition, setDetailsMenuPosition] = React.useState({ top: 0, left: 0 });
  const [isCelsius, setIsCelsius] = React.useState(true);
  const albumButtonRef = React.useRef<HTMLDivElement>(null);
  const detailsButtonRef = React.useRef<HTMLDivElement>(null);
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

  const tempFahrenheit = temperature ? Math.round((temperature * 9/5) + 32) : null;
  const degreeSymbol = '°';

  const handleCloseAllMenus = () => {
    setAlbumMenuOpen(false);
    setDetailsMenuOpen(false);
    setMainMenuOpen(false);
    setSocialMenuOpen(false);
    setThemeMenuOpen(false);
  };

  const handleAlbumClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCloseAllMenus();
    if (albumButtonRef.current) {
      const rect = albumButtonRef.current.getBoundingClientRect();
      setAlbumMenuPosition({ top: rect.bottom, left: rect.left });
      setAlbumMenuOpen(true);
    }
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCloseAllMenus();
    if (detailsButtonRef.current) {
      const rect = detailsButtonRef.current.getBoundingClientRect();
      setDetailsMenuPosition({ top: rect.bottom, left: rect.left });
      setDetailsMenuOpen(true);
    }
  };

  const handleMainClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCloseAllMenus();
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

  const albumMenuItems = [
    { children: <Avatar src="/images/album/a.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>a.JPG</Avatar>, onClick: () => { onAlbumClick?.('a.JPG'); handleCloseAllMenus(); } },
    { children: <Avatar src="/images/album/b.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>b.JPG</Avatar>, onClick: () => { onAlbumClick?.('b.JPG'); handleCloseAllMenus(); } },
    { children: <Avatar src="/images/album/c.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>c.JPG</Avatar>, onClick: () => { onAlbumClick?.('c.JPG'); handleCloseAllMenus(); } },
    { children: <Avatar src="/images/album/d.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>d.JPG</Avatar>, onClick: () => { onAlbumClick?.('d.JPG'); handleCloseAllMenus(); } },
    { children: <Avatar src="/images/album/e.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>e.JPG</Avatar>, onClick: () => { onAlbumClick?.('e.JPG'); handleCloseAllMenus(); } },
    { children: <Avatar src="/images/album/f.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>f.JPG</Avatar>, onClick: () => { onAlbumClick?.('f.JPG'); handleCloseAllMenus(); } },
    { children: <Avatar src="/images/album/g.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>g.JPG</Avatar>, onClick: () => { onAlbumClick?.('g.JPG'); handleCloseAllMenus(); } },
    { children: <Avatar src="/images/album/h.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>h.JPG</Avatar>, onClick: () => { onAlbumClick?.('h.JPG'); handleCloseAllMenus(); } },
    { children: <Avatar src="/images/album/i.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>i.JPG</Avatar>, onClick: () => { onAlbumClick?.('i.JPG'); handleCloseAllMenus(); } },
    { children: <Avatar src="/images/album/j.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>j.JPG</Avatar>, onClick: () => { onAlbumClick?.('j.JPG'); handleCloseAllMenus(); } },
    { children: <Avatar src="/images/album/k.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>k.JPG</Avatar>, onClick: () => { onAlbumClick?.('k.JPG'); handleCloseAllMenus(); } },
    { children: <Avatar src="/images/album/l.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>l.JPG</Avatar>, onClick: () => { onAlbumClick?.('l.JPG'); handleCloseAllMenus(); } },
    { children: <Avatar src="/images/album/m.JPG" style={{ width: '32px', height: '32px', backgroundSize: 'cover', borderRadius: '0', marginRight: '12px' }}>m.JPG</Avatar>, onClick: () => { onAlbumClick?.('m.JPG'); handleCloseAllMenus(); } },
  ];

  const detailsMenuItems = [
    { children: 'Programme', onClick: () => { onMenuClick?.('venue'); handleCloseAllMenus(); } },
    { children: 'Stays', onClick: () => { onMenuClick?.('stays'); handleCloseAllMenus(); } },
    { children: 'Travel', onClick: () => { onMenuClick?.('travel'); handleCloseAllMenus(); } },
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

  const mainMenuItems = [
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

  const left = (
    <div className={styles.actionGroup}>
      <div ref={mainButtonRef}>
        <ActionButton onClick={handleMainClick}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            Heidi &#10084; Kareem <span style={{ marginLeft: '4px', lineHeight: 1 }}>&#x2193;</span>
          </span>
        </ActionButton>
      </div>
      <div ref={albumButtonRef}>
        <ActionButton 
          onClick={handleAlbumClick}
          onKeyDown={(e) => {
            // Prevent space from triggering the button's onClick
            if (e.key === ' ' || e.key === 'Spacebar') {
              e.preventDefault();
            }
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            Album <span style={{ marginLeft: '4px', lineHeight: 1 }}>&#x2193;</span>
          </span>
        </ActionButton>
      </div>
      <ActionButton onClick={() => { handleCloseAllMenus(); onConciergeClick?.(); }}>
        Concierge
      </ActionButton>
      <div ref={detailsButtonRef}>
        <ActionButton 
          onClick={handleDetailsClick}
          onKeyDown={(e) => {
            // Prevent space from triggering the button's onClick
            if (e.key === ' ' || e.key === 'Spacebar') {
              e.preventDefault();
            }
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            Details <span style={{ marginLeft: '4px', lineHeight: 1 }}>&#x2193;</span>
          </span>
        </ActionButton>
      </div>
      <ActionButton onClick={() => { handleCloseAllMenus(); onFAQClick?.(); }}>
        FAQ
      </ActionButton>
      <ActionButton onClick={() => { handleCloseAllMenus(); onPlaylistClick?.(); }}>
        Playlist
      </ActionButton>
      <ActionButton onClick={() => { handleCloseAllMenus(); onRSVPClick?.(); }}>
        RSVP
      </ActionButton>
      <ActionButton onClick={() => { handleCloseAllMenus(); onStoryClick?.(); }}>
        Story
      </ActionButton>
    </div>
  );

  const right = (
    <div className={styles.weatherModule}>
      <span className={styles.weatherIcon}>&#9788;</span>
      <span className="hidden md:inline">Temperature in GOUNA: </span>
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
      {albumMenuOpen && (
        <DropdownMenu
          style={{
            position: 'fixed',
            top: albumMenuPosition.top,
            left: albumMenuPosition.left,
            zIndex: 1001
          }}
          items={albumMenuItems}
          onClose={handleCloseAllMenus}
        />
      )}
      {detailsMenuOpen && (
        <DropdownMenu
          style={{
            position: 'fixed',
            top: detailsMenuPosition.top,
            left: detailsMenuPosition.left,
            zIndex: 1001
          }}
          items={detailsMenuItems}
          onClose={handleCloseAllMenus}
        />
      )}
    </div>
  );
};

export default MainNavigation; 