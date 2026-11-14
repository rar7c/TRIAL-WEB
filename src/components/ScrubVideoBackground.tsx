import { useEffect, useRef, useState } from 'react';

const VIDEO_URL = '/assets/aistudio/lazy_vid_2c4ccff7.mp4';
const SENSITIVITY = 0.8;

export function ScrubVideoBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const lastRequestedSeekRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const initializedRef = useRef<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>(VIDEO_URL);

  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;

    fetch(VIDEO_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Video fetch failed');
        return res.blob();
      })
      .then((blob) => {
        if (!active) return;
        objectUrl = URL.createObjectURL(blob);
        setVideoSrc(objectUrl);
      })
      .catch(() => {
        // Fallback to direct VIDEO_URL if blob fetch fails
      });

    return () => {
      active = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, []);

  useEffect(() => {
    const seekTo = (video: HTMLVideoElement, time: number) => {
      if (!video.seeking) {
        isSeekingRef.current = false;
      }
      if (isSeekingRef.current || video.readyState < 1) return;

      lastRequestedSeekRef.current = time;
      isSeekingRef.current = true;
      video.currentTime = time;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const video = videoRef.current;
      const currentX = event.clientX;

      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      if (
        !video ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0 ||
        window.innerWidth <= 0 ||
        delta === 0
      ) {
        return;
      }

      if (!initializedRef.current) {
        initializedRef.current = true;
        targetTimeRef.current = video.duration;
      }

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const nextTime = Math.max(0, Math.min(video.duration, targetTimeRef.current - timeOffset));
      targetTimeRef.current = nextTime;

      seekTo(video, nextTime);
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();

    if (!initializedRef.current) {
      const startTime = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
      initializedRef.current = true;
      targetTimeRef.current = startTime;
    }

    const initialTarget = Math.max(
      0,
      Math.min(
        Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0,
        targetTimeRef.current,
      ),
    );
    lastRequestedSeekRef.current = initialTarget;
    isSeekingRef.current = false;
    video.currentTime = initialTarget;
  };

  const handleSeeked = () => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

    const nextTarget = Math.max(0, Math.min(video.duration, targetTimeRef.current));
    if (Math.abs(nextTarget - lastRequestedSeekRef.current) > 0.005) {
      lastRequestedSeekRef.current = nextTarget;
      isSeekingRef.current = true;
      video.currentTime = nextTarget;
    }
  };

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={handleLoadedMetadata}
      onSeeked={handleSeeked}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full object-cover object-[70%_center] brightness-[1.16] contrast-[0.94] saturate-[0.78] pointer-events-none"
    />
  );
}
