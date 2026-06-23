import React from 'react';
import Layout from '../components/Layout/Layout';
import ContactSection from '../components/Contact/ContactSection';

const ContactPage: React.FC = () => (
  <Layout>
    <div style={{ paddingTop: 80 }}>
      <ContactSection />
    </div>
  </Layout>
);

export default ContactPage;
