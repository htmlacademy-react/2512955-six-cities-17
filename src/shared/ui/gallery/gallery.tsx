import { Classed } from '@shared/types';
import type { GalleryItem } from './types';
const DEFAULT_GALLERY_LENGTH = 6;

type ImageGalleryProps = Classed<{
  items: string[];
  renderItem: (item: GalleryItem) => JSX.Element;
  maxItemsCount?: number;
}>

export function ImageGallery({className, renderItem, items, maxItemsCount = DEFAULT_GALLERY_LENGTH}: ImageGalleryProps) {
  const slicedItems = items.length <= maxItemsCount ? items : items.slice(0, maxItemsCount);

  return (
    <div className={className} data-testid='image-gallery-container'>
      {slicedItems.map((current, index) => renderItem({src: current, alt: `Gallery item №${index}`, index}))}
    </div>
  );
}
