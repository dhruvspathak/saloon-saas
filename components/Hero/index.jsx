import HeroA from './HeroA';
import HeroB from './HeroB';
import HeroC from './HeroC';
 
export default function Hero({ variant = 'heroA', ...props }) {
  switch (variant) {
    case 'heroB':
      return <HeroB {...props} />;
    case 'heroC':
      return <HeroC {...props} />;
    case 'heroA':
    default:
      return <HeroA {...props} />;
  }
}

