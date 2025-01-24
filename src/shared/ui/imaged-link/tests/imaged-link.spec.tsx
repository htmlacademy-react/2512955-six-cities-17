import { ImagedLink } from '../imaged-link';
import { render } from '@testing-library/react';
import { withRouter } from '@test-utills/hocs';
import { ComponentProps } from 'react';
import faker from 'faker';
import { To } from 'react-router-dom';

type PickedProps = Pick<Required<ComponentProps<typeof ImagedLink>>, 'linkConfig' | 'alt' | 'src'>

const createLinkPropsMock = (to: To = 'test'): PickedProps => ({
  linkConfig: {
    to,
  },
  src: faker.image.imageUrl(),
  alt: faker.lorem.word(10),
});

describe('Component ImagedLink', () => {
  it('should correct render', () => {
    const linkProps = createLinkPropsMock();

    const screen = render(withRouter(<ImagedLink {...linkProps} />));

    expect(screen.getByAltText(linkProps.alt));
  });
});
