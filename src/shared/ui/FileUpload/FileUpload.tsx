'use client';

import { useId, useRef, useState, type DragEvent, type ReactNode } from 'react';
import { FileDigit, Trash, Upload } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import fieldStyles from '../TextField/TextField.module.css';
import styles from './FileUpload.module.css';

export type UploadedFile = { id: string; name: string; size: number };

type FileUploadProps = {
  label?: ReactNode;
  required?: boolean;
  value: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  title?: string;
  hint?: string;
  accept?: string;
  maxFiles?: number;
  maxSizeMb?: number;
  error?: string;
};

const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)}MB`;

/** Dashed drop zone + file tiles (UI KIT → Input / file-pdf). Files are kept as metadata in mock mode. */
export function FileUpload({
  label,
  required,
  value,
  onChange,
  title = 'Загрузите патент, заявку или подтверждающие документы',
  hint = 'В формате PDF, до 20мб, до 5 файлов',
  accept = 'application/pdf',
  maxFiles = 5,
  maxSizeMb = 20,
  error,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string>();
  const full = value.length >= maxFiles;

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const tooBig = incoming.find((file) => file.size > maxSizeMb * 1024 * 1024);
    if (tooBig) {
      setLocalError(`Файл «${tooBig.name}» больше ${maxSizeMb}MB`);
      return;
    }
    setLocalError(undefined);
    const mapped = incoming.map((file) => ({
      id: `${file.name}-${file.size}-${Math.random()}`,
      name: file.name,
      size: file.size,
    }));
    onChange([...value, ...mapped].slice(0, maxFiles));
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    if (!full) addFiles(event.dataTransfer.files);
  };

  const message = error ?? localError;

  return (
    <div className={fieldStyles.field}>
      {label && (
        <span className={fieldStyles.label} id={`${id}-label`}>
          {label}
          {required && <span className={fieldStyles.required}> *</span>}
        </span>
      )}
      <button
        type="button"
        className={cn(styles.zone, dragging && styles.dragging, full && styles.full, message && styles.invalid)}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        disabled={full}
        aria-labelledby={label ? `${id}-label` : undefined}
      >
        <span className={styles.iconBox}>
          <Upload aria-hidden />
        </span>
        <span className={styles.title}>{title}</span>
        <span className={styles.hint}>{hint}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        hidden
        onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = '';
        }}
      />
      {value.length > 0 && (
        <ul className={styles.files}>
          {value.map((file) => (
            <li key={file.id} className={styles.file}>
              <FileDigit aria-hidden className={styles.fileIcon} />
              <span className={styles.fileName} title={file.name}>
                {file.name}
              </span>
              <span className={styles.fileSize}>{formatSize(file.size)}</span>
              <button
                type="button"
                className={styles.remove}
                onClick={() => onChange(value.filter((item) => item.id !== file.id))}
                aria-label={`Удалить ${file.name}`}
              >
                <Trash aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
      {message && (
        <p className={fieldStyles.error} role="alert">
          {message}
        </p>
      )}
    </div>
  );
}
