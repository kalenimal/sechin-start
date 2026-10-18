'use client';

import { useState } from 'react';
import { authApi } from '@/entities/session';
import { useAsyncAction } from '@/shared/lib/hooks/useAsyncAction';
import { useCountdown } from '@/shared/lib/hooks/useCountdown';
import { CodeInput, FormError, TextLink } from '@/shared/ui';
import styles from '../form.module.css';

const RESEND_SECONDS = 59;
const CODE_LENGTH = 6;

/** Six-box code; submits automatically once all digits are entered. */
export function VerifyEmailForm({ onVerified }: { onVerified: () => void }) {
  const [code, setCode] = useState('');
  const verify = useAsyncAction(authApi.verifyEmailCode);
  const countdown = useCountdown(RESEND_SECONDS);

  const handleChange = async (value: string) => {
    setCode(value);
    verify.setError(null);
    if (value.length === CODE_LENGTH && (await verify.run(value)).ok) onVerified();
  };

  const resend = async () => {
    await authApi.resendEmailCode();
    setCode('');
    verify.setError(null);
    countdown.restart();
  };

  return (
    <div className={styles.form}>
      <div className={styles.fields}>
        <CodeInput
          value={code}
          onChange={handleChange}
          length={CODE_LENGTH}
          invalid={!!verify.error}
          disabled={verify.pending}
          autoFocus
        />
        <FormError message={verify.error} />
      </div>
      <TextLink align="center" tone={countdown.done ? 'primary' : 'muted'} disabled={!countdown.done} onClick={resend}>
        {countdown.done ? 'Отправить код еще раз' : `Отправить код еще раз (${countdown.label})`}
      </TextLink>
    </div>
  );
}
