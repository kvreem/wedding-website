'use client';

import * as React from 'react';

import RadioButton from '@components/RadioButton';

interface RadioButtonGroupProps {
  options: { value: string; label: string }[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, defaultValue = '', onValueChange, name = 'radio-group' }) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(defaultValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <>
      {options.map((option) => (
        <RadioButton key={option.value} name={name} value={option.value} selected={selectedValue === option.value} onSelect={handleSelect}>
          {option.label}
        </RadioButton>
      ))}
    </>
  );
};

export default RadioButtonGroup;
