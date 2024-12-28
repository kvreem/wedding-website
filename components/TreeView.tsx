'use client';

import styles from '@components/TreeView.module.scss';
import ActionButton from '@components/ActionButton';
import * as React from 'react';

interface TreeViewProps {
  defaultValue?: boolean;
  title: string;
  children?: React.ReactNode;
  depth?: number;
  isFile?: boolean;
  isRoot?: boolean;
  isLastChild?: boolean;
  parentLines?: boolean[];
  onClick?: () => void;
  expandedTitle?: string;
  collapsedTitle?: string;
}

const TreeView: React.FC<TreeViewProps> = ({ defaultValue = false, title, children, depth = 0, isFile = false, isRoot = false, isLastChild = false, parentLines = [], onClick, expandedTitle, collapsedTitle }) => {
  const [show, setShow] = React.useState<boolean>(defaultValue);

  const onToggleShow = (): void => {
    if (isFile && onClick) {
      onClick();
    } else if (!isFile) {
      setShow((prevShow) => !prevShow);
    }
  };

  const hasChildren = React.Children.count(children) > 0;
  const isEmptyFolder = !isFile && !hasChildren;

  const spacing = parentLines.map((line) => (line ? '│ . ' : '. . ')).join('');
  const endPrefix = isLastChild ? '└───' : '├───';
  const prefix = `${spacing}${endPrefix}`;
  const icon = isFile ? ' ' : show ? '╦ ' : '╤ ';

  const displayTitle = isRoot && (expandedTitle || collapsedTitle) 
    ? (show ? expandedTitle : collapsedTitle) 
    : title;

  const updatedParentLines = [...parentLines, !isLastChild];

  return (
    <div className={styles.root}>
      {isRoot ? (
        <div className={`${styles.rootButton} ${!show ? styles.collapsed : ''}`}>
          <ActionButton onClick={onToggleShow} isSelected={show}>
            {displayTitle}
          </ActionButton>
        </div>
      ) : (
        <div tabIndex={0} role="button" onClick={onToggleShow} className={styles.item} aria-expanded={show}>
          {prefix}
          {icon}
          {displayTitle}
        </div>
      )}
      {show && hasChildren && (
        <div>
          {React.Children.map(children, (child, index) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<TreeViewProps>, {
                  depth: depth + 1,
                  isLastChild: index === React.Children.count(children) - 1,
                  parentLines: updatedParentLines,
                })
              : child
          )}
        </div>
      )}
    </div>
  );
};

export default TreeView;
