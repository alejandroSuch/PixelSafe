import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { ImageFile } from '../types/image.types';
import { getOutputFilename } from '../utils/file.utils';

export function downloadSingle(image: ImageFile): void {
  if (!image.result) return;
  const filename = getOutputFilename(image.original.name, image.result.format);
  saveAs(image.result.blob, filename);
}

export async function downloadAllAsZip(images: ImageFile[]): Promise<void> {
  const done = images.filter((img) => img.status === 'done' && img.result);
  if (done.length === 0) return;

  const zip = new JSZip();
  const usedNames = new Set<string>();

  for (const img of done) {
    let name = getOutputFilename(img.original.name, img.result!.format);
    if (usedNames.has(name)) {
      const base = name.replace(/\.[^.]+$/, '');
      const ext = name.split('.').pop();
      name = `${base}_${img.id.slice(0, 4)}.${ext}`;
    }
    usedNames.add(name);
    zip.file(name, img.result!.blob);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'pixelsafe-images.zip');
}
