import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 80;

export default function Animate() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  const isAnimating = useRef(false);

  // ⭐ NEW: Refs for text overlays to update them directly without React re-renders
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  // Cache the layout calculations so we don't calculate them 60 times a second
  const layoutRef = useRef({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    // Preload images
    if (imagesRef.current.length === 0) {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/frame/Premium_watch_cinematic_1080p_202602220051_${String(i).padStart(3, "0")}.jpg`;

        img.decode()
          .then(() => { if (i === 0) draw(0); })
          .catch(() => {});

        imagesRef.current.push(img);
      }
    }

    const draw = (index) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

      // Draw black background
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ⭐ APPLE SMOOTHNESS: Use pre-calculated layout data
      const { x, y, w, h } = layoutRef.current;
      ctx.drawImage(img, x, y, w, h);
    };

    const updateCanvasSize = () => {
      // ⭐ APPLE SMOOTHNESS: High-DPI / Retina display support
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Set actual internal canvas resolution
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      // Set visual display size
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Scale context to match DPI
      ctx.scale(dpr, dpr);

      // Pre-calculate image scaling ONCE per resize, not every frame
      const img = imagesRef.current[0];
      if (img) {
        const scale = Math.min(width / img.width, height / img.height);
        layoutRef.current = {
          w: img.width * scale,
          h: img.height * scale,
          x: (width - img.width * scale) / 2,
          y: (height - img.height * scale) / 2,
        };
      }

      draw(Math.round(currentFrame.current));
    };

    // Wait for first image to load to do initial layout math
    if (imagesRef.current[0]) {
      imagesRef.current[0].onload = updateCanvasSize;
    }

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = Math.max(0, Math.min(scrollTop / maxScroll, 1));

      targetFrame.current = scrollFraction * (TOTAL_FRAMES - 1);

      if (!isAnimating.current) {
        isAnimating.current = true;
        animate();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId;
    let lastDrawnFrame = -1;

    // Helper function to calculate text animations based on frame range
    const updateTextAnimation = (frame) => {
      // Text 1: Fades in frame 10-20, stays till 35, fades out 35-45
      if (text1Ref.current) {
        let opacity = 0;
        let translateY = 30; // Starts pushed down 30px
        
        if (frame > 10 && frame < 45) {
          if (frame <= 20) {
            opacity = (frame - 10) / 10;
            translateY = 30 - (opacity * 30); // slides up to 0
          } else if (frame <= 35) {
            opacity = 1;
            translateY = 0;
          } else {
            opacity = 1 - ((frame - 35) / 10);
            translateY = -((1 - opacity) * 30); // slides up to -30
          }
        }
        text1Ref.current.style.opacity = opacity;
        text1Ref.current.style.transform = `translateY(${translateY}px)`;
      }

      // Text 2: Fades in frame 50-60, stays till 80
      if (text2Ref.current) {
        let opacity = 0;
        let translateY = 30;
        
        if (frame > 50) {
          if (frame <= 60) {
            opacity = (frame - 50) / 10;
            translateY = 30 - (opacity * 30);
          } else {
            opacity = 1;
            translateY = 0;
          }
        }
        text2Ref.current.style.opacity = opacity;
        text2Ref.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    const animate = () => {
      // ⭐ APPLE SMOOTHNESS: 0.08 adds a bit more "weight" to the scroll inertia
      currentFrame.current += (targetFrame.current - currentFrame.current) * 0.08;

      if (Math.abs(targetFrame.current - currentFrame.current) < 0.01) {
        currentFrame.current = targetFrame.current;
        isAnimating.current = false;
      }

      const frameToDraw = Math.round(currentFrame.current);

      if (frameToDraw !== lastDrawnFrame) {
        draw(frameToDraw);
        lastDrawnFrame = frameToDraw;
      }

      // Update text overlays directly bypassing React render
      updateTextAnimation(currentFrame.current);

      if (isAnimating.current) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ height: "400vh", backgroundColor: "black" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden", // Keep text contained
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />

        {/* ⭐ NEW: Cinematic Text Overlays */}
        <div
          ref={text1Ref}
          style={{
            position: "absolute",
            top: "40%",
            left: "10%",
            color: "white",
            fontFamily: "system-ui, -apple-system, sans-serif",
            opacity: 0, // Controlled by JS
            willChange: "opacity, transform",
          }}
        >
          <h1 style={{ fontSize: "4rem", margin: 0, fontWeight: 600 }}>Precision.</h1>
          <p style={{ fontSize: "1.5rem", color: "#a1a1aa", margin: "10px 0 0 0" }}>
            Every detail meticulously crafted.
          </p>
        </div>

        <div
          ref={text2Ref}
          style={{
            position: "absolute",
            top: "50%",
            right: "10%",
            color: "white",
            textAlign: "right",
            fontFamily: "system-ui, -apple-system, sans-serif",
            opacity: 0, // Controlled by JS
            willChange: "opacity, transform",
          }}
        >
          <h1 style={{ fontSize: "4rem", margin: 0, fontWeight: 600 }}>Timeless.</h1>
          <p style={{ fontSize: "1.5rem", color: "#a1a1aa", margin: "10px 0 0 0" }}>
            A design that lasts forever.
          </p>
        </div>
      </div>
    </div>
  );
}