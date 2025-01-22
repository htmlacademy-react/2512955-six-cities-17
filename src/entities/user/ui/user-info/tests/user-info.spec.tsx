import { UserInfo } from '../user-info';
import { ComponentProps } from 'react';
import faker from 'faker';
import { render } from '@testing-library/react';

const createPropsMock = (): Required<ComponentProps<typeof UserInfo>> => ({
  email: faker.internet.email(),
  favoritesCount: faker.datatype.number({max: 10, min: 0})
});

describe('Component UserInfo', () => {
  it('should be render', () => {
    const propsMock = createPropsMock();

    const screen = render(<UserInfo email={propsMock.email} favoritesCount={propsMock.favoritesCount}/>);

    expect(screen.getByText(propsMock.email)).toBeInTheDocument();
    expect(screen.getByText(propsMock.favoritesCount)).toBeInTheDocument();
  });
});
