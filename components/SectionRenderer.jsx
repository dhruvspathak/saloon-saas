import Hero from '@/components/Hero';
import Services from '@/components/Services';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import OffersSection from '@/components/OffersSection';
import ReviewsSection from '@/components/ReviewsSection';
import LocationSection from '@/components/LocationSection';
import BookingSection from '@/components/BookingSection';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
 
export default function SectionRenderer({ layout = [], config = {}, industryKey = 'salon', googleData = null }) {
  const components = config?.site?.components || {};
 
  const renderSection = (sectionName) => {
    switch (sectionName) {
      case 'Hero':
        return (
          <Hero
            key="hero"
            variant={components.hero}
            config={config}
            industryKey={industryKey}
          />
        );
      case 'About':
        return <AboutSection key="about" config={config} industryKey={industryKey} />;
      case 'Services':
        return (
          <Services
            key="services"
            variant={components.services}
            config={config}
            industryKey={industryKey}
          />
        );
      case 'Gallery':
        return <GallerySection key="gallery" config={config} industryKey={industryKey} />;
      case 'BeforeAfter':
        return <BeforeAfterGallery key="before-after" config={config} industryKey={industryKey} />;
      case 'Offers':
        return <OffersSection key="offers" config={config} industryKey={industryKey} />;
      case 'Reviews':
        return (
          <ReviewsSection
            key="reviews"
            config={config}
            industryKey={industryKey}
            googleData={googleData}
          />
        );
      case 'Location':
        return <LocationSection key="location" config={config} industryKey={industryKey} />;
      case 'Booking':
        return <BookingSection key="booking" config={config} industryKey={industryKey} />;
      default:
        return null;
    }
  };
 
  return <>{Array.isArray(layout) ? layout.map((s) => renderSection(s)) : null}</>;
}

