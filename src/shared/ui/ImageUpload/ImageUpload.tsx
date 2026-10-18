'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { Pencil, PencilLine, Trash, Upload } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { useClickOutside } from '@/shared/lib/hooks/useClickOutside';
import fieldStyles from '../TextField/TextField.module.css';
import styles from './ImageUpload.module.css';

type ImageUploadProps = {
  label: ReactNode;
  hint?: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  variant?: 'cover' | 'logo';
  maxSizeMb?: number;
};

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

/** Cover / logo picker with preview and an edit menu ("Изменить" / "Удалить"). */
export function ImageUpload({
  label,
  hint = 'В формате PNG, JPEG, JPG до 20мб',
  value,
  onChange,
  variant = 'cover',
  maxSizeMb = 20,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [error, setError] = useState<string>();
  const close = useCallback(() => setMenu(false), []);
  useClickOutside(menuRef, close, menu);

  const pick = () => {
    setMenu(false);
    inputRef.current?.click();
  };

  return (
    <div className={fieldStyles.field}>
      <div>
        <span className={styles.label}>{label}</span>
        <span className={styles.hint}>{hint}</span>
      </div>
      <div className={cn(styles.frame, styles[variant])}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- user-picked data URL preview
          <img src={value} alt="" className={styles.preview} />
        ) : (
          <button type="button" className={styles.empty} onClick={pick}>
            <Upload aria-hidden />
            Загрузить
          </button>
        )}
        {value && (
          <div ref={menuRef} className={styles.menuWrap}>
            <button
              type="button"
              className={styles.editButton}
              aria-label="Изменить изображение"
              aria-expanded={menu}
              onClick={() => setMenu((v) => !v)}
            >
              <Pencil aria-hidden />
            </button>
            {menu && (
              <div className={styles.menu} role="menu">
                <button type="button" role="menuitem" onClick={pick}>
                  <PencilLine aria-hidden /> {variant === 'cover' ? 'Изменить обложку' : 'Изменить логотип'}
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className={styles.danger}
                  onClick={() => {
                    onChange(undefined);
                    setMenu(false);
                  }}
                >
                  <Trash aria-hidden /> {variant === 'cover' ? 'Удалить обложку' : 'Удалить логотип'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        hidden
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (!file) return;
          if (file.size > maxSizeMb * 1024 * 1024) return setError(`Файл больше ${maxSizeMb}MB`);
          setError(undefined);
          onChange(await readAsDataUrl(file));
        }}
      />
      {error && (
        <p className={fieldStyles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
