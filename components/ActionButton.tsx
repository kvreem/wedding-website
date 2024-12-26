import styles from '@components/ActionButton.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hotkey?: any;
  children?: React.ReactNode;
  isSelected?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  hotkey, 
  children, 
  style, 
  isSelected,
  type = 'button',
  ...rest 
}) => {
  return (
    <button 
      className={Utilities.classNames(styles.root, isSelected ? styles.selected : null)} 
      onClick={onClick} 
      type={type}
      {...rest}
    >
      {Utilities.isEmpty(hotkey) ? null : <span className={styles.hotkey}>{hotkey}</span>}
      <span className={styles.content} style={style}>
        {children}
      </span>
    </button>
  );
};

export default ActionButton;
