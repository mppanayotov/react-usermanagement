import { render } from '@testing-library/react';

import UserListDialogAddUser from './user-list-dialog-add-user';

describe('UserListDialogAddUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserListDialogAddUser />);
    expect(baseElement).toBeTruthy();
  });
});
