import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout/Layout';
import { addSubmission } from '../utils/submissions';
import './FormPages.css';

interface MembershipForm {
  company: string;
  rccm: string;
  manager: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  products: string;
  staff: string;
  motivation: string;
  consent: boolean;
}

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MembershipPage: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MembershipForm>();

  const benefits = t('membership.benefits', { returnObjects: true }) as string[];
  const staffOptions = t('membership.form.staff_options', { returnObjects: true }) as string[];

  const onSubmit = (data: MembershipForm) => {
    addSubmission('membership', data as unknown as Record<string, unknown>);
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
            <span className="section-label">{t('membership.label')}</span>
            <h1 className="section-title">
              {t('membership.title')} <span>{t('membership.titleHighlight')}</span>
            </h1>
            <div className="divider" />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              {t('membership.subtitle')}
            </p>
          </motion.div>

          <div className="form-page__grid">
            <motion.aside
              className="form-page__sidebar"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="form-page__benefits glass-card">
                <h3>{t('membership.benefits_title')}</h3>
                <div className="form-page__benefits-list">
                  {benefits.map((b, i) => (
                    <div className="form-page__benefit" key={i}>
                      <span className="form-page__benefit-check"><CheckIcon /></span>
                      <span>{b}</span>
                    </div>
                  ))}
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
                  <h3>{t('membership.form.success')}</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-page__row">
                    <div className="form-page__field">
                      <label className="form-page__label form-page__label-required">
                        {t('membership.form.company')}
                      </label>
                      <input
                        className={`form-page__input ${errors.company ? 'error' : ''}`}
                        placeholder={t('membership.form.company_placeholder')}
                        {...register('company', { required: true, minLength: 2 })}
                      />
                    </div>
                    <div className="form-page__field">
                      <label className="form-page__label">{t('membership.form.rccm')}</label>
                      <input
                        className="form-page__input"
                        placeholder={t('membership.form.rccm_placeholder')}
                        {...register('rccm')}
                      />
                    </div>
                  </div>

                  <div className="form-page__row">
                    <div className="form-page__field">
                      <label className="form-page__label form-page__label-required">
                        {t('membership.form.manager')}
                      </label>
                      <input
                        className={`form-page__input ${errors.manager ? 'error' : ''}`}
                        placeholder={t('membership.form.manager_placeholder')}
                        {...register('manager', { required: true })}
                      />
                    </div>
                    <div className="form-page__field">
                      <label className="form-page__label">{t('membership.form.role')}</label>
                      <input
                        className="form-page__input"
                        placeholder={t('membership.form.role_placeholder')}
                        {...register('role')}
                      />
                    </div>
                  </div>

                  <div className="form-page__row">
                    <div className="form-page__field">
                      <label className="form-page__label form-page__label-required">
                        {t('membership.form.email')}
                      </label>
                      <input
                        type="email"
                        className={`form-page__input ${errors.email ? 'error' : ''}`}
                        placeholder={t('membership.form.email_placeholder')}
                        {...register('email', {
                          required: true,
                          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        })}
                      />
                    </div>
                    <div className="form-page__field">
                      <label className="form-page__label form-page__label-required">
                        {t('membership.form.phone')}
                      </label>
                      <input
                        className={`form-page__input ${errors.phone ? 'error' : ''}`}
                        placeholder={t('membership.form.phone_placeholder')}
                        {...register('phone', { required: true, minLength: 6 })}
                      />
                    </div>
                  </div>

                  <div className="form-page__field">
                    <label className="form-page__label">{t('membership.form.address')}</label>
                    <input
                      className="form-page__input"
                      placeholder={t('membership.form.address_placeholder')}
                      {...register('address')}
                    />
                  </div>

                  <div className="form-page__row">
                    <div className="form-page__field">
                      <label className="form-page__label">{t('membership.form.products')}</label>
                      <input
                        className="form-page__input"
                        placeholder={t('membership.form.products_placeholder')}
                        {...register('products')}
                      />
                    </div>
                    <div className="form-page__field">
                      <label className="form-page__label">{t('membership.form.staff')}</label>
                      <select
                        className="form-page__select"
                        defaultValue=""
                        {...register('staff')}
                      >
                        <option value="" disabled>{t('membership.form.staff_placeholder')}</option>
                        {staffOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-page__field">
                    <label className="form-page__label">{t('membership.form.motivation')}</label>
                    <textarea
                      className="form-page__textarea"
                      placeholder={t('membership.form.motivation_placeholder')}
                      rows={5}
                      {...register('motivation')}
                    />
                  </div>

                  <label className="form-page__consent">
                    <input
                      type="checkbox"
                      {...register('consent', { required: true })}
                    />
                    <span>{t('membership.form.consent')}</span>
                  </label>
                  {errors.consent && (
                    <span className="form-page__error">⚠ {t('membership.form.consent')}</span>
                  )}

                  <button type="submit" className="btn btn-primary form-page__submit">
                    {t('membership.form.submit')}
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

export default MembershipPage;
