import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  promotionalService,
  type PromotionalItem,
} from "../services/promotionalService";

interface PromotionalSliderProps {
  items?: PromotionalItem[];
}

const PromotionalSlider = ({ items: propItems }: PromotionalSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [items, setItems] = useState<PromotionalItem[]>(propItems || []);
  const [loading, setLoading] = useState(!propItems);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSlideId, setActiveSlideId] = useState<string | number | null>(
    null
  );
  const youtubeIframeRefs = useRef<
    Record<string | number, HTMLIFrameElement | null>
  >({});
  const htmlVideoRefs = useRef<
    Record<string | number, HTMLVideoElement | null>
  >({});
  const appOrigin = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    if (!propItems) {
      const fetchItems = async () => {
        try {
          setLoading(true);
          const data = await promotionalService.getAll();
          setItems(data);
        } catch (error) {
          console.error("Error fetching promotional content:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchItems();
    }
  }, [propItems]);

  // Helper function to extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;

    // Match various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  };

  const slideItems = items || [];

  const isImageUrl = (url?: string) => {
    if (!url) return false;
    try {
      const normalized = url.split("?")[0]?.toLowerCase();
      return /\.(jpeg|jpg|png|gif|webp|svg)$/.test(normalized || "");
    } catch {
      return false;
    }
  };

  const getPromotionalType = (
    item: PromotionalItem
  ): "video" | "image" | "text" => {
    const youtubeSource = item.youtube_url || item.youtubeUrl;
    if (youtubeSource && getYouTubeVideoId(youtubeSource)) {
      return "video";
    }
    if (item.content && getYouTubeVideoId(item.content)) {
      return "video";
    }
    if (item.image || (item.content && isImageUrl(item.content))) {
      return "image";
    }
    return "text";
  };

  const hasVideoSlides = slideItems.some(
    (item) => getPromotionalType(item) === "video"
  );

  const triggerYouTubePlayback = (key: string | number) => {
    const iframe = youtubeIframeRefs.current[key];
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "playVideo",
          args: [],
        }),
        "*"
      );
    }
  };

  const triggerYouTubePause = (key: string | number) => {
    const iframe = youtubeIframeRefs.current[key];
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "pauseVideo",
          args: [],
        }),
        "*"
      );
    }
  };

  const syncSlidePlayback = () => {
    const activeKey = activeSlideId !== null ? String(activeSlideId) : null;

    // First, pause ALL videos to ensure clean state
    Object.entries(youtubeIframeRefs.current).forEach(([key, iframe]) => {
      if (!iframe) return;
      if (activeKey && key === activeKey) {
        // Only play the active one after a small delay to ensure others are paused
        setTimeout(() => {
          triggerYouTubePlayback(key);
        }, 100);
      } else {
        triggerYouTubePause(key);
      }
    });

    Object.entries(htmlVideoRefs.current).forEach(([key, video]) => {
      if (!video) return;
      if (activeKey && key === activeKey) {
        // Only play the active one after a small delay to ensure others are paused
        setTimeout(() => {
          video.play().catch(() => {
            /* ignore */
          });
        }, 100);
      } else {
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          /* ignore */
        }
      }
    });
  };

  const applyMuteState = () => {
    Object.values(youtubeIframeRefs.current).forEach((iframe) => {
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: isMuted ? "mute" : "unMute",
            args: [],
          }),
          "*"
        );
        if (!isMuted) {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: "setVolume",
              args: [100],
            }),
            "*"
          );
        }
      }
    });

    Object.values(htmlVideoRefs.current).forEach((video) => {
      if (video) {
        video.muted = isMuted;
        video.volume = isMuted ? 0 : 1;
      }
    });
  };

  const advanceSlideAfterVideo = () => {
    if (swiper && slideItems.length > 1) {
      setTimeout(() => {
        if (swiper) {
          swiper.slideNext();
        }
      }, 500);
    }
  };

  useEffect(() => {
    syncSlidePlayback();
  }, [activeSlideId, items]);

  useEffect(() => {
    applyMuteState();
  }, [isMuted, items]);

  // Ensure an active slide is selected once items are available
  useEffect(() => {
    if (slideItems.length === 0) {
      return;
    }
    if (
      activeSlideId === null ||
      !slideItems.some((item) => item.id === activeSlideId)
    ) {
      // Set active slide and immediately pause all videos, then play only the active one
      const firstItemId = slideItems[0].id;
      setActiveSlideId(firstItemId);

      // Pause all videos immediately when setting initial active slide
      setTimeout(() => {
        Object.keys(youtubeIframeRefs.current).forEach((key) => {
          if (key !== String(firstItemId)) {
            triggerYouTubePause(key);
          }
        });
        Object.entries(htmlVideoRefs.current).forEach(([key, video]) => {
          if (key !== String(firstItemId) && video) {
            video.pause();
            try {
              video.currentTime = 0;
            } catch {
              /* ignore */
            }
          }
        });
      }, 50);
    }
  }, [slideItems, activeSlideId]);

  // Listen for YouTube video end events
  useEffect(() => {
    if (!swiper) return;

    const handleMessage = (event: MessageEvent) => {
      // Security check - only accept messages from YouTube
      if (
        !event.origin.includes("youtube.com") &&
        !event.origin.includes("youtu.be")
      ) {
        return;
      }

      try {
        let data;
        if (typeof event.data === "string") {
          try {
            data = JSON.parse(event.data);
          } catch {
            // If parsing fails, it might be a different format
            return;
          }
        } else {
          data = event.data;
        }

        // YouTube API sends state change events
        // Format: { event: 'onStateChange', info: <state> }
        // State 0 = ended, 1 = playing, 2 = paused, 3 = buffering, 5 = cued
        if (data && data.event === "onStateChange" && data.info === 0) {
          advanceSlideAfterVideo();
        }
      } catch (e) {
        // Ignore parsing errors
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [swiper, slideItems.length]);

  if (loading) {
    return (
      <section className="relative py-0 bg-white">
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
          <div className="text-forest-green">Loading...</div>
        </div>
      </section>
    );
  }

  if (!items || items.length === 0) {
    return null;
  }

  if (slideItems.length === 0) {
    return null;
  }

  const handlePrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const renderMuteButton = (shouldShow = true) => {
    if (!shouldShow) return null;

    return (
      <button
        onClick={toggleMute}
        aria-pressed={!isMuted}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="pointer-events-auto flex items-center justify-center rounded-full bg-white/90 hover:bg-white px-3 py-2 text-lg shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-green"
        type="button">
        <span aria-hidden="true">{isMuted ? "🔇" : "🔊"}</span>
      </button>
    );
  };

  const renderSlideContent = (item: PromotionalItem) => {
    const displayType = getPromotionalType(item);

    switch (displayType) {
      case "image":
        return (
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <img
              src={item.image || item.content}
              alt={item.title || "Promotional image"}
              className="max-h-full max-w-full object-contain"
            />
            {(item.title || item.description) && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12">
                {item.title && (
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">
                    {item.description}
                  </p>
                )}
                {item.link && (
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={item.link}
                      className="inline-flex items-center justify-center btn-primary bg-white text-forest-green hover:bg-light-green w-auto">
                      {item.link_text || item.linkText || "Learn More"}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "video":
        const videoUrl = item.youtube_url || item.youtubeUrl || item.content;
        const youtubeVideoId = getYouTubeVideoId(videoUrl);

        // If it's a YouTube video, render iframe with autoplay
        if (youtubeVideoId) {
          return (
            <div className="relative w-full h-full">
              <div className="absolute inset-0 w-full h-full">
                <iframe
                  className="w-full h-full pointer-events-none"
                  ref={(el) => {
                    if (el) {
                      youtubeIframeRefs.current[item.id] = el;
                      applyMuteState();
                    } else {
                      delete youtubeIframeRefs.current[item.id];
                    }
                  }}
                  onLoad={() => {
                    // Don't auto-play on load - let syncSlidePlayback handle it
                    // Only play if this is the active slide
                    if (activeSlideId === item.id) {
                      setTimeout(() => {
                        triggerYouTubePlayback(item.id);
                      }, 200);
                    } else {
                      triggerYouTubePause(item.id);
                    }
                  }}
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&mute=${
                    isMuted ? 1 : 0
                  }&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&showinfo=0&enablejsapi=1&autopause=0&origin=${appOrigin}`}
                  title={item.title || "YouTube video"}
                  allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: "none" }}
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Interaction shield to prevent pausing */}
                <div
                  className="absolute inset-0 pointer-events-auto"
                  aria-hidden="true"
                />
              </div>
              {(item.title || item.description) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12 z-10 pointer-events-none">
                  {item.title && (
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 pointer-events-auto">
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl pointer-events-auto">
                      {item.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
                    {item.link && (
                      <a
                        href={item.link}
                        className="inline-flex items-center justify-center btn-primary bg-white text-forest-green hover:bg-light-green w-auto">
                        {item.link_text || item.linkText || "Learn More"}
                      </a>
                    )}
                    {renderMuteButton(true)}
                  </div>
                </div>
              )}
            </div>
          );
        }

        // Otherwise, render regular HTML5 video
        return (
          <div className="relative w-full h-full">
            <video
              className="w-full h-full object-cover pointer-events-none"
              ref={(el) => {
                if (el) {
                  htmlVideoRefs.current[item.id] = el;
                  // Don't auto-play on load - let syncSlidePlayback handle it
                  // Only play if this is the active slide
                  if (activeSlideId === item.id) {
                    setTimeout(() => {
                      el.play().catch(() => {
                        /* ignore */
                      });
                    }, 200);
                  } else {
                    el.pause();
                    try {
                      el.currentTime = 0;
                    } catch {
                      /* ignore */
                    }
                  }
                  // Apply mute state
                  el.muted = isMuted;
                  el.volume = isMuted ? 0 : 1;
                } else {
                  delete htmlVideoRefs.current[item.id];
                }
              }}
              muted={isMuted}
              playsInline
              controls={false}
              onEnded={advanceSlideAfterVideo}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {(item.title || item.description) && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12">
                {item.title && (
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">
                    {item.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
                  {item.link && (
                    <a
                      href={item.link}
                      className="inline-flex items-center justify-center btn-primary bg-white text-forest-green hover:bg-light-green w-auto">
                      {item.link_text || item.linkText || "Learn More"}
                    </a>
                  )}
                  {renderMuteButton(true)}
                </div>
                {item.link && (
                  <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
                    <a
                      href={item.link}
                      className="inline-flex items-center justify-center btn-primary bg-white text-forest-green hover:bg-light-green w-auto">
                      {item.link_text || item.linkText || "Learn More"}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div
            className="w-full h-full flex flex-col justify-center items-center p-8 md:p-12 lg:p-16 relative"
            style={{
              backgroundColor:
                item.background_color || item.backgroundColor || "#1C7C54",
              color: item.text_color || item.textColor || "#ffffff",
            }}>
            {/* Background image if available */}
            {item.image && (
              <div className="absolute inset-0 z-0">
                <img
                  src={item.image}
                  alt={item.title || "Background"}
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
              </div>
            )}
            <div className="max-w-4xl mx-auto text-center relative z-10">
              {item.title && (
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="text-lg md:text-xl mb-8 leading-relaxed">
                  {item.description}
                </p>
              )}
              {item.content && (
                <div className="text-base md:text-lg mb-8 leading-relaxed">
                  {item.content}
                </div>
              )}
              {item.link && (
                <a
                  href={item.link}
                  className="inline-block btn-primary bg-white text-forest-green hover:bg-light-green w-auto">
                  {item.link_text || item.linkText || "Learn More"}
                </a>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <section className="relative py-0 bg-white">
      <div className="relative w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet-custom",
            bulletActiveClass: "swiper-pagination-bullet-active-custom",
          }}
          autoplay={
            hasVideoSlides
              ? false // Disable autoplay when there are videos - videos will control slide progression
              : {
                  delay: 5000,
                  disableOnInteraction: false,
                }
          }
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          loop={slideItems.length > 1}
          onSwiper={setSwiper}
          onSlideChange={(swiperInstance) => {
            const realIndex =
              swiperInstance.realIndex ?? swiperInstance.activeIndex ?? 0;
            const normalizedIndex =
              slideItems.length > 0 ? realIndex % slideItems.length : 0;
            const nextItem = slideItems[normalizedIndex];
            setActiveSlideId(nextItem ? nextItem.id : null);
          }}
          className="promotional-swiper">
          {slideItems.map((item) => (
            <SwiperSlide
              key={item.id.toString()}
              className="h-[500px] md:h-[600px] lg:h-[700px]">
              {renderSlideContent(item)}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        {slideItems.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="swiper-button-prev-custom absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous slide">
              <svg
                className="w-6 h-6 md:w-7 md:h-7 text-forest-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="swiper-button-next-custom absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next slide">
              <svg
                className="w-6 h-6 md:w-7 md:h-7 text-forest-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Custom Pagination Styles */}
        <style>{`
          .promotional-swiper .swiper-pagination {
            bottom: 20px !important;
            z-index: 10;
          }
          .swiper-pagination-bullet-custom {
            width: 12px;
            height: 12px;
            background: rgba(255, 255, 255, 0.5);
            opacity: 1;
            margin: 0 6px;
            transition: all 0.3s;
          }
          .swiper-pagination-bullet-active-custom {
            background: #ffffff;
            width: 32px;
            border-radius: 6px;
          }
        `}</style>
      </div>
    </section>
  );
};

export default PromotionalSlider;
