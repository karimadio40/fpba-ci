import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';
import HeroSection from './components/Hero/HeroSection';
import AboutSection from './components/About/AboutSection';
import ServicesSection from './components/Services/ServicesSection';
import TestimonialsSection from './components/Testimonials/TestimonialsSection';
import ContactSection from './components/Contact/ContactSection';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MembershipPage from './pages/MembershipPage';
import AccompanimentPage from './pages/AccompanimentPage';
import AdminPage from './pages/AdminPage';
import { applyOverridesToI18n } from './admin/contentStore';
import './App.css';

const HomePage: React.FC = () => (
  <Layout>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <TestimonialsSection />
    <ContactSection />
  </Layout>
);

const App: React.FC = () => {
  useEffect(() => {
    applyOverridesToI18n();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:key" element={<ServiceDetailPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/accompaniment" element={<AccompanimentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
