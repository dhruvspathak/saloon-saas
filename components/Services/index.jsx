import ServicesA from './ServicesA';
 
export default function Services({ variant = 'servicesA', ...props }) {
  switch (variant) {
    case 'servicesA':
    default:
      return <ServicesA {...props} />;
  }
}

