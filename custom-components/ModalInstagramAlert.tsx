'use client';

import styles from './ModalInstagramAlert.module.scss';

import * as React from 'react';

import { useHotkeys } from '@modules/hotkeys';
import { useModals } from '@components/page/ModalContext';

import ActionButton from '@components/ActionButton';
import Card from '@components/Card';

interface ModalInstagramAlertProps {
  message: string;
}

function ModalInstagramAlert({ message }: ModalInstagramAlertProps) {
  const { close } = useModals();

  useHotkeys('enter', () => close());

  return (
    <div className={styles.root}>
      <Card title="Instagram">
        {message}
        <br />
        <br />
        <ActionButton hotkey="⏎" onClick={() => close()}>
          ENTER
        </ActionButton>
      </Card>
    </div>
  );
}

export default ModalInstagramAlert; 