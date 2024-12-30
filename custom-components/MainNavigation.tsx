import * as React from 'react';
import Navigation from '../components/Navigation';
import ActionButton from '../components/ActionButton';
import DropdownMenu from '../components/DropdownMenu';
import styles from './MainNavigation.module.scss';

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
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [albumMenuOpen, setAlbumMenuOpen] = React.useState(false);
  const [detailsMenuOpen, setDetailsMenuOpen] = React.useState(false);
  const [albumMenuPosition, setAlbumMenuPosition] = React.useState({ top: 0, left: 0 });
  const [detailsMenuPosition, setDetailsMenuPosition] = React.useState({ top: 0, left: 0 });
  const [isCelsius, setIsCelsius] = React.useState(true);
  const albumButtonRef = React.useRef<HTMLDivElement>(null);
  const detailsButtonRef = React.useRef<HTMLDivElement>(null);

  const tempFahrenheit = temperature ? Math.round((temperature * 9/5) + 32) : null;
  const degreeSymbol = '°';

  const handleCloseAllMenus = () => {
    setAlbumMenuOpen(false);
    setDetailsMenuOpen(false);
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

  const albumMenuItems = [
    { children: 'a.JPG', onClick: () => { onAlbumClick?.('a.JPG'); handleCloseAllMenus(); } },
    { children: 'b.JPG', onClick: () => { onAlbumClick?.('b.JPG'); handleCloseAllMenus(); } },
    { children: 'c.JPG', onClick: () => { onAlbumClick?.('c.JPG'); handleCloseAllMenus(); } },
    { children: 'd.JPG', onClick: () => { onAlbumClick?.('d.JPG'); handleCloseAllMenus(); } },
    { children: 'e.JPG', onClick: () => { onAlbumClick?.('e.JPG'); handleCloseAllMenus(); } },
    { children: 'f.JPG', onClick: () => { onAlbumClick?.('f.JPG'); handleCloseAllMenus(); } },
    { children: 'g.JPG', onClick: () => { onAlbumClick?.('g.JPG'); handleCloseAllMenus(); } },
    { children: 'h.JPG', onClick: () => { onAlbumClick?.('h.JPG'); handleCloseAllMenus(); } },
    { children: 'i.JPG', onClick: () => { onAlbumClick?.('i.JPG'); handleCloseAllMenus(); } },
    { children: 'j.JPG', onClick: () => { onAlbumClick?.('j.JPG'); handleCloseAllMenus(); } },
    { children: 'k.JPG', onClick: () => { onAlbumClick?.('k.JPG'); handleCloseAllMenus(); } },
    { children: 'l.JPG', onClick: () => { onAlbumClick?.('l.JPG'); handleCloseAllMenus(); } },
    { children: 'm.JPG', onClick: () => { onAlbumClick?.('m.JPG'); handleCloseAllMenus(); } },
  ];

  const detailsMenuItems = [
    { children: 'Programme', onClick: () => { onDetailsClick?.('programme'); handleCloseAllMenus(); } },
    { children: 'Stays', onClick: () => { onDetailsClick?.('stays'); handleCloseAllMenus(); } },
    { children: 'Travel', onClick: () => { onDetailsClick?.('travel'); handleCloseAllMenus(); } },
  ];

  const left = (
    <div className={styles.actionGroup}>
      <ActionButton onClick={handleCloseAllMenus}>
        Heidi + Kareem
      </ActionButton>
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
      <span className="hidden md:inline">Temperature in Gouna: </span>
      <span className="md:hidden">Gouna: </span>
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