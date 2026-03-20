// /pages/salon/[slug].jsx

const SalonRedirectPage = () => {
  return null;
};

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;

  return {
    redirect: {
      destination: `/site/${slug}`,
      permanent: true, // Use 301 redirect for SEO
    },
  };
};

export default SalonRedirectPage;
