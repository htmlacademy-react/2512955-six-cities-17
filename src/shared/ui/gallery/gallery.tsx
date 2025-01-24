import { Classed } from '@shared/types';
import type { GalleryItem } from './types';

type ImageGalleryProps = Classed<{
  items: string[];
  renderItem: (item: GalleryItem) => JSX.Element;
}>

export function ImageGallery({className, renderItem, items}: ImageGalleryProps) {
  return (
    <div className={className} data-testid='image-gallery-container'>
      {items.map((current, index) => renderItem({src: current, alt: `Gallery item №${index}`, index}))}
    </div>
  );
}
