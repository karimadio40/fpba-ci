import React from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import './ProductsPage.css';

const PRODUCT_KEYS = ['electric', 'telecom', 'lighting', 'fence', 'custom', 'accessories'] as const;
type ProductKey = (typeof PRODUCT_KEYS)[number];

const PoleIcon: React.FC<{ variant: ProductKey }> = ({ variant }) => {
  switch (variant) {
    case 'electric':
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="32" y1="6" x2="32" y2="58" stroke="#F26A1F" />
          <line x1="14" y1="14" x2="50" y2="14" stroke="#F26A1F" />
          <line x1="18" y1="24" x2="46" y2="24" stroke="#F26A1F" opacity="0.85" />
          <circle cx="15" cy="14" r="2" fill="#F26A1F" />
          <circle cx="32" cy="14" r="2" fill="#F26A1F" />
          <circle cx="49" cy="14" r="2" fill="#F26A1F" />
        </svg>
      );
    case 'telecom':
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="#F26A1F" strokeWidth="2.5" strokeLinecap="round">
          <line x1="32" y1="6" x2="32" y2="58" />
          <path d="M22 14 L32 8 L42 14" />
          <path d="M18 22 L32 12 L46 22" opacity="0.7" />
          <circle cx="32" cy="20" r="2.5" fill="#F26A1F" />
        </svg>
      );
    case 'lighting':
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="#F26A1F" strokeWidth="2.5" strokeLinecap="round">
          <line x1="22" y1="6" x2="22" y2="58" />
          <path d="M22 10 Q34 10 38 18" />
          <rect x="34" y="16" width="10" height="6" rx="1.5" fill="#F26A1F" />
          <path d="M39 22 L34 30 L44 30 Z" fill="#F26A1F" opacity="0.4" />
        </svg>
      );
    case 'fence':
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="#F26A1F" strokeWidth="2.5" strokeLinecap="round">
          <line x1="10" y1="20" x2="10" y2="58" />
          <line x1="22" y1="20" x2="22" y2="58" />
          <line x1="34" y1="20" x2="34" y2="58" />
          <line x1="46" y1="20" x2="46" y2="58" />
          <line x1="6" y1="30" x2="50" y2="30" opacity="0.7" />
          <line x1="6" y1="44" x2="50" y2="44" opacity="0.7" />
        </svg>
      );
    case 'custom':
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="#F26A1F" strokeWidth="2.5" strokeLinecap="round">
          <line x1="32" y1="6" x2="32" y2="58" />
          <circle cx="32" cy="22" r="10" />
          <path d="M28 22 L31 25 L36 18" />
        </svg>
      );
    case 'accessories':
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="#F26A1F" strokeWidth="2.5" strokeLinecap="round">
          <rect x="14" y="20" width="36" height="8" rx="2" />
          <rect x="20" y="36" width="24" height="20" rx="2" />
          <line x1="32" y1="20" x2="32" y2="6" />
        </svg>
      );
  }
};

const EASE: Easing = 'easeOut';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: EASE },
  }),
};

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="products-page">
        <div className="products-page__orb" />

        <div className="container">
          <motion.div
            className="products-page__header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">{t('products.label')}</span>
            <h1 className="section-title">
              {t('products.title')} <span>{t('products.titleHighlight')}</span>
            </h1>
            <div className="divider" />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              {t('products.subtitle')}
            </p>
          </motion.div>

          <div className="products-page__grid">
            {PRODUCT_KEYS.map((key, i) => {
              const specs = t(`products.items.${key}.specs`, { returnObjects: true }) as string[];
              return (
                <motion.article
                  key={key}
                  className="product-card glass-card"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                >
                  <div className="product-card__visual">
                    <PoleIcon variant={key} />
                    <span className="product-card__number">0{i + 1}</span>
                  </div>
                  <h3 className="product-card__title">{t(`products.items.${key}.title`)}</h3>
                  <p className="product-card__desc">{t(`products.items.${key}.desc`)}</p>

                  <div className="product-card__specs">
                    {specs.map((s, idx) => (
                      <div key={idx} className="product-card__spec">
                        <span className="product-card__spec-dot" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn btn-outline product-card__cta"
                    onClick={() => navigate('/contact')}
                  >
                    {t('products.request_quote')}
                  </button>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            className="products-page__cta-band"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h3>{t('membership.title')} <em>{t('membership.titleHighlight')}</em></h3>
            <p>{t('membership.subtitle')}</p>
            <button className="btn" onClick={() => navigate('/membership')}>
              {t('nav.cta')}
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
