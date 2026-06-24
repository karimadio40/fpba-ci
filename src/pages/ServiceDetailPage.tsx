import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ContactSection from '../components/Contact/ContactSection';
import representationImg from '../assets/image1.webp';
import accompanimentImg from '../assets/img3.jpg';
import trainingImg from '../assets/img4.jpg';
import standardizationImg from '../assets/image2.avif';
import informationImg from '../assets/img6.jpg';
import networkingImg from '../assets/img5.webp';
import './ServiceDetailPage.css';

const serviceImages: Record<string, string> = {
  representation: representationImg,
  accompaniment: accompanimentImg,
  training: trainingImg,
  standardization: standardizationImg,
  information: informationImg,
  networking: networkingImg,
};

const serviceOrder = [
  'representation',
  'accompaniment',
  'training',
  'standardization',
  'information',
  'networking',
];

const ServiceDetailPage: React.FC = () => {
  const { key } = useParams<{ key: string }>();
  const { t } = useTranslation();

  if (!key || !serviceOrder.includes(key)) {
    return <Navigate to="/" replace />;
  }

  const image = serviceImages[key];
  const title = t(`services.items.${key}.title`);
  const fullDesc = t(`services.items.${key}.fullDesc`);
  const why = t(`services.items.${key}.why`);
  const features = t(`services.items.${key}.features`, { returnObjects: true }) as string[];

  const currentIndex = serviceOrder.indexOf(key);
  const prevKey = currentIndex > 0 ? serviceOrder[currentIndex - 1] : null;
  const nextKey = currentIndex < serviceOrder.length - 1 ? serviceOrder[currentIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main className="sdp">
        {/* Hero banner */}
        <div className="sdp__hero">
          <div className="sdp__hero-img" style={{ backgroundImage: `url(${image})` }} />
          <div className="sdp__hero-overlay" />
          <div className="container sdp__hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/#services" className="sdp__back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Nos services
              </Link>
              <span className="sdp__label">Service</span>
              <h1 className="sdp__title">{title}</h1>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="container sdp__body">
          <div className="sdp__content">
            {/* Main column */}
            <motion.div
              className="sdp__main"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="sdp__section-title">À propos de ce service</h2>
              <p className="sdp__desc">{fullDesc}</p>

              <h2 className="sdp__section-title">Ce que nous proposons</h2>
              <ul className="sdp__features">
                {Array.isArray(features) && features.map((feature, i) => (
                  <li key={i} className="sdp__feature-item">
                    <span className="sdp__feature-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="sdp__why-box">
                <h3 className="sdp__why-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Pourquoi ce service est essentiel
                </h3>
                <p>{why}</p>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              className="sdp__sidebar"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <div className="sdp__cta-box">
                <h3>Intéressé par ce service ?</h3>
                <p>Contactez-nous dès aujourd'hui pour un diagnostic gratuit et une offre personnalisée.</p>
                <Link to="/#contact" className="btn btn-primary sdp__cta-btn">
                  Demander un devis
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="sdp__other-services">
                <h4>Autres services</h4>
                <ul>
                  {serviceOrder.filter(k => k !== key).map(k => (
                    <li key={k}>
                      <Link to={`/services/${k}`} className="sdp__other-link">
                        <span>{t(`services.items.${k}.title`)}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </div>

          {/* Navigation prev/next */}
          <div className="sdp__nav">
            {prevKey ? (
              <Link to={`/services/${prevKey}`} className="sdp__nav-btn sdp__nav-btn--prev">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <div>
                  <span>Précédent</span>
                  <strong>{t(`services.items.${prevKey}.title`)}</strong>
                </div>
              </Link>
            ) : <div />}
            {nextKey ? (
              <Link to={`/services/${nextKey}`} className="sdp__nav-btn sdp__nav-btn--next">
                <div>
                  <span>Suivant</span>
                  <strong>{t(`services.items.${nextKey}.title`)}</strong>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : <div />}
          </div>
        </div>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetailPage;
