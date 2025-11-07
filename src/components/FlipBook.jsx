import React, { useRef, useEffect, useState, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";

// Single page wrapper so react-pageflip can correctly clone nodes
const Page = forwardRef(({ children }, ref) => (
  <div
    ref={ref}
    className="flex items-center justify-center w-full h-full bg-white shadow-md text-center text-xl font-serif select-none"
  >
    {children}
  </div>
));

const FlipBook = () => {
  const TOTAL_MAGAZINE_PAGES = 63;
  const magazinePages = Array.from({ length: TOTAL_MAGAZINE_PAGES }, (_, i) => {
    const pageNumber = String(i + 1).padStart(2, "0");
    return `/revista_page-${pageNumber}.png`;
  });

  // responsive sizing
  const containerRef = useRef(null);
  const [bookSize, setBookSize] = useState({ w: 350, h: 495 });

  const RATIO = 680.315 / 481.89; // Match PDF aspect ratio to avoid cropping
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const padding = 32;
      const headerEl = document.querySelector('header');
      const headerSpace = headerEl ? headerEl.offsetHeight + 32 : 120; // nav height + gap
      const viewportWidth = window.innerWidth * 0.92; // 92% vw
      const viewportHeight = window.innerHeight - headerSpace;
      const widthFromHeight = viewportHeight / RATIO;
      const width = Math.min(viewportWidth, widthFromHeight);
      const height = Math.round(width * RATIO);
      setBookSize({ w: width, h: height });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>


      {/* Book component */}
      <div ref={containerRef} className="w-full px-4 flex justify-center">
        <HTMLFlipBook
          width={bookSize.w}
          height={bookSize.h}
          size="stretch"
          minWidth={315}
          maxWidth={800}
          minHeight={300}
          maxHeight={1200}
          showCover={true}
          mobileScrollSupport={true}
          className="shadow-sm rounded border border-neutral-200"
        >
          {magazinePages.map((src, index) => (
            <Page key={src + index}>
              <img src={src} alt={`Página ${index + 1}`} className="w-full h-full object-contain" />
            </Page>
          ))}
        </HTMLFlipBook>
      </div>
    </>
  );
};

export default FlipBook;
