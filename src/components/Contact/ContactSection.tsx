import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { addSubmission } from '../../utils/submissions';
import './Contact.css';

const EASE: Easing = 'easeOut';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const EMAIL = 'n.goue@sibmci.com';
const PHONE_DISPLAY = '+225 05 04 01 92 99';
const PHONE_HREF = 'tel:+2250504019299';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: EASE },
  }),
};

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const subjectOptions = t('contact.form.subjects', { returnObjects: true }) as string[];

  const onSubmit = (data: FormData) => {
    setLoading(true);
    addSubmission('contact', data as unknown as Record<string, unknown>);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 6000);
    }, 600);
  };

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: t('contact.info.address_label'),
      value: t('contact.info.address'),
      href: 'https://maps.app.goo.gl/2G1HXe7XmMKwvkYG8',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: t('contact.info.email_label'),
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.27 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 5.55 5.55l1.15-1.15a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.24 15z"/>
        </svg>
      ),
      label: t('contact.info.phone_label'),
      value: PHONE_DISPLAY,
      href: PHONE_HREF,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      label: t('contact.info.hours_label'),
      value: t('contact.info.hours'),
      href: null,
    },
  ];

  return (
    <section className="contact section bg-dark" id="contact">
      <div className="contact__orb" />

      <div className="container">
        <motion.div
          className="contact__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          custom={0}
        >
          <span className="section-label">{t('contact.label')}</span>
          <h2 className="section-title">
            {t('contact.title')}{' '}
            <span>{t('contact.titleHighlight')}</span>
          </h2>
          <div className="divider" />
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="contact__grid">
          <motion.div
            className="contact__info"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            custom={0.15}
          >
            <div className="contact__info-cards">
              {contactInfo.map((item, i) => (
                <div key={i} className="contact__info-card glass-card">
                  <div className="contact__info-icon">{item.icon}</div>
                  <div>
                    <p className="contact__info-label">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="contact__info-value contact__info-link">
                        {item.value}
                      </a>
                    ) : (
                      <p className="contact__info-value">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__map">
              <iframe
                src="https://maps.google.com/maps?q=Cocody+Angre+Abidjan&output=embed"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FPBA-CI Location"
              />
            </div>
          </motion.div>

          <motion.div
            className="contact__form-wrapper glass-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            custom={0.25}
          >
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3>{t('contact.form.success')}</h3>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label className="contact__label">{t('contact.form.name')}</label>
                    <input
                      className={`contact__input ${errors.name ? 'error' : ''}`}
                      placeholder={t('contact.form.name_placeholder')}
                      {...register('name', { required: true, minLength: 2 })}
                    />
                    {errors.name && <span className="contact__error">Ce champ est requis</span>}
                  </div>

                  <div className="contact__field">
                    <label className="contact__label">{t('contact.form.company')}</label>
                    <input
                      className="contact__input"
                      placeholder={t('contact.form.company_placeholder')}
                      {...register('company')}
                    />
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label className="contact__label">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      className={`contact__input ${errors.email ? 'error' : ''}`}
                      placeholder={t('contact.form.email_placeholder')}
                      {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    />
                    {errors.email && <span className="contact__error">Email invalide</span>}
                  </div>

                  <div className="contact__field">
                    <label className="contact__label">{t('contact.form.phone')}</label>
                    <input
                      className="contact__input"
                      placeholder={t('contact.form.phone_placeholder')}
                      {...register('phone')}
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label className="contact__label">{t('contact.form.subject')}</label>
                  <select
                    className={`contact__input contact__select ${errors.subject ? 'error' : ''}`}
                    {...register('subject', { required: true })}
                    defaultValue=""
                  >
                    <option value="" disabled>{t('contact.form.subject_placeholder')}</option>
                    {subjectOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.subject && <span className="contact__error">Veuillez sélectionner un objet</span>}
                </div>

                <div className="contact__field">
                  <label className="contact__label">{t('contact.form.message')}</label>
                  <textarea
                    className={`contact__input contact__textarea ${errors.message ? 'error' : ''}`}
                    placeholder={t('contact.form.message_placeholder')}
                    rows={5}
                    {...register('message', { required: true, minLength: 10 })}
                  />
                  {errors.message && <span className="contact__error">Message trop court</span>}
                </div>

                <button type="submit" className="btn btn-primary contact__submit" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="contact__spinner" />
                      {t('contact.form.submitting')}
                    </>
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
