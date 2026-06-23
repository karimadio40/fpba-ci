import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Testimonials.css';

const StarRating: React.FC<{ count: number }> = ({ count }) => (
  <div className="stars">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  const items = t('testimonials.items', { returnObjects: true }) as Array<{
    name: string;
    role: string;
    text: string;
    rating: number;
  }>;

  const prev = () => setActive((a) => (a === 0 ? items.length - 1 : a - 1));
  const next = () => setActive((a) => (a === items.length - 1 ? 0 : a + 1));

  return (
    <section className="testimonials section bg-surface" id="testimonials">
      <div className="testimonials__orb" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
        >
          <span className="section-label">{t('testimonials.label')}</span>
          <h2 className="section-title">
            {t('testimonials.title')}{' '}
            <span>{t('testimonials.titleHighlight')}</span>
          </h2>
          <div className="divider" />
          <p className="section-subtitle">{t('testimonials.subtitle')}</p>
        </motion.div>

        {/* Carousel */}
        <div className="testimonials__carousel">
          {/* Main card */}
          <div className="testimonials__main">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="testimonials__card glass-card"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* Quote icon */}
                <div className="testimonials__quote-icon">
                  <svg viewBox="0 0 32 32" fill="currentColor">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                  </svg>
                </div>

                <StarRating count={items[active].rating} />

                <p className="testimonials__text">"{items[active].text}"</p>

                <div className="testimonials__author">
                  <div className="testimonials__avatar">
                    {items[active].name.charAt(0)}
                  </div>
                  <div>
                    <p className="testimonials__name">{items[active].name}</p>
                    <p className="testimonials__role">{items[active].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="testimonials__nav">
            <button
              className="testimonials__nav-btn"
              onClick={prev}
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>

            {/* Dots */}
            <div className="testimonials__dots">
              {items.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot ${i === active ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="testimonials__nav-btn"
              onClick={next}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Thumbnail row */}
          <div className="testimonials__thumbs">
            {items.map((item, i) => (
              <button
                key={i}
                className={`testimonials__thumb ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <div className="testimonials__thumb-avatar">{item.name.charAt(0)}</div>
                <div className="testimonials__thumb-info">
                  <p className="testimonials__thumb-name">{item.name}</p>
                  <p className="testimonials__thumb-role">{item.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
