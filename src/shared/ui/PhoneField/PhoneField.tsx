'use client';

import { formatPhone } from '@/shared/lib/validation';
import { TextField, type TextFieldProps } from '../TextField';

type PhoneFieldProps = Omit<TextFieldProps, 'value' | 'onChange' | 'type'> & {
  value: string;
  onChange: (value: string) => void;
};

/** Russian phone input with live "+7 900 900 00 00" mask. Designed for react-hook-form `Controller`. */
export function PhoneField({
  value,
  onChange,
  onFocus,
  placeholder = '+7 --- --- -- --',
  label = 'Телефон',
  ...rest
}: PhoneFieldProps) {
  return (
    <TextField
      label={label}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(formatPhone(event.target.value))}
      onFocus={(event) => {
        if (!value) onChange('+7 ');
        onFocus?.(event);
      }}
      {...rest}
    />
  );
}
