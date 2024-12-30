'use client';

import * as React from 'react';

import RadioButton from '@components/RadioButton';

interface RadioButtonGroupProps {
  options: { value: string; label: string }[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, defaultValue = '', onValueChange }) => {
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
        <RadioButton key={option.value} name="example" value={option.value} selected={selectedValue === option.value} onSelect={handleSelect}>
          {option.label}
        </RadioButton>
      ))}
    </>
  );
};

export default RadioButtonGroup;
