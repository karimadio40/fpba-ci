import React from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import representationImg from '../../assets/service_representation.png';
import accompanimentImg from '../../assets/service_accompaniment.png';
import trainingImg from '../../assets/service_training.png';
import standardizationImg from '../../assets/service_standardization.png';
import informationImg from '../../assets/service_information.png';
import networkingImg from '../../assets/service_networking.png';
import './Services.css';

const EASE: Easing = 'easeOut';

const serviceData = [
  {
    key: 'representation',
    image: representationImg,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V11l7-5 7 5v10" />
        <path d="M9 21V13h6v8" />
      </svg>
    ),
  },
  {
    key: 'accompaniment',
    image: accompanimentImg,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="3" />
        <circle cx="17" cy="11" r="2.5" />
        <path d="M3 21c0-3.5 3-6 6-6s6 2.5 6 6" />
        <path d="M14 21c0-2.5 1.7-4.5 4-4.5s4 2 4 4.5" />
      </svg>
    ),
  },
  {
    key: 'training',
    image: trainingImg,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    key: 'standardization',
    image: standardizationImg,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="13" y2="16" />
      </svg>
    ),
  },
  {
    key: 'information',
    image: informationImg,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
  {
    key: 'networking',
    image: networkingImg,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="5" cy="19" r="2.5" />
        <circle cx="19" cy="19" r="2.5" />
        <line x1="12" y1="7.5" x2="5" y2="16.5" />
        <line x1="12" y1="7.5" x2="19" y2="16.5" />
        <line x1="7.5" y1="19" x2="16.5" y2="19" />
      </svg>
    ),
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
};

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="services section bg-dark" id="services">
      <div className="services__line services__line--1" />
      <div className="services__line services__line--2" />

      <div className="container">
        <motion.div
          className="services__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          custom={0}
        >
          <span className="section-label">{t('services.label')}</span>
          <h2 className="section-title">
            {t('services.title')}{' '}
            <span>{t('services.titleHighlight')}</span>
          </h2>
          <div className="divider" />
          <p className="section-subtitle">{t('services.subtitle')}</p>
        </motion.div>

        <div className="services__grid">
          {serviceData.map(({ key, image, icon }, i) => (
            <motion.div
              key={key}
              className="services__card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
              custom={0.1 + i * 0.07}
              whileHover={{ y: -8 }}
            >
              <div className="services__card-img-wrap">
                <img
                  src={image}
                  alt={t(`services.items.${key}.title`)}
                  className="services__card-img"
                  loading="lazy"
                />
                <div className="services__card-img-overlay" />
                <span className="services__card-number">0{i + 1}</span>
              </div>

              <div className="services__card-body">
                <div className="services__card-icon">
                  {icon}
                </div>
                <h3 className="services__card-title">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="services__card-desc">
                  {t(`services.items.${key}.desc`)}
                </p>

                <Link to={`/services/${key}`} className="services__card-link">
                  <span>{t('services.learnMore')}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
