import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PrebuiltVideoDownload({ src, fileName }: { src: string; fileName: string }) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | undefined;
    setBlobUrl(null);
    fetch(src).then((response) => {
      if (!response.ok) throw new Error('Video tidak tersedia');
      return response.blob();
    }).then((blob) => {
      if (cancelled) return;
      objectUrl = URL.createObjectURL(new Blob([blob], { type: 'video/mp4' }));
      setBlobUrl(objectUrl);
    }).catch(() => {});
    return () => {
      cancelled = true;
      const previousUrl = objectUrl;
      if (previousUrl) window.setTimeout(() => URL.revokeObjectURL(previousUrl), 30_000);
    };
  }, [src]);
  return (
    <Button asChild size="sm">
      <a href={blobUrl ?? src} download={fileName} data-ready={Boolean(blobUrl)}>
        <Download aria-hidden="true" size={16} /> Download video · MP4
      </a>
    </Button>
  );
}