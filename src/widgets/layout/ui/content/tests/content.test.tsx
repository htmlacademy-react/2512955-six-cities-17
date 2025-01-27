import { Content } from '../content';
import { render, screen } from '@testing-library/react';


describe('Component Content', () => {
  const contentTestId = 'page-layout-content';
  const childrenText = 'Test Paragraph';

  it('should correct render', () => {
    render(
      <Content>
        <p>{childrenText}</p>
      </Content>
    );

    expect(screen.getByTestId(contentTestId)).toBeInTheDocument();
    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });
});
