import { z } from 'zod';
import type { Project } from '@/entities/project';
import { emailSchema, phoneSchema, requiredString } from '@/shared/lib/validation';

const file = z.object({ id: z.string(), name: z.string(), size: z.number() });

export const projectFormSchema = z.object({
  cover: z.string().optional(),
  logo: z.string().optional(),
  name: requiredString('Укажите название'),
  description: requiredString('Добавьте описание'),
  stage: z.string().min(1, 'Выберите стадию'),
  directions: z.array(z.string()).min(1, 'Выберите хотя бы одно направление'),
  website: z.union([z.literal(''), z.string().url('Укажите ссылку целиком, например https://site.ru')]),
  amount: z.object({ from: z.string(), to: z.string() }),
  usp: z.string(),
  problem: z.string(),
  solution: z.string(),
  advantages: z
    .string()
    .refine((value) => value.split(',').filter((item) => item.trim()).length <= 5, 'Не больше 5 преимуществ')
    .refine(
      (value) => value.split(',').every((item) => item.trim().length <= 40),
      'Каждое преимущество — до 40 символов',
    ),
  audience: z.string().min(1, 'Выберите аудиторию'),
  ipType: z.string(),
  patentStatus: z.string().min(1, 'Выберите статус'),
  ipOwner: z.string().min(1, 'Выберите правообладателя'),
  patentNumber: z.string(),
  documents: z.array(file),
  documentsPrivacy: z.string(),
  medicalDevice: z.string(),
  riskClass: z.string().optional(),
  ruRequired: z.string(),
  ruStatus: z.string(),
  ruNumber: z.string(),
  ethicsStatus: z.string(),
  ciPhase: z.string().optional(),
  ciProtocol: z.string(),
  country: z.string().min(1, 'Выберите страну'),
  inn: z.string().regex(/^\d{10}(\d{2})?$/, 'ИНН — 10 или 12 цифр'),
  legalName: requiredString('Укажите юридическое лицо'),
  author: requiredString('Укажите ФИО'),
  email: emailSchema,
  phone: phoneSchema,
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

const parseMb = (size: string) => Math.round(parseFloat(size) * 1024 * 1024) || 0;

export function toFormValues(project?: Project): ProjectFormValues {
  return {
    cover: project?.cover,
    logo: project?.logo,
    name: project?.name ?? '',
    description: project?.description ?? '',
    stage: project?.stage ?? '',
    directions: project?.directions ?? [],
    website: project?.website ?? '',
    amount: project
      ? { from: String(project.request.from * 1_000_000), to: String(project.request.to * 1_000_000) }
      : { from: '', to: '' },
    usp: project?.usp ?? '',
    problem: project?.problem ?? '',
    solution: project?.solution ?? '',
    advantages: project?.advantages.join(', ') ?? '',
    audience: project?.audience ?? '',
    ipType: project?.ip.type ?? '',
    patentStatus: project?.ip.patentStatus ? 'filed' : '',
    ipOwner: project ? 'with-university' : '',
    patentNumber: project?.ip.patentNumber ?? '',
    documents:
      project?.documents.map((doc, index) => ({
        id: `${doc.name}-${index}`,
        name: doc.name,
        size: parseMb(doc.size),
      })) ?? [],
    documentsPrivacy: 'on-request',
    medicalDevice: 'yes',
    riskClass: project?.regulatory.riskClass === 'IIa' ? '2a' : undefined,
    ruRequired: project?.regulatory.ruRequired === false ? 'no' : 'yes',
    ruStatus: project?.regulatory.ruStatus ?? '',
    ruNumber: project?.regulatory.ruNumber ?? '',
    ethicsStatus: project?.clinical.ethicsStatus ?? '',
    ciPhase: project?.clinical.phase,
    ciProtocol: project?.clinical.protocol ?? '',
    country: 'ru',
    inn: project?.company.inn ?? '',
    legalName: project?.company.name ?? '',
    author: project?.contacts.author ?? '',
    email: project?.contacts.email ?? '',
    phone: project?.contacts.phone ?? '',
  };
}
