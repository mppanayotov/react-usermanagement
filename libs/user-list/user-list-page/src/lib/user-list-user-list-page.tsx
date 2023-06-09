import styles from './user-list-user-list-page.module.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@react-usermanagement/shared/store';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Fab,
  IconButton,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Icon,
  Button,
} from '@mui/material';
import {
  selectAllUsers,
  usersActions,
  fetchUsers,
} from '@react-usermanagement/shared/users';
import {
  genId,
  UsersEntity,
  newUserTemplate,
} from '@react-usermanagement/shared/users';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserListUserListPageProps {}
export function UserListUserListPage(props: UserListUserListPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUsers);
  const [filter, setFilter] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersEntity | null>(null);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleStatusChange = (
    row: UsersEntity,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedUser: UsersEntity = {
      ...row,
      status: event.target.checked ? 'active' : 'disabled',
    };
    dispatch(usersActions.update(updatedUser));
  };

  const handleAddDialogClose = (result: UsersEntity | null) => {
    setOpenAddDialog(false);
    if (result) {
      const newUser = new newUserTemplate(genId(), result);
      dispatch(usersActions.add(newUser));
    }
  };

  const handleDeleteDialogClose = (result: UsersEntity | null) => {
    setOpenDeleteDialog(false);
    if (result) {
      dispatch(usersActions.remove(result.id));
    }
  };

  // useEffect(() => {}, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className={styles['user-list']}>
      <Paper elevation={8} square>
        <div className="shell">
          <div className={styles['user-list__head']}>
            <Fab color="primary" onClick={() => setOpenAddDialog(true)}>
              <Icon>add</Icon>
            </Fab>
            <h2>Project Access</h2>
            <FormControl className={styles['user-list__search']}>
              <InputLabel>Type to filter the table</InputLabel>
              <Input
                value={filter}
                onChange={handleFilterChange}
                placeholder="Ex. Mia"
                endAdornment={
                  <InputAdornment position="end">
                    <Icon>search</Icon>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </div>
      </Paper>
      <div className={styles['user-list__body']}>
        <div className="shell">
          <TableContainer>
            <Table
              className={styles['user-list__table']}
              aria-label="User list"
            >
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter((row) =>
                    row.firstName.toLowerCase().includes(filter.toLowerCase())
                  )
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        className={styles['user-list__user']}
                        style={{ opacity: row.status === 'disabled' ? 0.5 : 1 }}
                      >
                        {row.firstName} {row.lastName}
                        <br />
                        <span className="user__email">{row.email}</span>
                        <div className={styles['user-list__avatar']}>
                          <Icon>account_circle</Icon>
                        </div>
                      </TableCell>
                      <TableCell
                        className={styles['user-list__role']}
                        style={{ opacity: row.status === 'disabled' ? 0.5 : 1 }}
                      >
                        {row.role}
                        {row.role === 'admin' && (
                          <Icon className={styles['user-list__admin-chip']}>
                            vpn_key
                          </Icon>
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={row.status === 'active'}
                          onChange={(event) => handleStatusChange(row, event)}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          disabled={row.status === 'disabled'}
                          onClick={() => setOpenAddDialog(true)}
                          style={{ opacity: row.status === 'disabled' ? 0 : 1 }}
                        >
                          <Icon>settings</Icon>
                        </IconButton>
                        <IconButton
                          color="warning"
                          onClick={() => setOpenDeleteDialog(true)}
                        >
                          <Icon>delete</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog
            open={openAddDialog}
            onClose={() => handleAddDialogClose(null)}
          >
            <DialogTitle>Add User Dialog</DialogTitle>
            <DialogContent>{/* Add user form or content */}</DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => handleAddDialogClose(null)}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => handleAddDialogClose(null)}
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openDeleteDialog}
            onClose={() => handleDeleteDialogClose(null)}
          >
            <DialogTitle>Delete User Dialog</DialogTitle>
            <DialogContent>
              {/* Delete user confirmation message */}
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => handleDeleteDialogClose(null)}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => handleDeleteDialogClose(null)}
                color="secondary"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default UserListUserListPage;
