import { Download } from 'lucide-react';
import { PrebuiltFileDownload } from './PrebuiltFileDownload';

/** Download button for a prebuilt PNG (see PrebuiltFileDownload for iPad/iPhone handling). */
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
  return (
    <PrebuiltFileDownload src={src} fileName={fileName} className={className}>
      <Download className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </PrebuiltFileDownload>
  );
}
