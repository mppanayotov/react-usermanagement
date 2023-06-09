import { render } from '@testing-library/react';

import SharedStyles from './shared-styles';

describe('SharedStyles', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedStyles />);
    expect(baseElement).toBeTruthy();
  });
});
