import { Layout } from '../layout';
import { render, screen } from '@testing-library/react';


describe('Component Layout', () => {
  const layoutTestId = 'page-layout';
  const childrenText = 'Test Paragraph';

  it('should correct render', () => {
    render(
      <Layout>
        <p>{childrenText}</p>
      </Layout>
    );

    expect(screen.getByTestId(layoutTestId)).toBeInTheDocument();
    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });
});
