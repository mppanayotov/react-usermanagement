import { render } from '@testing-library/react';

import UserListUserListPage from './user-list-user-list-page';

describe('UserListUserListPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserListUserListPage />);
    expect(baseElement).toBeTruthy();
  });
});
