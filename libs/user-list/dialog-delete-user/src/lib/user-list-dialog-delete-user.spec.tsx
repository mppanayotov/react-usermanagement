import { render } from '@testing-library/react';

import UserListDialogDeleteUser from './user-list-dialog-delete-user';

describe('UserListDialogDeleteUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserListDialogDeleteUser />);
    expect(baseElement).toBeTruthy();
  });
});
