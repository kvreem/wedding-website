'use client';

import React from 'react';
import Input from '@components/Input';
import ActionButton from '@components/ActionButton';
import Card from '@components/Card';
import RadioButtonGroup from '@components/RadioButtonGroup';
import { Floating, FloatingElement } from '../fancy/components/ParallaxFloating';
import Image from 'next/image';
import styles from './RSVPForm.module.scss';
import Dialog from '@components/Dialog';

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
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);

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

  const submitRSVP = async () => {
    setSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/rsvp/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.toLowerCase(),
          email,
          phone,
          attending: attending === 'yes',
          dietaryPreference,
          ...(hasPlusOne && guestName && {
            guestName,
            guestDietaryPreference,
          }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit RSVP');
        return;
      }

      setIsSubmitted(true);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setError('Failed to submit RSVP. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (attending === 'no' && !showConfirmDialog) {
      setShowConfirmDialog(true);
      return;
    }
    
    await submitRSVP();
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
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <Floating sensitivity={0.03} easingFactor={0.02} className="relative w-full h-full">
            <FloatingElement depth={1.5} className="absolute top-[10%] left-[15%] w-[250px] h-[250px]">
              <Image src="/images/floating/1.JPEG" alt="Floating image 1" className="rounded-lg object-cover" fill priority />
            </FloatingElement>
            <FloatingElement depth={2} className="absolute top-[20%] right-[20%] w-[200px] h-[200px]">
              <Image src="/images/floating/2.JPEG" alt="Floating image 2" className="rounded-lg object-cover" fill priority />
            </FloatingElement>
            <FloatingElement depth={1} className="absolute bottom-[25%] left-[25%] w-[300px] h-[300px]">
              <Image src="/images/floating/3.JPEG" alt="Floating image 3" className="rounded-lg object-cover" fill priority />
            </FloatingElement>
          </Floating>
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
                    name="attending"
                    defaultValue={attending}
                    options={[
                      { value: 'yes', label: 'Yes, I can make it' },
                      { value: 'no', label: 'No, I cannot make it' },
                    ]}
                    onValueChange={setAttending}
                  />
                </div>

                {attending === 'yes' && (
                  <>
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
                        name="primary-guest-dietary"
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
                            name="plus-one-dietary"
                            defaultValue={guestDietaryPreference}
                            options={dietaryOptions}
                            onValueChange={setGuestDietaryPreference}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="flex justify-end items-center gap-4 pt-4">
                <ActionButton type="submit">
                  Confirm RSVP
                </ActionButton>
              </div>
            </form>
          </Card>
        </div>
      </div>
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Dialog
            title="ARE YOU SURE?"
            onConfirm={submitRSVP}
            onCancel={() => {
              setShowConfirmDialog(false);
              setAttending('yes');
            }}
            confirmText="YES"
            cancelText="CANCEL"
          >
            Are you sure you want to RSVP No? Don't break our little ♥'s 
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default RSVPForm; 