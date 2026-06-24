import React from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import './ProductsPage.css';

import imgElectric from '../assets/Poteaux électriques.jpg';
import imgTelecom from '../assets/Poteaux télécoms.jpg';
import imgLighting from '../assets/Poteaux éclairage public.webp';
import imgFence from '../assets/Poteaux clôture.jpg';
import imgCustom from '../assets/Poteaux sur mesure.webp';

const PRODUCT_KEYS = ['electric', 'telecom', 'lighting', 'fence', 'custom', 'accessories'] as const;
type ProductKey = (typeof PRODUCT_KEYS)[number];

const PRODUCT_IMAGES: Partial<Record<ProductKey, string>> = {
  electric: imgElectric,
  telecom: imgTelecom,
  lighting: imgLighting,
  fence: imgFence,
  custom: imgCustom,
};

const ProductVisual: React.FC<{ variant: ProductKey }> = ({ variant }) => {
  const imageSrc = PRODUCT_IMAGES[variant];
  if (imageSrc) {
    return <img src={imageSrc} alt={`Produit ${variant}`} className="product-card__img" />;
  }

  // Fallback for accessories since no image was provided
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#F26A1F" strokeWidth="2.5" strokeLinecap="round">
      <rect x="14" y="20" width="36" height="8" rx="2" />
      <rect x="20" y="36" width="24" height="20" rx="2" />
      <line x1="32" y1="20" x2="32" y2="6" />
    </svg>
  );
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
                    <ProductVisual variant={key} />
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
