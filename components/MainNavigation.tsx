import * as React from 'react';
import Navigation from './Navigation';
import ActionButton from './ActionButton';
import DropdownMenu from './DropdownMenu';
import styles from './MainNavigation.module.scss';

const MainNavigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });
  const menuTriggerRef = React.useRef<HTMLDivElement>(null);

  const handleMainMenuClick = () => {
    if (menuTriggerRef.current) {
      const rect = menuTriggerRef.current.getBoundingClientRect();
      setMenuPosition({ top: rect.bottom, left: rect.left });
      setMenuOpen(!menuOpen);
    }
  };

  const mainMenuItems = [
    { children: 'Story', onClick: () => {} },
    { children: 'Album', onClick: () => {} },
    { children: 'Programme', onClick: () => {} },
    { children: 'Registry', onClick: () => {} },
    { children: 'RSVP', onClick: () => {} },
  ];

  const left = (
    <div ref={menuTriggerRef} className={styles.menuTrigger}>
      <ActionButton
        onClick={handleMainMenuClick}
        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        Heidi + Kareem <span style={{ fontSize: '16px' }}>&#x2304;</span>
      </ActionButton>
    </div>
  );

  const right = (
    <div className={styles.weatherModule}>
      <ActionButton>
        23°C Sunny
      </ActionButton>
    </div>
  );

  return (
    <div className={styles.navigationWrapper}>
      <Navigation
        left={left}
        right={right}
      />
      {menuOpen && (
        <DropdownMenu
          style={{
            position: 'fixed',
            top: menuPosition.top,
            left: menuPosition.left,
            zIndex: 1001
          }}
          items={mainMenuItems}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default MainNavigation; 