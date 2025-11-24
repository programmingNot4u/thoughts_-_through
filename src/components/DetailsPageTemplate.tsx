import { Link } from "react-router-dom";
import { useMemo } from "react";
import ImageGallery from "./ImageGallery";

export interface DetailsImage {
  id: number | string;
  image: string;
  caption?: string;
  order?: number;
}

export interface DetailsPageData {
  id: number | string;
  title: string;
  date?: string;
  description?: string;
  content?: string; // HTML content
  author?: string;
  categoryLabel?: string;
  categoryDescription?: string;
  tags?: { name: string }[] | string[];
  external_links?: { title: string; url: string }[];
  youtube_video_id?: string | string[]; // Single video ID or array of video IDs
  images?: DetailsImage[];
  image_layout?: "gallery" | "distributed" | "single";
}

interface DetailsPageTemplateProps {
  data: DetailsPageData;
  backHref: string;
  backLabel?: string;
  showSidebar?: boolean;
  customHeader?: React.ReactNode;
  customSidebar?: React.ReactNode;
}

type ContentBlock =
  | { id: string; type: "html"; value: string }
  | { id: string; type: "image"; value: DetailsImage }
  | { id: string; type: "video"; value: string };

// Split HTML content into logical blocks for even image distribution
const splitHtmlIntoBlocks = (html?: string): string[] => {
  if (!html) return [];

  const blocks: string[] = [];
  const closingTagRegex = /<\/(p|div|section|article|ul|ol|li|h[1-6])>/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = closingTagRegex.exec(html)) !== null) {
    const endIndex = match.index + match[0].length;
    const snippet = html.slice(lastIndex, endIndex).trim();
    if (snippet) {
      blocks.push(snippet);
    }
    lastIndex = endIndex;
  }

  const trailing = html.slice(lastIndex).trim();
  if (trailing) {
    blocks.push(trailing);
  }

  return blocks.length > 0 ? blocks : [html];
};

// Calculate optimal distribution points for images
const calculateImageDistribution = (
  contentBlocks: string[],
  imageCount: number
): number[] => {
  if (imageCount === 0 || contentBlocks.length === 0) return [];

  const distributionPoints: number[] = [];
  const totalBlocks = contentBlocks.length;
  const spacing = Math.max(1, Math.floor(totalBlocks / (imageCount + 1)));

  for (let i = 0; i < imageCount; i++) {
    const position = Math.min((i + 1) * spacing, totalBlocks - 1);
    distributionPoints.push(position);
  }

  return distributionPoints;
};

