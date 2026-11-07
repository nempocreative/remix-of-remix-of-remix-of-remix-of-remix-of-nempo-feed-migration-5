import { useEffect, useState, type MouseEvent } from 'react';
import { Download } from 'lucide-react';

function isAppleTouchDevice() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

/**
 * Download button for a prebuilt PNG. The file is fetched into memory as soon
 * as the slide is shown. On computers a tap saves it through a same-origin
 * blob link; on iPad/iPhone it opens the share sheet ("Simpan Gambar" /
 * "Simpan ke File"), falling back to opening the picture in a new tab.
 */
export function PrebuiltPngDownload({
  src,
  fileName,
  label,
  className,
}: {
  src: string;
  fileName: string;
  label: string;
  className?: string;
}) {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let url: string | null = null;
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then((data) => {
        if (cancelled) return;
        const png = new Blob([data], { type: 'image/png' });
        url = URL.createObjectURL(png);
        setBlob(png);
        setBlobUrl(url);
      })
      .catch(() => {
        /* fall back to the direct file link */
      });
    return () => {
      cancelled = true;
      if (url) window.setTimeout(() => URL.revokeObjectURL(url!), 30_000);
    };
  }, [src]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isAppleTouchDevice()) return; // normal download on computers
    event.preventDefault();
    const openInTab = () => window.open(src, '_blank', 'noopener');
    if (blob) {
      const file = new File([blob], fileName, { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        navigator.share({ files: [file], title: fileName }).catch((error: DOMException) => {
          if (error?.name !== 'AbortError') openInTab();
        });
        return;
      }
    }
    openInTab();
  };

  return (
    <a
      href={blobUrl ?? src}
      download={fileName}
      onClick={handleClick}
      className={className}
      data-ready={blobUrl ? 'true' : 'false'}
    >
      <Download className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </a>
  );
}
