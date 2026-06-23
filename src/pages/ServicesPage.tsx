import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import './FormPages.css';
import './ProductsPage.css';

const SERVICE_KEYS = [
  'representation',
  'accompaniment',
  'training',
  'standardization',
  'information',
  'networking',
] as const;

const ICONS: Record<(typeof SERVICE_KEYS)[number], React.ReactElement> = {
  representation: (
    <svg viewBox="0 0 64 64" stroke="#F26A1F" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <path d="M14 50 L32 14 L50 50 Z" />
      <line x1="22" y1="44" x2="42" y2="44" />
    </svg>
  ),
  accompaniment: (
    <svg viewBox="0 0 64 64" stroke="#F26A1F" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <circle cx="24" cy="24" r="6" />
      <circle cx="42" cy="28" r="5" />
      <path d="M12 50 c0-7 5-12 12-12 s12 5 12 12" />
      <path d="M38 50 c0-5 3-8 8-8 s8 3 8 8" opacity="0.7" />
    </svg>
  ),
  training: (
    <svg viewBox="0 0 64 64" stroke="#F26A1F" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <path d="M8 24 L32 14 L56 24 L32 34 Z" />
      <path d="M18 30 L18 44 c0 4 6 6 14 6 s14-2 14-6 L46 30" />
    </svg>
  ),
  standardization: (
    <svg viewBox="0 0 64 64" stroke="#F26A1F" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <rect x="14" y="10" width="36" height="44" rx="2" />
      <line x1="22" y1="22" x2="42" y2="22" />
      <line x1="22" y1="32" x2="42" y2="32" />
      <line x1="22" y1="42" x2="34" y2="42" />
    </svg>
  ),
  information: (
    <svg viewBox="0 0 64 64" stroke="#F26A1F" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <circle cx="32" cy="32" r="20" />
      <line x1="32" y1="28" x2="32" y2="44" />
      <circle cx="32" cy="22" r="2" fill="#F26A1F" />
    </svg>
  ),
  networking: (
    <svg viewBox="0 0 64 64" stroke="#F26A1F" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <circle cx="32" cy="14" r="4" />
      <circle cx="14" cy="48" r="4" />
      <circle cx="50" cy="48" r="4" />
      <line x1="32" y1="18" x2="14" y2="44" />
      <line x1="32" y1="18" x2="50" y2="44" />
      <line x1="18" y1="48" x2="46" y2="48" />
    </svg>
  ),
};

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="products-page">
        <div className="products-page__orb" />
        <div className="container">
          <motion.div
            className="products-page__header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">{t('services.label')}</span>
            <h1 className="section-title">
              {t('services.title')} <span>{t('services.titleHighlight')}</span>
            </h1>
            <div className="divider" />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="products-page__grid">
            {SERVICE_KEYS.map((key, i) => (
              <motion.article
                key={key}
                className="product-card glass-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                <div className="product-card__visual">
                  {ICONS[key]}
                  <span className="product-card__number">S{i + 1}</span>
                </div>
                <h3 className="product-card__title">{t(`services.items.${key}.title`)}</h3>
                <p className="product-card__desc">{t(`services.items.${key}.desc`)}</p>

                <Link to={`/services/${key}`} className="services__card-link" style={{ marginTop: 'auto', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                  <span>{t('services.learnMore')}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="products-page__cta-band"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h3>{t('accompaniment.title')} <em>{t('accompaniment.titleHighlight')}</em></h3>
            <p>{t('accompaniment.subtitle')}</p>
            <Link to="/accompaniment" className="btn">
              {t('accompaniment.form.submit')}
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
