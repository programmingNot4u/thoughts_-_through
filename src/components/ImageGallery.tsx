import { useState } from "react";

interface ImageGalleryProps {
  images: Array<{ id: number; image: string; caption?: string }>;
  layout?: "gallery" | "distributed" | "single";
  content?: string; // HTML content to distribute images within
}

const ImageGallery = ({ images, layout = "gallery", content }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  if (layout === "single" && images.length > 0) {
    return (
      <div className="mb-12 w-full">
        <div className="relative group overflow-hidden rounded-2xl shadow-2xl w-full">
          <img
            src={images[0].image}
            alt={images[0].caption || "Research image"}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 max-w-full"
          />
          {images[0].caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-sm font-medium break-words">{images[0].caption}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (layout === "distributed") {
    // For distributed layout, return images that will be inserted into content
    return (
      <div className="distributed-images-container">
        {images.map((img, idx) => (
          <div
            key={img.id}
            className="my-12 w-full transition-all duration-300 hover:scale-[1.01]">
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src={img.image}
                alt={img.caption || `Image ${idx + 1}`}
                className="w-full h-auto object-cover"
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm break-words">{img.caption}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Gallery layout (default)
  return (
    <div className="mb-12 w-full">
      {/* Main Image */}
      <div className="mb-4 w-full">
        <div className="relative group overflow-hidden rounded-2xl shadow-2xl cursor-pointer w-full"
             onClick={() => setSelectedImage(0)}>
          <img
            src={images[0].image}
            alt={images[0].caption || "Main image"}
            className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-500 group-hover:scale-105 max-w-full"
          />
          {images[0].caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-lg font-medium break-words">{images[0].caption}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {images.slice(1).map((img, idx) => (
            <div
              key={img.id}
              className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer aspect-square"
              onClick={() => setSelectedImage(idx + 1)}>
              <img
                src={img.image}
                alt={img.caption || `Thumbnail ${idx + 2}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs truncate">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-7xl max-h-full w-full flex flex-col items-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={images[selectedImage].image}
              alt={images[selectedImage].caption || `Image ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg w-auto"
              onClick={(e) => e.stopPropagation()}
            />
            {images[selectedImage].caption && (
              <p className="text-white text-center mt-4 break-words max-w-4xl px-4">{images[selectedImage].caption}</p>
            )}
            {images.length > 1 && (
              <>
                {selectedImage > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(selectedImage - 1);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                {selectedImage < images.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(selectedImage + 1);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

