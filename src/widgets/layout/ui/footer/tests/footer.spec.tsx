import { Footer } from '../footer';
import { withRouter } from '@test-utills/hocs';
import { render } from '@testing-library/react';

describe('Component Footer', () => {
  const testParagraphText = 'Test children paragraph';
  it('should correct render', () => {
    const component = withRouter(<Footer><p>{testParagraphText}</p></Footer>);

    const screen = render(component);

    expect(screen.getByText(testParagraphText)).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo'));
  });
});
