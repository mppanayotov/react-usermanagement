import { UsersEntity } from '@react-usermanagement/shared/users';
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

export interface UserListDialogAddUserProps {
  onClose: (newUser?: UsersEntity) => void;
  open: boolean;
}

export function UserListDialogAddUser({
  open,
  onClose,
}: UserListDialogAddUserProps) {
  const [newUser, setNewUser] = useState<any>();

  const handleSubmit = () => {
    onClose(newUser);
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle textAlign="center">Add User</DialogTitle>
      <DialogContent sx={{ overflow: 'visible' }}>
        <form onSubmit={handleSubmit}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            <TextField
              key={'firstName'}
              label={'First Name'}
              name={'firstName'}
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key={'lastName'}
              label={'Last Name'}
              name={'lastName'}
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key={'email'}
              label={'Email'}
              name={'email'}
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key={'role'}
              label={'Role'}
              name={'role'}
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem', justifyContent: 'space-between' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserListDialogAddUser;
