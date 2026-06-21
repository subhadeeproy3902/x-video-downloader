import { STEPS, FAQ } from "@/lib/content";
import { SITE } from "@/lib/site";

export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE.url}/#app`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any (web browser)",
        browserRequirements: "Requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Download X (Twitter) videos as MP4, original resolution",
          "Download full-resolution photos",
          "Download animated GIFs as looping MP4",
          "No watermark, no account, no app install",
          "Shows only the media asset, not the surrounding post",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": `${SITE.url}/#org` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#org`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/logo.png`,
      },
      {
        "@type": "HowTo",
        name: "How to download a video, photo, or GIF from X (Twitter)",
        description: "Save X media to your device in three steps with RipTweet.",
        totalTime: "PT5S",
        step: STEPS.map((s) => ({ "@type": "HowToStep", position: Number(s.n), name: s.title, text: s.body })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}