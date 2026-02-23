import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
const TOTAL_FRAMES = 80;

export default function AurexCinematicExperience() {
  const containerRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const playhead = useRef({ frame: 0 });

  // Text Container Refs
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3LeftRef = useRef(null);
  const text3RightRef = useRef(null);
  
  // Background vignette for contrast
  const vignetteRef = useRef(null);

  // 1. Preload Images
  useEffect(() => {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      // Ensure this path matches your public folder exactly
      img.src = `/frame/Premium_watch_cinematic_1080p_202602220051_${String(i).padStart(3, "0")}.jpg`;
      imagesRef.current.push(img);
    }
  }, []);

  // 2. GSAP Timeline & Canvas Rendering
  useGSAP(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      renderCanvas();
    };

    const renderCanvas = () => {
      const img = imagesRef.current[Math.round(playhead.current.frame)];
      if (img && img.complete) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        
        const scale = Math.min(window.innerWidth / img.width, window.innerHeight / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (window.innerWidth - w) / 2;
        const y = (window.innerHeight - h) / 2;
        
        ctx.drawImage(img, x, y, w, h);
      }
    };

    window.addEventListener("resize", updateCanvasSize);
    if (imagesRef.current[0]) imagesRef.current[0].onload = updateCanvasSize;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1.2, // Smooth, weighty scrubbing
        pin: true,
      }
    });

    // Initial State Setups
    gsap.set(canvasWrapperRef.current, { x: "20vw" });
    gsap.set(vignetteRef.current, { opacity: 0 });
    
    // Hide all text containers and set initial dim colors
    const textContainers = [text1Ref, text2Ref, text3LeftRef, text3RightRef];
    textContainers.forEach(ref => {
      gsap.set(ref.current, { opacity: 0, y: 40 });
      // Target the h2/h3 inside to start dim
      gsap.set(ref.current.querySelector('h2, h3'), { color: "#6b7280" }); 
    });

    // --- CHOREOGRAPHY ---
    
    // Animate frames 0 to 79
    tl.to(playhead.current, { 
      frame: TOTAL_FRAMES - 1, 
      snap: "frame", 
      ease: "none", 
      onUpdate: renderCanvas, 
      duration: 4 
    }, 0)
      
      // Phase 1 (Start)
      .to(vignetteRef.current, { opacity: 0.8, duration: 0.5 }, 0)
      .to(text1Ref.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.2)
      // Color transition from dim gray to bright white on scroll
      .to(text1Ref.current.querySelector('h2'), { color: "#ffffff", duration: 0.5 }, 0.2)
      
      // Phase 1 -> 2 Transition
      .to(text1Ref.current, { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" }, 0.8)
      .to(canvasWrapperRef.current, { x: "-20vw", duration: 1.2, ease: "power2.inOut" }, 0.6)
      
      // Phase 2 Enter
      .to(text2Ref.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.3)
      .to(text2Ref.current.querySelector('h2'), { color: "#ffffff", duration: 0.5 }, 1.3)

      // Phase 2 -> 3 Transition (The 4K Zoom)
      .to(text2Ref.current, { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" }, 2.0)
      .to(canvasWrapperRef.current, { x: "0vw", scale: 1.3, duration: 1.5, ease: "power2.inOut" }, 1.8)
      .to(vignetteRef.current, { opacity: 0.95, duration: 1 }, 2.0) // Darken edges more for macro shot
      
      // Phase 3 Enter (Split Text)
      .to(text3LeftRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 2.8)
      .to(text3LeftRef.current.querySelector('h3'), { color: "#ffffff", duration: 0.5 }, 2.8)
      .to(text3RightRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 2.8)
      .to(text3RightRef.current.querySelector('h3'), { color: "#ffffff", duration: 0.5 }, 2.8);

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      
      {/* Moving Canvas Wrapper */}
      <div ref={canvasWrapperRef} className="absolute inset-0 w-full h-full z-0 flex items-center justify-center will-change-transform">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      </div>

      {/* Dynamic Vignette Overlay to make text pop against the watch */}
      <div 
        ref={vignetteRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.85) 90%)"
        }}
      />

      {/* TEXT LAYERS (Z-20) */}
      
      {/* Phase 1 Text */}
      <div ref={text1Ref} className="absolute left-[8%] md:left-[12%] z-20 w-80 text-left">
        <h2 className="text-4xl md:text-5xl font-serif tracking-wide mb-4 transition-colors">
          Aurex Explorer.
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wider uppercase leading-relaxed">
          Forged for the extremes. Meticulously crafted for who push boundaries.
        </p>
      </div>

      {/* Phase 2 Text */}
      <div ref={text2Ref} className="absolute right-[0%] md:right-[8%] z-20 w-80 text-right">
        <h2 className="text-4xl md:text-5xl font-serif tracking-wide mb-4 transition-colors">
          Enduring Legacy.
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wider uppercase leading-relaxed">
          A design built to command respect.
        </p>
      </div>
      {/* Phase 3 Text (Split 4K Display Mode) */}
      <div className="absolute w-full px-[8%] md:px-[5%] flex justify-between z-20 pointer-events-none">
        <div ref={text3LeftRef} className="w-64 md:w-80 text-right pr-4 md:pr-10">
          <h3 className="text-2xl md:text-3xl font-serif tracking-wide mb-3 transition-colors">
            Chromalight
          </h3>
          <p className="text-gray-400 text-xs md:text-sm font-light tracking-wider uppercase leading-relaxed">
            Brilliant blue luminescence for exceptional clarity in absolute darkness.
          </p>
        </div>
        <div ref={text3RightRef} className="w-64 md:w-80 text-left pl-4 md:pl-10">
          <h3 className="text-2xl md:text-3xl font-serif tracking-wide mb-3 transition-colors">
            Perpetual Calibre
          </h3>
          <p className="text-gray-400 text-xs md:text-sm font-light tracking-wider uppercase leading-relaxed">
            Self-winding mechanical mastery engineered for unrivaled accuracy.
          </p>
        </div>
      </div>
    </div>
  );
}