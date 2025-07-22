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
    "/eldiaque.m4a",
    "/uniformedenina.m4a",
    "/miprimer.m4a",
  
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
  // Mantener un seguimiento del sonido actual que se está reproduciendo
  const currentSoundRef = useRef(null);

  const handleFlip = (e) => {
    const pageIndex =
      (typeof e?.data === "number" ? e.data : undefined) ??
      e?.data?.page ??
      e?.data?.pageIndex ??
      0;
    // console.debug("flip", pageIndex);
    // Determine which sound should play based on page index (0-based)
    const soundMap = [
      { range: [5, 6], sound: 0 }, // sound 1 (eldiaque.m4a) for pages 5-6
      { range: [7, 10], sound: 1 }, // sound 2 for pages 7-10
      { range: [11, 14], sound: 2 }, // sound 3 for pages 11-14
    ];

    const mapping = soundMap.find(({ range }) => pageIndex >= range[0] && pageIndex <= range[1]);
    
    // Si no hay mapeo para esta página, detener todos los sonidos
    if (mapping === undefined) {
      soundRefs.current.forEach((a) => {
        a.pause();
        a.currentTime = 0;
      });
      currentSoundRef.current = null;
      return;
    }

    if (!soundRefs.current.length) return;
    
    // Solo detener y reproducir si el sonido es diferente al actual
    const audio = soundRefs.current[mapping.sound];
    if (currentSoundRef.current !== audio) {
      // Detener todos los sonidos
      soundRefs.current.forEach((a) => {
        a.pause();
        a.currentTime = 0;
      });
      
      // Reproducir el nuevo sonido
      if (audio) {
        audio.play().catch(() => {});
        currentSoundRef.current = audio;
      } else {
        currentSoundRef.current = null;
      }
    }
    // Si es el mismo sonido, no hacemos nada y dejamos que siga reproduciéndose
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
        maxWidth={800}
        minHeight={300}
        maxHeight={1200}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={handleFlip}
        className="shadow-sm rounded border border-neutral-200"
      >
        <Page>
          <img src="/PORTADA_FIN.png" alt="Portada" className="w-full h-full object-contain p-2" />
        </Page>
        {Array.from({ length: 15 }).map((_, i) => {
          const bgImages = [
            "pagina1.png",    // 1
            "PAGINA_3.png",   // 2
            "HISTORIA1.png",  // 3
            "HISTORIA2.png",  // 4
            "PAGINA_5.png",   // 5
            "PAGINA_6.png",   // 6
            "PAGINA_7.png",   // 7
            "PAGINA_8.png",   // 8
            "PAGINA_9.png",   // 9
            null,              // 10 - Vacía
            "PAGINA_10.png",  // 11 (antes 10)
            "PAGINA_11.png",  // 12 (antes 11)
            "PAGINA_12.png",  // 13 (antes 12)
            null,              // 14 - Vacía
            "tdgol.png"       // 15 - Contraportada
          ];
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
