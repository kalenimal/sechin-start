import { DashboardPage } from '@/widgets/dashboard-page';
import styles from './HelpPage.module.css';

const faq = [
  {
    q: 'Сколько длится модерация проекта?',
    a: 'Первичная проверка анкеты занимает до 3 рабочих дней. После неё проект передаётся экспертам.',
  },
  {
    q: 'Кто видит документы проекта?',
    a: 'Документы доступны инвесторам и корпорациям только после того, как вы подтвердите их запрос на доступ.',
  },
  {
    q: 'Как пройти экспертизу повторно?',
    a: 'Внесите изменения по комментариям эксперта и отправьте проект на модерацию — он попадёт на повторную проверку.',
  },
  { q: 'Как связаться с поддержкой?', a: 'Напишите нам на support@sechenov.ru — мы ответим в течение рабочего дня.' },
];

export function HelpPage() {
  return (
    <DashboardPage width="centered" title="Помощь">
      <div className={`${styles.list} stagger`}>
        {faq.map((item) => (
          <details key={item.q} className={styles.item}>
            <summary className={styles.question}>{item.q}</summary>
            <p className={styles.answer}>{item.a}</p>
          </details>
        ))}
      </div>
    </DashboardPage>
  );
}
