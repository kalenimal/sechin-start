'use client';

import { Controller, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { PhoneField } from '@/shared/ui/PhoneField';
import { TextField } from '@/shared/ui/TextField';
import { FormSection } from './FormSection';

type ContactValues = { fullName: string; email: string; phone: string };

type Props<T extends ContactValues> = {
  register: UseFormRegister<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
};

export function ContactFields<T extends ContactValues>({ register, control, errors }: Props<T>) {
  // react-hook-form generics can't narrow nested paths of a generic T; the three keys are guaranteed by ContactValues.
  const reg = register as unknown as UseFormRegister<ContactValues>;
  const ctrl = control as unknown as Control<ContactValues>;
  const errs = errors as FieldErrors<ContactValues>;
  return (
    <FormSection title="Контактная информация">
      <TextField
        label="Имя и фамилия"
        required
        placeholder="Алексей Алексеев"
        autoComplete="name"
        error={errs.fullName?.message}
        {...reg('fullName')}
      />
      <TextField
        label="Электронная почта"
        required
        type="email"
        placeholder="name@mail.ru"
        autoComplete="email"
        error={errs.email?.message}
        {...reg('email')}
      />
      <Controller
        control={ctrl}
        name="phone"
        render={({ field, fieldState }) => (
          <PhoneField
            required
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />
    </FormSection>
  );
}
