import React from 'react';
import { motion } from 'framer-motion'; import type { Easing } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import bgImage from '../../assets/img6.jpg';

const EASE: Easing = 'easeOut';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="hero" id="home">
      {/* Photo background */}
      <div className="hero__photo-bg" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="hero__photo-overlay" />


      {/* Gradient overlays */}
      <div className="hero__overlay hero__overlay--left" />
      <div className="hero__overlay hero__overlay--bottom" />

      {/* Animated background orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

      {/* Content */}
      <div className="container hero__content">
        <motion.div
          className="hero__text"
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          {/* <motion.div className="hero__badge" custom={0.1} variants={fadeUp}>
            <span className="hero__badge-dot" />
            {t('hero.badge')}
          </motion.div> */}

          {/* Title */}
          <motion.h1 className="hero__title" custom={0.25} variants={fadeUp}>
            {t('hero.title')}{' '}
            <span className="hero__title-highlight">{t('hero.titleHighlight')}</span>
            <br />
            {t('hero.titleEnd')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="hero__subtitle" custom={0.4} variants={fadeUp}>
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero__actions" custom={0.55} variants={fadeUp}>
            <button
              className="btn btn-primary hero__btn-primary"
              onClick={() => navigate('/products')}
            >
              {t('hero.cta_primary')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate('/membership')}
            >
              {t('hero.cta_secondary')}
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div className="hero__stats" custom={0.7} variants={fadeUp}>
            {[
              { value: '24+', label: t('hero.stats.members') },
              { value: '10+', label: t('hero.stats.years') },
              { value: '6', label: t('hero.stats.products') },
            ].map((stat, i) => (
              <div className="hero__stat" key={i}>
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
