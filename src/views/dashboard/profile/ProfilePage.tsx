'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Check, KeyRound, PencilLine, UserRound } from 'lucide-react';
import { ChangeEmailModal } from '@/features/profile/change-email';
import { ChangePasswordModal } from '@/features/profile/change-password';
import { useContactsForm } from '@/features/profile/edit-contacts';
import { LogoutButton } from '@/features/profile/logout';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';
import { PhoneField } from '@/shared/ui/PhoneField';
import { TextField } from '@/shared/ui/TextField';
import { TextLink } from '@/shared/ui/TextLink';
import { DashboardPage } from '@/widgets/dashboard-page';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { form, save, loginEmail } = useContactsForm();
  const { register, control, formState } = form;
  const [modal, setModal] = useState<'email' | 'password' | null>(null);
  const [section, setSection] = useState<'contacts' | 'security'>('contacts');

  return (
    <DashboardPage title="Настройки профиля">
      <form className={styles.layout} onSubmit={save} noValidate>
        <div className={styles.form}>
          <section id="contacts" className={styles.section}>
            <h2 className={styles.sectionTitle}>Контактная информация</h2>
            <TextField
              label="Имя и фамилия"
              required
              error={formState.errors.fullName?.message}
              {...register('fullName')}
            />
            <TextField
              label="Электронная почта"
              required
              type="email"
              error={formState.errors.email?.message}
              {...register('email')}
            />
            <Controller
              control={control}
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
          </section>
          <section id="security" className={styles.section}>
            <h2 className={styles.sectionTitle}>Безопасность</h2>
            <div className={styles.secure}>
              <TextField label="Электронная почта для входа" required value={loginEmail} disabled readOnly />
              <TextLink size="m" icon={<PencilLine aria-hidden />} onClick={() => setModal('email')}>
                Изменить почту для входа
              </TextLink>
            </div>
            <div className={styles.secure}>
              <TextField label="Пароль" required value="*************" type="text" disabled readOnly />
              <TextLink size="m" icon={<PencilLine aria-hidden />} onClick={() => setModal('password')}>
                Изменить пароль
              </TextLink>
            </div>
          </section>
        </div>
        <aside className={styles.sidebar}>
          <nav className={styles.nav} aria-label="Разделы профиля">
            <a
              href="#contacts"
              className={cn(styles.navItem, section === 'contacts' && styles.navActive)}
              onClick={() => setSection('contacts')}
            >
              <UserRound aria-hidden /> Контактная информация
            </a>
            <a
              href="#security"
              className={cn(styles.navItem, section === 'security' && styles.navActive)}
              onClick={() => setSection('security')}
            >
              <KeyRound aria-hidden /> Безопасность
            </a>
          </nav>
          <Button
            type="submit"
            size="m"
            fullWidth
            loading={formState.isSubmitting}
            disabled={!formState.isDirty && formState.isSubmitSuccessful}
            iconLeft={formState.isSubmitSuccessful && !formState.isDirty ? <Check aria-hidden /> : undefined}
          >
            {formState.isSubmitSuccessful && !formState.isDirty ? 'Изменения сохранены' : 'Сохранить изменения'}
          </Button>
          <LogoutButton className={styles.logout} />
        </aside>
      </form>
      <ChangeEmailModal open={modal === 'email'} onClose={() => setModal(null)} />
      <ChangePasswordModal open={modal === 'password'} onClose={() => setModal(null)} />
    </DashboardPage>
  );
}
