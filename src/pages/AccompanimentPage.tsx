import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout/Layout';
import { addSubmission } from '../utils/submissions';
import './FormPages.css';

interface AccompanimentForm {
  type: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  need: string;
  deadline: string;
}

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AccompanimentPage: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccompanimentForm>();

  const types = t('accompaniment.form.types', { returnObjects: true }) as string[];

  const onSubmit = (data: AccompanimentForm) => {
    addSubmission('accompaniment', data as unknown as Record<string, unknown>);
    setSubmitted(true);
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="form-page__orb" />

        <div className="container">
          <motion.div
            className="form-page__header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">{t('accompaniment.label')}</span>
            <h1 className="section-title">
              {t('accompaniment.title')} <span>{t('accompaniment.titleHighlight')}</span>
            </h1>
            <div className="divider" />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              {t('accompaniment.subtitle')}
            </p>
          </motion.div>

          <div className="form-page__grid">
            <motion.aside
              className="form-page__sidebar"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="form-page__intro glass-card">
                <h4>{t('services.items.accompaniment.title')}</h4>
                <p>{t('services.items.accompaniment.fullDesc')}</p>
              </div>
              <div className="form-page__benefits glass-card">
                <h3>{t('services.items.accompaniment.title')}</h3>
                <div className="form-page__benefits-list">
                  {(t('services.items.accompaniment.features', { returnObjects: true }) as string[]).map(
                    (f, i) => (
                      <div className="form-page__benefit" key={i}>
                        <span className="form-page__benefit-check"><CheckIcon /></span>
                        <span>{f}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </motion.aside>

            <motion.div
              className="form-page__form glass-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              {submitted ? (
                <div className="form-page__success">
                  <div className="form-page__success-icon"><CheckIcon /></div>
                  <h3>{t('accompaniment.form.success')}</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-page__field">
                    <label className="form-page__label form-page__label-required">
                      {t('accompaniment.form.type')}
                    </label>
                    <select
                      className={`form-page__select ${errors.type ? 'error' : ''}`}
                      defaultValue=""
                      {...register('type', { required: true })}
                    >
                      <option value="" disabled>{t('accompaniment.form.type_placeholder')}</option>
                      {types.map((tp) => (
                        <option key={tp} value={tp}>{tp}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-page__row">
                    <div className="form-page__field">
                      <label className="form-page__label form-page__label-required">
                        {t('accompaniment.form.company')}
                      </label>
                      <input
                        className={`form-page__input ${errors.company ? 'error' : ''}`}
                        placeholder={t('accompaniment.form.company_placeholder')}
                        {...register('company', { required: true })}
                      />
                    </div>
                    <div className="form-page__field">
                      <label className="form-page__label form-page__label-required">
                        {t('accompaniment.form.contact')}
                      </label>
                      <input
                        className={`form-page__input ${errors.contact ? 'error' : ''}`}
                        placeholder={t('accompaniment.form.contact_placeholder')}
                        {...register('contact', { required: true })}
                      />
                    </div>
                  </div>

                  <div className="form-page__row">
                    <div className="form-page__field">
                      <label className="form-page__label form-page__label-required">
                        {t('accompaniment.form.email')}
                      </label>
                      <input
                        type="email"
                        className={`form-page__input ${errors.email ? 'error' : ''}`}
                        placeholder={t('accompaniment.form.email_placeholder')}
                        {...register('email', {
                          required: true,
                          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        })}
                      />
                    </div>
                    <div className="form-page__field">
                      <label className="form-page__label">{t('accompaniment.form.phone')}</label>
                      <input
                        className="form-page__input"
                        placeholder={t('accompaniment.form.phone_placeholder')}
                        {...register('phone')}
                      />
                    </div>
                  </div>

                  <div className="form-page__field">
                    <label className="form-page__label form-page__label-required">
                      {t('accompaniment.form.need')}
                    </label>
                    <textarea
                      className={`form-page__textarea ${errors.need ? 'error' : ''}`}
                      placeholder={t('accompaniment.form.need_placeholder')}
                      rows={5}
                      {...register('need', { required: true, minLength: 10 })}
                    />
                  </div>

                  <div className="form-page__field">
                    <label className="form-page__label">{t('accompaniment.form.deadline')}</label>
                    <input
                      className="form-page__input"
                      placeholder={t('accompaniment.form.deadline_placeholder')}
                      {...register('deadline')}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary form-page__submit">
                    {t('accompaniment.form.submit')}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AccompanimentPage;
