import { Star } from 'lucide-react';
import type { Startup } from '@/entities/startup';
import { cn } from '@/shared/lib/cn';
import { EmptyState } from '@/shared/ui';
import styles from './StartupSections.module.css';

export function StartupReviews({ startup }: { startup: Startup }) {
  if (!startup.reviews.length) return <EmptyState icon="search" title="Отзывов пока нет" />;
  return (
    <section aria-labelledby="reviews-title">
      <h2 id="reviews-title" className="visually-hidden">
        Отзывы о {startup.name}
      </h2>
      <ul className={`${styles.reviews} stagger`}>
        {startup.reviews.map((review) => (
          <li key={review.author} className={styles.review}>
            <figure>
              <div className={styles.stars} role="img" aria-label={`Оценка ${review.rating} из 5`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    aria-hidden
                    className={cn(styles.star, index < review.rating && styles.starFilled)}
                  />
                ))}
              </div>
              <blockquote className={styles.reviewText}>{review.text}</blockquote>
              <figcaption>
                <p className={styles.reviewAuthor}>{review.author}</p>
                <p className={styles.reviewPosition}>{review.position}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
