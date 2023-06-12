import styles from './user-list-dialog-delete-user.module.scss';

/* eslint-disable-next-line */
export interface UserListDialogDeleteUserProps {}

export function UserListDialogDeleteUser(props: UserListDialogDeleteUserProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UserListDialogDeleteUser!</h1>
    </div>
  );
}

export default UserListDialogDeleteUser;
