import { ImageGallery } from '../gallery';
import faker from 'faker';
import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';

const createImageGalleryPropsMock = (itemTestId: string, maxItemsCount: number): ComponentProps<typeof ImageGallery> => ({
  items: Array.from({length: maxItemsCount}).map(() => faker.image.imageUrl()),
  renderItem: ({alt, src}) => (
    <img src={src} alt={alt} data-testid={itemTestId} />
  ),
  maxItemsCount
});

describe('Component ImageGallery', () => {
  const galleryContainerTestId = 'image-gallery-container';
  const imagesCount = 6;

  it('should correct render by filled items > max items', () => {
    const itemTestId = 'image-gallery-item';
    const largeImagesCount = 9;
    const galleryPropsMock = createImageGalleryPropsMock(itemTestId, largeImagesCount);

    render(
      <ImageGallery
        items={galleryPropsMock.items}
        renderItem={galleryPropsMock.renderItem}
        maxItemsCount={imagesCount}
      />
    );

    expect(screen.getByTestId(galleryContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemTestId).length).toBe(imagesCount);
  });

  it('should correct render by filled items <= max items', () => {
    const itemTestId = 'image-gallery-item';
    const galleryPropsMock = createImageGalleryPropsMock(itemTestId, imagesCount);

    render(
      <ImageGallery
        items={galleryPropsMock.items}
        renderItem={galleryPropsMock.renderItem}
        maxItemsCount={imagesCount}
      />
    );

    expect(screen.getByTestId(galleryContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemTestId).length).toBe(galleryPropsMock.items.length);
  });

  it('should correct render by empty items', () => {
    const itemTestId = 'image-gallery-item';
    const galleryPropsMock = createImageGalleryPropsMock(itemTestId, imagesCount);

    render(
      <ImageGallery
        items={[]}
        renderItem={galleryPropsMock.renderItem}
        maxItemsCount={imagesCount}
      />
    );

    expect(screen.getByTestId(galleryContainerTestId)).toBeInTheDocument();
    expect(screen.queryAllByTestId(itemTestId).length).toBe(0);
  });
});
