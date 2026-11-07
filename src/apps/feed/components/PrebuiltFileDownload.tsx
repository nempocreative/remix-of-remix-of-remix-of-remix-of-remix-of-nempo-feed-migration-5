import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode, type Ref } from 'react';

function isAppleTouchDevice() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function mimeFor(fileName: string) {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (ext === 'mp4') return 'video/mp4';
  if (ext === 'png') return 'image/png';
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'pdf') return 'application/pdf';
  return 'application/octet-stream';
}

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'download' | 'children'> & {
  src: string;
  fileName: string;
  children: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
};

/**
 * Download link for a prebuilt file (PNG or MP4).
 * - Computers: a plain same-origin link with `download`, so the browser saves it.
 * - iPad/iPhone (Safari and Chrome): the file is fetched in advance and a tap
 *   opens the share sheet ("Simpan Video" / "Simpan Gambar" / "Simpan ke File").
 *   iOS download managers fail on blob links and inside embedded previews, so
 *   when sharing is blocked we show a link that opens the file in a new tab.
 */
export function PrebuiltFileDownload({ src, fileName, children, onClick, ref, ...rest }: Props) {
  const [apple, setApple] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [failed, setFailed] = useState(false);
  const [hint, setHint] = useState<null | 'loading' | 'blocked'>(null);

  useEffect(() => {
    setApple(isAppleTouchDevice());
  }, []);

  useEffect(() => {
    setBlob(null);
    setFailed(false);
    setHint(null);
    if (!apple) return;
    let cancelled = false;
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then((data) => {
        if (cancelled) return;
        setBlob(new Blob([data], { type: mimeFor(fileName) }));
        setHint((h) => (h === 'loading' ? null : h));
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [apple, src, fileName]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!apple) return; // normal download on computers
    event.preventDefault();
    if (!blob) {
      if (failed) {
        window.open(src, '_blank', 'noopener');
      } else {
        setHint('loading');
      }
      return;
    }
    const file = new File([blob], fileName, { type: blob.type });
    if (navigator.canShare?.({ files: [file] })) {
      navigator.share({ files: [file], title: fileName }).catch((error: DOMException) => {
        if (error?.name !== 'AbortError') setHint('blocked');
      });
      return;
    }
    setHint('blocked');
  };

  const preparing = apple && !blob && !failed;

  return (
    <>
      <a
        {...rest}
        ref={ref}
        href={src}
        download={fileName}
        onClick={handleClick}
        data-ready={!apple || blob ? 'true' : 'false'}
        aria-busy={preparing || undefined}
      >
        {children}
      </a>
      {hint === 'loading' && preparing && (
        <p className="max-w-[92vw] text-center text-[10px] font-semibold text-slate-700" role="status">
          File sedang disiapkan… tunggu sebentar lalu tekan lagi.
        </p>
      )}
      {hint === 'blocked' && (
        <p className="max-w-[92vw] text-center text-[10px] font-semibold text-slate-700" role="status">
          Simpan langsung tidak tersedia di sini.{' '}
          <a href={src} target="_blank" rel="noopener noreferrer" className="underline">
            Buka file
          </a>
          , lalu tekan Bagikan → Simpan.
        </p>
      )}
    </>
  );
}
