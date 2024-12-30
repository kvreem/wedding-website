'use client';

import React from 'react';
import Input from '@components/Input';
import ActionButton from '@components/ActionButton';
import Card from '@components/Card';
import RadioButtonGroup from '@components/RadioButtonGroup';
import styles from './RSVPForm.module.scss';

interface RSVPFormProps {
  onClose: () => void;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ onClose }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [guestName, setGuestName] = React.useState('');
  const [showFullForm, setShowFullForm] = React.useState(false);
  const [hasPlusOne, setHasPlusOne] = React.useState(false);
  const [error, setError] = React.useState('');
  const [dietaryPreference, setDietaryPreference] = React.useState('no_preference');
  const [guestDietaryPreference, setGuestDietaryPreference] = React.useState('no_preference');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [attending, setAttending] = React.useState('yes');
  const [submitting, setSubmitting] = React.useState(false);

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/rsvp/verify-guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (data.found) {
        setShowFullForm(true);
        setHasPlusOne(data.hasPlusOne);
        setError('');
      } else {
        setError('Name not found in guest list');
      }
    } catch (error) {
      console.error('Error verifying guest:', error);
      setError('Failed to verify guest. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/rsvp/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          attending: attending === 'yes',
          dietaryPreference,
          ...(hasPlusOne && {
            guestName,
            guestDietaryPreference,
          }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit RSVP');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setError('Failed to submit RSVP. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const dietaryOptions = [
    { value: 'no_preference', label: 'No Preference' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'pescatarian', label: 'Pescatarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'dairy_free', label: 'Dairy Free' },
    { value: 'allergic_nuts', label: 'Allergic: Nuts' },
  ];

  if (isSubmitted) {
    return (
      <div className={styles.root}>
        <div className={styles.contentWrapper}>
          <div className="relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
              <ActionButton onClick={onClose}>X</ActionButton>
            </div>
            <Card title="RSVP CONFIRMED">
              <div className="py-8 text-center space-y-4">
                <p className="text-lg">Thank you for your response!</p><br />
                <p className="text-sm text-gray-600">If you RSVPd yes, our team will be reaching out to you soon.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!showFullForm) {
    return (
      <div className={styles.root}>
        <div className={styles.contentWrapper}>
          <div className="relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
              <ActionButton onClick={onClose}>X</ActionButton>
            </div>
            <Card title="FIND YOUR INVITATION">
              <form onSubmit={handleNameSubmit} className="space-y-8 py-4">
                <div className="space-y-6">
                  <div>
                    <Input
                      label="FULL NAME"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                      }}
                      placeholder="Enter your full name"
                      required
                    />
                    {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
                  </div>
                </div>
                <div className="flex justify-end items-center gap-4 pt-4">
                  <ActionButton onClick={handleNameSubmit}>
                    Find Invitation
                  </ActionButton>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <div className="relative">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
            <ActionButton onClick={onClose}>X</ActionButton>
          </div>
          <Card title="RSVP">
            <form onSubmit={handleSubmit} className="space-y-8 py-4">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Will you be joining us?</h3>
                  <RadioButtonGroup
                    defaultValue={attending}
                    options={[
                      { value: 'yes', label: 'Yes, I can make it' },
                      { value: 'no', label: 'No, I cannot make it' },
                    ]}
                    onValueChange={setAttending}
                  />
                </div>

                <Input
                  label="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  required
                />

                <Input
                  label="PHONE"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  type="tel"
                  required
                />

                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Your Dietary Preferences</h3>
                  <RadioButtonGroup
                    defaultValue={dietaryPreference}
                    options={dietaryOptions}
                    onValueChange={setDietaryPreference}
                  />
                </div>

                {hasPlusOne && (
                  <>
                    <Input
                      label="GUEST NAME (+1)"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Enter your guest's name"
                      required
                    />
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-700">Guest's Dietary Preferences</h3>
                      <RadioButtonGroup
                        defaultValue={guestDietaryPreference}
                        options={dietaryOptions}
                        onValueChange={setGuestDietaryPreference}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end items-center gap-4 pt-4">
                <ActionButton onClick={handleSubmit}>
                  Confirm RSVP
                </ActionButton>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RSVPForm; 