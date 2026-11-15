import { useEffect, useRef, useState } from "react";

const CALENDLY_URL = "https://calendly.com/alextheupscale/new-meeting";
const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

export function CalendlyEmbed({ url = CALENDLY_URL }: { url?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }

    const initWidget = () => {
      const w = window as unknown as {
        Calendly?: {
          initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
        };
      };
      if (w.Calendly && containerRef.current) {
        containerRef.current.innerHTML = "";
        w.Calendly.initInlineWidget({ url, parentElement: containerRef.current });
        // give Calendly a moment to inject the iframe
        setTimeout(() => {
          if (containerRef.current?.querySelector("iframe")) setLoaded(true);
        }, 1500);
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing && (window as unknown as { Calendly?: unknown }).Calendly) {
      initWidget();
    } else if (existing) {
      existing.addEventListener("load", initWidget);
    } else {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    }

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [url]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="w-full bg-card border border-border"
        style={{ minWidth: "320px", height: "720px" }}
      />
      {!loaded && (
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Δεν φορτώνει το widget; Άνοιξε το ραντεβού σε νέο παράθυρο:
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex"
          >
            Κλείσε Ραντεβού
          </a>
        </div>
      )}
    </div>
  );
}
