'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSession } from '@/entities/session';
import { delay } from '@/shared/api';
import { toast } from '@/shared/ui/Toast';
import { emailSchema, phoneSchema, requiredString } from '@/shared/lib/validation';

const schema = z.object({ fullName: requiredString('Укажите имя и фамилию'), email: emailSchema, phone: phoneSchema });
export type ContactsValues = z.infer<typeof schema>;

export function useContactsForm() {
  const user = useSession((state) => state.user)!;
  const updateUser = useSession((state) => state.updateUser);
  const form = useForm<ContactsValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: user.fullName, email: user.email, phone: user.phone },
  });
  const save = form.handleSubmit(async (values) => {
    await delay(400);
    updateUser({ fullName: values.fullName, phone: values.phone });
    form.reset(values);
    toast.success('Изменения профиля сохранены');
  });
  return { form, save, loginEmail: user.email };
}