const DetailsPageTemplate = ({
  data,
  backHref,
  backLabel = "Back",
  showSidebar = true,
  customHeader,
  customSidebar,
}: DetailsPageTemplateProps) => {
  const wordCount = useMemo(() => {
    if (!data.content) return data.description?.split(/\s+/).length ?? 0;
    return data.content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
  }, [data.content, data.description]);

  const readingTime = Math.max(2, Math.round(wordCount / 180));

  // Normalize YouTube video IDs to array
  const youtubeVideos = useMemo(() => {
    if (!data.youtube_video_id) return [];
    if (Array.isArray(data.youtube_video_id)) {
      return data.youtube_video_id.filter(Boolean);
    }
    return [data.youtube_video_id];
  }, [data.youtube_video_id]);

  // Process content blocks with evenly distributed images
  const { contentBlocks, galleryImages } = useMemo(() => {
    const blocks: ContentBlock[] = [];
    const gallery: DetailsImage[] = [];

    // Add YouTube videos at the beginning
    youtubeVideos.forEach((videoId, index) => {
      blocks.push({
        id: `video-${data.id}-${index}`,
        type: "video",
        value: videoId,
      });
    });

    // Process content and images
    const baseBlocks = splitHtmlIntoBlocks(data.content);
    const imagesToDistribute =
      data.image_layout === "distributed" ? data.images ?? [] : [];
    const allImages = data.images ?? [];

    if (baseBlocks.length > 0) {
      // Calculate where to place images evenly
      const distributionPoints = calculateImageDistribution(
        baseBlocks,
        imagesToDistribute.length
      );

      let imageIndex = 0;

      baseBlocks.forEach((snippet, blockIndex) => {
        // Add HTML block
        blocks.push({
          id: `html-${blockIndex}`,
          type: "html",
          value: snippet,
        });

        // Check if we should insert an image here
        if (
          distributionPoints.includes(blockIndex) &&
          imagesToDistribute[imageIndex]
        ) {
          blocks.push({
            id: `inline-img-${imagesToDistribute[imageIndex].id}-${blockIndex}`,
            type: "image",
            value: imagesToDistribute[imageIndex],
          });
          imageIndex++;
        }
      });

      // Add remaining images to gallery (they'll also be in the full gallery below)
      if (imageIndex < imagesToDistribute.length) {
        gallery.push(...imagesToDistribute.slice(imageIndex));
      }
    } else if (data.description) {
      // Fallback to description if no content
      blocks.push({
        id: "description",
        type: "html",
        value: `<p>${data.description}</p>`,
      });
    }

    // Always show ALL images in gallery preview at bottom
    // (even if they were distributed in content above)
    if (allImages.length > 0) {
      gallery.length = 0; // Clear any partial additions
      gallery.push(...allImages); // Show all images in gallery
    }

    return { contentBlocks: blocks, galleryImages: gallery };
  }, [data, youtubeVideos]);

  // Normalize tags to consistent format
  const normalizedTags = useMemo(() => {
    if (!data.tags) return [];
    return data.tags.map((tag) =>
      typeof tag === "string" ? { name: tag } : tag
    );
  }, [data.tags]);

  return (
    <section className="pt-20 pb-24 bg-gradient-to-b from-white via-slate-50 to-light-green/20 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Back Button */}
        <Link
          to={backHref}
          className="inline-flex items-center gap-2 text-forest-green hover:text-deep-green transition-colors mb-6">
          <svg
            className="w-5 h-5"
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
          {backLabel}
        </Link>

        {/* Custom Header or Default Header */}
        {customHeader ? (
          customHeader
        ) : (
          <header className="rounded-[32px] border border-light-green/70 bg-white/80 backdrop-blur-sm p-8 shadow-lg shadow-forest-green/5">
            <div className="flex flex-wrap gap-3 items-center mb-6">
              {data.categoryLabel && (
                <span className="px-4 py-1.5 rounded-full bg-forest-green text-white text-sm font-semibold tracking-wide">
                  {data.categoryLabel}
                </span>
              )}
              {data.date && (
                <span className="text-medium-gray text-sm">
                  {new Date(data.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              <span className="text-medium-gray text-sm">
                • {readingTime} min read
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray leading-tight mb-4">
              {data.title}
            </h1>
            {(data.description || data.categoryDescription) && (
              <p className="text-lg text-medium-gray max-w-3xl">
                {data.description || data.categoryDescription}
              </p>
            )}
          </header>
        )}

        {/* Main Content Area */}
        <article className="mt-12 grid lg:grid-cols-12 gap-10 w-full min-w-0">
          {/* Content Column */}
          <div className="lg:col-span-8 space-y-10 w-full min-w-0 order-2 lg:order-1">
            {contentBlocks.map((block) => {
              if (block.type === "html") {
                return (
                  <div
                    key={block.id}
                    className="prose prose-lg max-w-none text-dark-gray prose-headings:font-heading prose-img:rounded-2xl prose-img:max-w-full prose-a:text-forest-green prose-a:no-underline hover:prose-a:underline overflow-x-hidden break-words"
                    dangerouslySetInnerHTML={{ __html: block.value }}
                  />
                );
              }

              if (block.type === "image") {
                return (
                  <figure
                    key={block.id}
                    className="rounded-3xl bg-slate-900/60 p-4 shadow-xl border border-white/10 w-full max-w-full">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-900">
                      <img
                        src={block.value.image}
                        alt={block.value.caption || data.title}
                        className="h-full w-full object-contain max-w-full"
                        loading="lazy"
                      />
                    </div>
                    {block.value.caption && (
                      <figcaption className="mt-3 text-sm text-slate-300 text-center break-words">
                        {block.value.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              if (block.type === "video") {
                return (
                  <div
                    key={block.id}
                    className="rounded-3xl overflow-hidden shadow-xl border border-white/10 bg-black aspect-video w-full max-w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${block.value}?rel=0&modestbranding=1`}
                      title={data.title}
                      className="w-full h-full max-w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Sidebar */}
          {showSidebar && (
            <aside className="lg:col-span-4 space-y-6 order-1 lg:order-2">
              {customSidebar ? (
                customSidebar
              ) : (
                <>
                  <div className="rounded-3xl border border-light-green/70 bg-white shadow-lg p-6 space-y-4">
                    {data.author && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-medium-gray mb-2">
                          Author
                        </p>
                        <p className="text-dark-gray font-semibold">
                          {data.author}
                        </p>
                      </div>
                    )}

                    {normalizedTags.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-medium-gray mb-3">
                          Key themes
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {normalizedTags.map((tag, index) => (
                            <span
                              key={`${tag.name}-${index}`}
                              className="px-3 py-1 rounded-full bg-light-green text-forest-green text-xs font-medium">
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {data.date && (
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-light-green/50">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-medium-gray mb-1">
                            Published
                          </p>
                          <p className="text-sm font-semibold text-dark-gray">
                            {new Date(data.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-medium-gray mb-1">
                            Reading time
                          </p>
                          <p className="text-sm font-semibold text-dark-gray">
                            {readingTime} mins
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {data.external_links && data.external_links.length > 0 && (
                    <div className="rounded-3xl border border-light-green/60 bg-white shadow-lg p-6">
                      <p className="text-xs uppercase tracking-[0.2em] text-medium-gray mb-3">
                        Resources
                      </p>
                      <ul className="space-y-3">
                        {data.external_links.map((link, idx) => (
                          <li key={`${link.url}-${idx}`}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between text-sm font-medium text-forest-green hover:text-deep-green">
                              <span>{link.title}</span>
                              <svg
                                className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
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
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </aside>
          )}
        </article>

        {/* Image Gallery Preview - All Images */}
        {galleryImages.length > 0 && (
          <div className="mt-16 w-full overflow-x-hidden">
            <h2 className="text-2xl font-heading font-bold text-dark-gray mb-6">
              Visual highlights
            </h2>
            <div className="w-full max-w-full">
              <ImageGallery
                images={galleryImages.map((img) => ({
                  id: img.id,
                  image: img.image,
                  caption: img.caption,
                }))}
                layout="gallery"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailsPageTemplate;

