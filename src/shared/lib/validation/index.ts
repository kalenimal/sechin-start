import { z } from 'zod';

export const emailSchema = z.string().trim().min(1, 'Укажите электронную почту').email('Некорректный формат почты');

export const passwordSchema = z.string().min(8, 'Минимум 8 символов');

export const requiredString = (message = 'Обязательное поле') => z.string().trim().min(1, message);

export const phoneSchema = z
  .string()
  .refine((value) => value.replace(/\D/g, '').length === 11, 'Укажите номер телефона полностью');

/** Formats digits as "+7 900 900 00 00" while typing. */
export function formatPhone(input: string): string {
  let digits = input.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith('7')) digits = `7${digits}`;
  digits = digits.slice(0, 11);
  const parts = [digits.slice(1, 4), digits.slice(4, 7), digits.slice(7, 9), digits.slice(9, 11)].filter(Boolean);
  return ['+7', ...parts].join(' ');
}
