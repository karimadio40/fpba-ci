import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout/Layout';
import AboutSection from '../components/About/AboutSection';
import './FormPages.css';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="form-page" style={{ paddingTop: 110, paddingBottom: 0 }}>
        <div className="form-page__orb" />
        <div className="container">
          <motion.div
            className="form-page__header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">{t('about.label')}</span>
            <h1 className="section-title">
              {t('about.title')} <span>{t('about.titleHighlight')}</span>
            </h1>
            <div className="divider" />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 48 }}>
            <motion.div
              className="glass-card"
              style={{ padding: 32 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 style={{ color: 'var(--color-primary)', marginBottom: 12 }}>{t('about.vision_title')}</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{t('about.vision_text')}</p>
            </motion.div>
            <motion.div
              className="glass-card"
              style={{ padding: 32 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 style={{ color: 'var(--color-primary)', marginBottom: 12 }}>{t('about.mission_title')}</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{t('about.mission_text')}</p>
            </motion.div>
          </div>
        </div>
      </section>
      <AboutSection />
    </Layout>
  );
};

export default AboutPage;
