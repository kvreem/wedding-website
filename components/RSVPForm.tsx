'use client';

import React from 'react';
import Input from './Input';
import ActionButton from './ActionButton';
import Card from './Card';

interface RSVPFormProps {
  onClose: () => void;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ onClose }) => {
  const [fullName, setFullName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('RSVP submitted for:', fullName);
    onClose();
  };

  return (
    <div className="w-full max-w-[90vw] md:max-w-[600px] mx-auto px-4">
      <Card title="RSVP">
        <form onSubmit={handleSubmit} className="space-y-8 py-4">
          <div className="space-y-6">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex justify-between items-center gap-4 pt-4">
            <ActionButton type="submit">
              Confirm RSVP
            </ActionButton>
            <ActionButton onClick={onClose}>
              X
            </ActionButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RSVPForm; 