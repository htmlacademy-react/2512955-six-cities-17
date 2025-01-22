import { ImageGallery } from '../gallery';
import faker from 'faker';
import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';

const createImageGalleryPropsMock = (itemTestId: string): ComponentProps<typeof ImageGallery> => ({
  items: [faker.image.imageUrl(), faker.image.imageUrl()],
  renderItem: ({alt, src}) => (
    <img src={src} alt={alt} data-testid={itemTestId} />
  )
});

describe('Component ImageGallery', () => {
  const galleryContainerTestId = 'image-gallery-container';

  it('should correct render by filled items', () => {
    const itemTestId = 'image-gallery-item';
    const galleryPropsMock = createImageGalleryPropsMock(itemTestId);

    render(
      <ImageGallery
        items={galleryPropsMock.items}
        renderItem={galleryPropsMock.renderItem}
      />
    );

    expect(screen.getByTestId(galleryContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemTestId).length).toBe(galleryPropsMock.items.length);
  });

  it('should correct render by empty items', () => {
    const itemTestId = 'image-gallery-item';
    const galleryPropsMock = createImageGalleryPropsMock(itemTestId);

    render(
      <ImageGallery
        items={[]}
        renderItem={galleryPropsMock.renderItem}
      />
    );

    expect(screen.getByTestId(galleryContainerTestId)).toBeInTheDocument();
    expect(screen.queryAllByTestId(itemTestId).length).toBe(0);
  });
});
