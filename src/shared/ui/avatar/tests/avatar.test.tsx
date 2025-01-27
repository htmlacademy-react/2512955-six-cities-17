import { Avatar } from '../avatar';
import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import faker from 'faker';

const createAvatarPropsMock = (): Required<ComponentProps<typeof Avatar>> => ({
  alt: faker.lorem.words(3),
  avatarUrl: faker.internet.avatar(),
  imageSize: {
    height: faker.datatype.number(100),
    width: faker.datatype.number(100)
  },
  isPro: faker.datatype.boolean(),
  type: 'offer',
  description: faker.lorem.sentences(2)
});

describe('Component Avatar', () =>{
  it('should correct render without description', () => {
    const avatarProps = createAvatarPropsMock();

    render(
      <Avatar
        alt={avatarProps.alt}
        avatarUrl={avatarProps.avatarUrl}
        imageSize={avatarProps.imageSize}
        isPro={avatarProps.isPro}
        type={avatarProps.type}
      />
    );

    expect(screen.queryByText(avatarProps.description)).toBeNull();
    expect(screen.getByAltText(avatarProps.alt)).toBeInTheDocument();
  });

  it('should correct render with description', () => {
    const avatarProps = createAvatarPropsMock();

    render(
      <Avatar
        alt={avatarProps.alt}
        avatarUrl={avatarProps.avatarUrl}
        imageSize={avatarProps.imageSize}
        isPro={avatarProps.isPro}
        type={avatarProps.type}
        description={avatarProps.description}
      />
    );

    expect(screen.getByText(avatarProps.description)).toBeInTheDocument();
    expect(screen.getByAltText(avatarProps.alt)).toBeInTheDocument();
  });
});
