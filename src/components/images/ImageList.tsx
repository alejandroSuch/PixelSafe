import { useImages } from '../../context/ImageContext';
import { ImageCard } from './ImageCard';

export function ImageList() {
  const { images } = useImages();

  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((img) => (
        <ImageCard key={img.id} image={img} />
      ))}
    </div>
  );
}
