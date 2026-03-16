import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAvailableIndustries, getIndustryModule } from '@/industries';
import { getAvailableThemes } from '@/themes';
import { getAvailableLayouts } from '@/layouts';

/**
 * Internal Site Generator Page
 * Protected page for creating new sites
 * 
 * Access: /internal/create-site
 * Security: Requires INTERNAL_ACCESS_KEY in environment
 */
export default function CreateSitePage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    businessName: '',
    slug: '',
    industry: 'salon',
    theme: 'luxury',
    layout: 'layoutA',
    phone: '',
    whatsapp: '',
    address: '',
    googlePlaceId: '',
  });

  const [availableIndustries, setAvailableIndustries] = useState([]);
  const [availableThemes, setAvailableThemes] = useState([]);
  const [availableLayouts, setAvailableLayouts] = useState([]);

  /**
   * Check authorization on component mount
   */
  useEffect(() => {
    checkAuthorization();
    loadAvailableOptions();
  }, []);

  /**
   * Check if user is authorized to access this page
   */
  const checkAuthorization = () => {
    const accessKey = localStorage.getItem('internalAccessKey');
    const envKey = process.env.NEXT_PUBLIC_INTERNAL_ACCESS_KEY;

    // If stored key exists and matches env key, authorize
    if (accessKey && accessKey === envKey) {
      setIsAuthorized(true);
      return;
    }

    // If no env key set, allow access (development mode)
    if (!envKey) {
      setIsAuthorized(true);
      return;
    }

    // Env key is set but no stored key - prompt for key
    const userKey = prompt('Enter internal access key:');
    if (userKey === envKey) {
      localStorage.setItem('internalAccessKey', userKey);
      setIsAuthorized(true);
    }
  };

  /**
   * Load available options from modules
   */
  const loadAvailableOptions = () => {
    setAvailableIndustries(getAvailableIndustries());
    setAvailableThemes(getAvailableThemes());
    setAvailableLayouts(getAvailableLayouts());
  };

  /**
   * Handle form input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'businessName') {
      // Auto-generate slug from business name
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: generatedSlug,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const apiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY ||
        localStorage.getItem('internalAccessKey');

      const response = await fetch('/api/internal/createSite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-api-key': apiKey,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.details
            ? Array.isArray(data.details)
              ? data.details.join(', ')
              : data.details
            : data.error || 'Failed to create site'
        );
        return;
      }

      setSuccess(`Site created successfully! Access at ${data.site.url}`);

      // Reset form
      setFormData({
        businessName: '',
        slug: '',
        industry: 'salon',
        theme: 'luxury',
        layout: 'layoutA',
        phone: '',
        whatsapp: '',
        address: '',
        googlePlaceId: '',
      });

      // Optionally redirect to new site
      setTimeout(() => {
        router.push(`/site/${data.site.slug}`);
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Authorization check
  if (!isAuthorized) {
    return (
      <>
        <Head>
          <title>Access Denied</title>
        </Head>
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow p-8 max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600">
              You do not have permission to access this page. This is an internal tool only.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Create Site | Internal Tool</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Site</h1>
          <p className="text-gray-600 mb-8">
            This is an internal tool for creating new multi-industry sites
          </p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded p-4">
              <p className="text-green-800">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., Cinderella Sharon's Salon"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Slug * (auto-generated)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., cinderella-sharons-salon"
              />
              <p className="text-xs text-gray-500 mt-1">URL: /site/{formData.slug}</p>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {availableIndustries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind.charAt(0).toUpperCase() + ind.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme *
              </label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {availableThemes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Layout */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Layout *
              </label>
              <select
                name="layout"
                value={formData.layout}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {availableLayouts.map((layout) => (
                  <option key={layout} value={layout}>
                    {layout}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Business address"
              />
            </div>

            {/* Google Place ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Place ID (optional)
              </label>
              <input
                type="text"
                name="googlePlaceId"
                value={formData.googlePlaceId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Google Maps Place ID for reviews"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Site'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t">
            <h2 className="font-semibold text-gray-900 mb-4">Available Options</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700 mb-2">Industries:</p>
                <ul className="text-gray-600">
                  {availableIndustries.map((ind) => (
                    <li key={ind}>• {ind}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-2">Themes:</p>
                <ul className="text-gray-600">
                  {availableThemes.map((theme) => (
                    <li key={theme}>• {theme}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-2">Layouts:</p>
                <ul className="text-gray-600">
                  {availableLayouts.map((layout) => (
                    <li key={layout}>• {layout}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
