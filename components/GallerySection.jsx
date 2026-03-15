'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function GallerySection({ config }) {
  const { gallery } = config.salon;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = gallery.map((item) => ({
    src: item.image,
    alt: item.title,
  }));

  return (
    <section id="gallery" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gallery
          </h2>
          <div className="w-20 h-1 bg-gradient-rose mx-auto mb-6" />
          <p className="text-gray-600 text-lg font-sans max-w-2xl mx-auto">
            See the transformations and beauty moments we've created
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, galleryIndex) => (
            <div
              key={item.id}
              className="relative h-80 rounded-lg overflow-hidden shadow-card cursor-pointer group"
              onClick={() => {
                setIndex(galleryIndex);
                setOpen(true);
              }}
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                quality={75}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-end p-6">
                <div>
                  <p className="text-white font-sans text-sm font-semibold mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-white font-serif text-lg font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Hover Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={index}
          onChange={setIndex}
        />
      </div>
    </section>
  );
}
