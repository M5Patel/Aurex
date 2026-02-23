import React, { useRef, useState, useEffect } from "react";
import radoVideo from "../../assets/rado.mp4";

const Animate = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const [cursor, setCursor] = useState({ x: 0, y: 0, show: false });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const title = "Experience the Extraordinary";

  /* ---------- Fullscreen ---------- */
  useEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  /* ---------- Cursor Magnifier ---------- */
  const handleMove = (e) => {
    const rect = titleRef.current.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    });
  };

  const leaveTitle = () =>
    setCursor((prev) => ({ ...prev, show: false }));

  /* ---------- Video Controls ---------- */
  const toggleVideo = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement)
      containerRef.current.requestFullscreen();
    else document.exitFullscreen();
  };

  /* ---------- TOP BALLS CONFIG ---------- */
  const balls = [
    {
      position: "top-[-12%] left-[-5%]",
      size: "30vw",
      duration: "4s",
      animation: "floatSlowRight",
    },
    {
      position: "top-[-12%] right-[-5%]",
      size: "30vw",
      duration: "4s",
      animation: "floatSlowLeft",
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-12 overflow-hidden ">
      
      {/* ---------- PREMIUM BALL CSS ---------- */}
      <style>{`
        @keyframes floatSlowRight {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(120px,25px); }
        }

        @keyframes floatSlowLeft {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(-120px,25px); }
        }

        .ball {
          position:absolute;
          filter:blur(30px);
          opacity:.9;
          background: radial-gradient(circle at 30% 30%,
            rgba(255, 208, 151, 1),
            rgba(255,255,255,0.7),
            rgba(0,255,120,0.6)
          );
          animation-timing-function:cubic-bezier(.45,.05,.55,.95);
          animation-iteration-count: infinite;
        }

        .magnifier{
          position:absolute;
          width:120px;
          height:120px;
          border-radius:50%;
          pointer-events:none;
          border:2px solid rgba(255,255,255,0.6);
          backdrop-filter: blur(6px);
          transform: translate(-50%, -50%);
        }

        .zoom-text span{
          transition:transform .2s ease;
        }
      `}</style>

      {/* ---------- TOP FLOATING BALLS ---------- */}
      {balls.map((ball, i) => (
        <div
          key={i}
          className={`ball ${ball.position}`}
          style={{
            width: ball.size,
            height: ball.size,
            animationDuration: ball.duration,
            animationName: ball.animation,
          }}
        />
      ))}

      {/* ---------- TITLE ---------- */}
      <div
        ref={titleRef}
        onMouseMove={handleMove}
        onMouseLeave={leaveTitle}
        className="relative z-10 mb-10"
      >
        {cursor.show && (
          <div
            className="magnifier"
            style={{ left: cursor.x, top: cursor.y }}
          />
        )}

        <h2 className="zoom-text text-xl md:text-4xl font-semibold tracking-widest uppercase text-black text-center flex flex-wrap justify-center">
          {title.split("").map((letter, i) => (
            <span
              key={i}
              style={{
                marginRight: "6px",
                transform: cursor.show
                  ? `scale(${Math.abs(cursor.x - i * 20) < 60 ? 1.6 : 1})`
                  : "scale(1)",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h2>
      </div>

      {/* ---------- VIDEO ---------- */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[85%] aspect-video bg-black overflow-hidden shadow-2xl rounded-xl z-10"
      >
        <video
          ref={videoRef}
          src={radoVideo}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-6 right-6 flex gap-4 text-white">
          <button onClick={toggleSound}>{isMuted ? "🔇" : "🔊"}</button>
          <button onClick={toggleVideo}>{isPlaying ? "⏸" : "▶"}</button>
          <button onClick={toggleFullscreen}>
            {isFullscreen ? "🡼" : "⛶"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Animate;