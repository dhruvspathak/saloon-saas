'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * BeforeAfterGallery
 * Interactive before/after slider for transformation gallery
 * Displays service transformations
 *
 * @param {Array} transformations - Array of {title, before, after}
 */
export default function BeforeAfterGallery({ transformations }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  if (!transformations || transformations.length === 0) {
    return null;
  }

  const current = transformations[activeIndex];

  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transformations
          </h2>
          <div className="w-20 h-1 bg-gradient-rose mx-auto mb-6" />
          <p className="text-gray-600 text-lg font-sans max-w-2xl mx-auto">
            See the stunning before and after transformations
          </p>
        </div>

        {/* Before/After Slider */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Slider Container */}
          <div
            className="relative w-full h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-elegance cursor-col-resize bg-gray-100"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Background) */}
            <Image
              src={current.after}
              alt={`${current.title} after`}
              fill
              className="object-cover"
              quality={85}
              priority
            />

            {/* Before Image (Overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <Image
                src={current.before}
                alt={`${current.title} before`}
                fill
                className="object-cover"
                quality={85}
              />
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize"
              style={{ left: `${sliderPosition}%`, transition: 'none' }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="flex gap-2">
                  <svg className="w-4 h-4 text-rose-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                  </svg>
                  <svg className="w-4 h-4 text-rose-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg">
              <span className="text-white text-sm font-semibold font-sans">Before</span>
            </div>
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg">
              <span className="text-white text-sm font-semibold font-sans">After</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-center font-serif text-2xl font-bold text-gray-900 mt-6">
            {current.title}
          </h3>
        </div>

        {/* Transformation Tabs */}
        {transformations.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3">
            {transformations.map((transformation, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setSliderPosition(50);
                }}
                className={`px-6 py-2 rounded-lg font-sans font-semibold transition-all ${
                  activeIndex === index
                    ? 'bg-gradient-rose text-white shadow-card'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {transformation.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
