import { Routes, Route, useLocation } from 'react-router';
import { LanguageProvider } from '@/hooks/LanguageProvider';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import SocialSection from '@/sections/SocialSection';
import DisclaimerSection from '@/sections/DisclaimerSection';
import HomePage from '@/pages/HomePage';
import CasesPage from '@/pages/CasesPage';
import ArticlesPage from '@/pages/ArticlesPage';
import ArticleDetailPage from '@/pages/ArticleDetailPage';
import ContactPage from '@/pages/ContactPage';
import FirmwarePage from '@/pages/FirmwarePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import DashboardPage from '@/pages/DashboardPage';

function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar />
      <main className={pathname === '/' ? '' : 'pt-16'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/firmware" element={<FirmwarePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
      <SocialSection />
      <DisclaimerSection />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Layout />
    </LanguageProvider>
  );
}
