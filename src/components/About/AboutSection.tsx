import React from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';
import aboutImg from '../../assets/img11.jpg';

const EASE: Easing = 'easeOut';

/* Reusable scroll reveal */
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: EASE },
  }),
};

const values = [
  {
    key: 'integrity',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    key: 'excellence',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    key: 'proximity',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    key: 'innovation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
];

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="about section bg-surface" id="about">
      {/* Decorative orb */}
      <div className="about__orb" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="about__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          custom={0}
        >
          <span className="section-label">{t('about.label')}</span>
          <h2 className="section-title">
            {t('about.title')}{' '}
            <span>{t('about.titleHighlight')}</span>
          </h2>
          <div className="divider" />
        </motion.div>

        <div className="about__grid">
          {/* Left — Image placeholder + contact card */}
          <motion.div
            className="about__visual"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            custom={0.15}
          >
            {/* Image placeholder */}
            <div className="about__image-wrapper">
              <img src={aboutImg} alt="About us" className="about__image" />
              {/* Badge */}
              <div className="about__badge">
                <span className="about__badge-num">10+</span>
                <span className="about__badge-text">Années d'engagement</span>
              </div>
            </div>

            {/* Contact card */}
            <div className="about__contact-card glass-card">
              <div className="about__contact-avatar">G</div>
              <div>
                <p className="about__contact-name">{t('about.contact_name')}</p>
                <p className="about__contact-role">{t('about.contact_role')}</p>
                <a href="mailto:n.goue@sibmci.com" className="about__contact-email">
                  n.goue@sibmci.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Text + values */}
          <div className="about__content">
            <motion.p
              className="about__text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
              custom={0.2}
            >
              {t('about.p1')}
            </motion.p>
            <motion.p
              className="about__text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
              custom={0.3}
            >
              {t('about.p2')}
            </motion.p>

            {/* Values grid */}
            <motion.h3
              className="about__values-title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
              custom={0.35}
            >
              {t('about.values.title')}
            </motion.h3>
            <div className="about__values">
              {values.map(({ key, icon }, i) => (
                <motion.div
                  key={key}
                  className="about__value-card glass-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeInUp}
                  custom={0.4 + i * 0.08}
                >
                  <div className="about__value-icon">{icon}</div>
                  <div>
                    <h4 className="about__value-name">
                      {t(`about.values.${key}.title`)}
                    </h4>
                    <p className="about__value-desc">
                      {t(`about.values.${key}.desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
