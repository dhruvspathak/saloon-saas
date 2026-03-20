'use client';

import { useState } from 'react';
import { 
  validateFormData, 
  validateName, 
  validatePhoneNumber, 
  validateService, 
  validateDate, 
  validateMessage 
} from '@/utils/validation';

export default function BookingSection({ config, industryKey = 'salon' }) {
  const industry = config?.[industryKey] || config?.salon || {};
  const { services = [], location = {}, name } = industry;
  const salonId = industry?.id || config?.salon?.id || 'default';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    let validation;
    switch (name) {
      case 'name':
        validation = validateName(value);
        break;
      case 'phone':
        validation = validatePhoneNumber(value);
        break;
      case 'service':
        validation = validateService(value);
        break;
      case 'date':
        validation = validateDate(value);
        break;
      case 'message':
        validation = validateMessage(value);
        break;
      default:
        validation = { valid: true };
    }

    // Update field errors
    setFieldErrors((prev) => ({
      ...prev,
      [name]: validation.error || '',
    }));

    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setFieldErrors({});

    try {
      // Validate entire form
      const validation = validateFormData(formData);

      if (!validation.valid) {
        setFieldErrors(validation.errors);
        setError('Please fix the errors above and try again');
        setIsLoading(false);
        return;
      }

      // Submit lead to database with sanitized data
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salonId: salonId,
          name: validation.sanitized.name,
          phone: validation.sanitized.phone,
          service: validation.sanitized.service,
          preferredDate: validation.sanitized.date,
          message: validation.sanitized.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking');
      }

      // Also open WhatsApp after successful database submission
      const whatsappMessage = `Hi, I've just submitted a booking request at ${name}.\n\nDetails:\nName: ${validation.sanitized.name}\nService: ${validation.sanitized.service}\nPreferred Date: ${validation.sanitized.date}\n\nMessage: ${validation.sanitized.message || 'No additional message'}`;

      const whatsappUrl = `https://wa.me/${location.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      window.open(whatsappUrl, '_blank');

      setSubmitted(true);

      // Reset form
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          service: '',
          date: '',
          message: '',
        });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message || 'An error occurred. Please try again.');
      setSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="booking" className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Appointment
          </h2>
          <div className="w-20 h-1 bg-gradient-rose mx-auto mb-6" />
          <p className="text-gray-600 text-lg font-sans">
            Choose your preferred service and let's make you beautiful
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-elegance p-8 md:p-12">
          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-sans font-semibold">
                ✓ Thank you! We've received your booking request. Our team will contact you shortly via WhatsApp.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-sans font-semibold">
                ❌ {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-900 font-sans font-semibold mb-2">
                Full Name * {formData.name && !fieldErrors.name && <span className="text-green-600">✓</span>}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent font-sans disabled:bg-gray-100 ${
                  fieldErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-rose-gold'
                }`}
                placeholder="Your name"
              />
              {fieldErrors.name && (
                <p className="text-red-600 text-sm mt-1">⚠️ {fieldErrors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-900 font-sans font-semibold mb-2">
                Phone Number * {formData.phone && !fieldErrors.phone && <span className="text-green-600">✓</span>}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent font-sans disabled:bg-gray-100 ${
                  fieldErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-rose-gold'
                }`}
                placeholder="+91 98765 43210"
              />
              {fieldErrors.phone && (
                <p className="text-red-600 text-sm mt-1">⚠️ {fieldErrors.phone}</p>
              )}
              {formData.phone && !fieldErrors.phone && (
                <p className="text-gray-500 text-sm mt-1">📱 Valid Indian phone number</p>
              )}
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-gray-900 font-sans font-semibold mb-2">
                Select Service * {formData.service && !fieldErrors.service && <span className="text-green-600">✓</span>}
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent font-sans disabled:bg-gray-100 ${
                  fieldErrors.service ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-rose-gold'
                }`}
              >
                <option value="">Choose a service...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name} - {service.price}
                  </option>
                ))}
              </select>
              {fieldErrors.service && (
                <p className="text-red-600 text-sm mt-1">⚠️ {fieldErrors.service}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-900 font-sans font-semibold mb-2">
                Preferred Date * {formData.date && !fieldErrors.date && <span className="text-green-600">✓</span>}
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent font-sans disabled:bg-gray-100 ${
                  fieldErrors.date ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-rose-gold'
                }`}
              />
              {fieldErrors.date && (
                <p className="text-red-600 text-sm mt-1">⚠️ {fieldErrors.date}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-900 font-sans font-semibold mb-2">
                Additional Notes (Optional) {formData.message && !fieldErrors.message && <span className="text-green-600">✓</span>}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent font-sans resize-none disabled:bg-gray-100 ${
                  fieldErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-rose-gold'
                }`}
                placeholder="Any special requests or preferences?"
              />
              {fieldErrors.message && (
                <p className="text-red-600 text-sm mt-1">⚠️ {fieldErrors.message}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                {formData.message.length}/500 characters
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-rose-gold hover:bg-rose-gold-dark text-white py-4 rounded-lg font-sans font-bold text-lg transition-all duration-300 shadow-elegance disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '⏳ Processing...' : '📞 Book Now'}
              </button>
              <a
                href={`tel:${location.phone}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-sans font-bold text-lg transition-all duration-300 shadow-elegance text-center"
              >
                📱 Call Now
              </a>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="space-y-2 text-sm">
              <p className="text-blue-700 font-sans">
                <strong>🔒 Security:</strong> Your data is validated and encrypted. We never share your information.
              </p>
              <p className="text-blue-700 font-sans">
                <strong>✓ Validation:</strong> We check your input in real-time to ensure accuracy and prevent errors.
              </p>
              <p className="text-blue-700 font-sans">
                <strong>💡 Tip:</strong> Your booking details are securely stored in our system. You'll receive a WhatsApp message from our team to confirm your appointment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
