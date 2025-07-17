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
  // Array of 6 flip-sounds that will be cycled
  const soundFiles = [
    "/page-flip1.mp3",
    "/page-flip2.mp3",
    "/page-flip3.mp3",
    "/page-flip4.mp3",
    "/page-flip5.mp3",
    "/page-flip6.mp3",
  ];

  const soundRefs = useRef([]);

  // responsive sizing
  const containerRef = useRef(null);
  const [bookSize, setBookSize] = useState({ w: 350, h: 455 });

  const RATIO = 1.1; // height = width * RATIO (shorter pages)
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const padding = 32;
      const headerSpace = 120; // reserve pixels for header/nav
      const viewportWidth = window.innerWidth * 0.9; // 90% of vw
      const viewportHeight = window.innerHeight - headerSpace; // remaining visible area
      const widthFromHeight = viewportHeight / RATIO;
      const width = Math.min(viewportWidth, widthFromHeight);
      const height = Math.round(width * RATIO);
      setBookSize({ w: width, h: height });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Create audio elements only on the client to avoid SSR errors
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.Audio !== "undefined") {
      soundRefs.current = soundFiles.map((src) => {
        const a = new Audio(src);
        a.preload = "auto";
        return a;
      });
    }
  }, []);
  const flipCountRef = useRef(0);

  const handleFlip = (e) => {
    const pageIndex =
      (typeof e?.data === "number" ? e.data : undefined) ??
      e?.data?.page ??
      e?.data?.pageIndex ??
      0;
    // console.debug("flip", pageIndex);
    // Determine which sound should play based on page index (0-based)
    const soundMap = [
      { range: [1, 2], sound: 0 }, // sound 1 for pages 1-2
      { range: [3, 4], sound: 1 }, // sound 2 for pages 3-4
      { range: [5, 6], sound: 2 }, // sound 3 for pages 5-6
      { range: [7, 8], sound: 3 }, // sound 4 for pages 7-8
      { range: [9, 10], sound: 5 }, // sound 6 for pages 9-10
    ];

    const mapping = soundMap.find(({ range }) => pageIndex >= range[0] && pageIndex <= range[1]);
    if (mapping === undefined) {
      // stop all sounds if page has no sound
      soundRefs.current.forEach((a) => {
        a.pause();
        a.currentTime = 0;
      });
      return;
    }

    if (!soundRefs.current.length) return;
    // Stop previous sounds
    soundRefs.current.forEach((a) => {
      a.pause();
      a.currentTime = 0;
    });

    const audio = soundRefs.current[mapping.sound];
    if (audio) {
      audio.play().catch(() => {});
    }
  };


  return (
    <>


      {/* Book component */}
      <div ref={containerRef} className="w-full px-4 flex justify-center">
        <HTMLFlipBook
        width={bookSize.w}
        height={bookSize.h}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={300}
        maxHeight={1200}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={handleFlip}
        className="shadow-lg"
      >
        <Page>
          <img src="/tdgol.jpeg" alt="Portada" className="w-full h-full object-contain p-2" />
        </Page>
        {Array.from({ length: 12 }).map((_, i) => {
          const bgImages = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"];
          const imgSrc = bgImages[i] ? `/${bgImages[i]}` : null;
          return (
            <Page key={i + 1} className="relative">
              {imgSrc ? (
                <img src={imgSrc} alt="Página" className="w-full h-full object-cover" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-xl">Página {i + 1}</span>
              )}
            </Page>
          );
        })}
        <Page>Contraportada</Page>
      </HTMLFlipBook>
      </div>
    </>
  );
};

export default FlipBook;
