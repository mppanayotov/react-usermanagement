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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
  const [role, setRole] = useState<any>();
  const handleSubmit = () => {
    onClose(newUser);
    setRole('');
  };
  const handleClose = () => {
    onClose();
    setRole('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle textAlign="center">Add User</DialogTitle>
      <DialogContent sx={{ overflow: 'visible' }}>
        <form onSubmit={handleSubmit}>
          <Stack
            flexWrap={'wrap'}
            flexDirection={'row'}
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            <TextField
              required
              key={'firstName'}
              label={'First Name'}
              name={'firstName'}
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
              sx={{
                width: 'calc(50% - .75rem)',
              }}
            />
            <TextField
              required
              key={'lastName'}
              label={'Last Name'}
              name={'lastName'}
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
              sx={{
                width: 'calc(50% - 0.75rem)',
              }}
            />
            <TextField
              required
              fullWidth
              key={'email'}
              label={'Email'}
              name={'email'}
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
            />
            <FormControl fullWidth required>
              <InputLabel id="user-role-label">Role</InputLabel>
              <Select
                labelId="user-role-label"
                id="user-role"
                value={role}
                name={'role'}
                label="Role"
                onChange={(e) => {
                  setRole(e.target.value);
                  setNewUser({ ...newUser, [e.target.name]: e.target.value });
                }}
              >
                <MenuItem value={'user'}>user</MenuItem>
                <MenuItem value={'admin'}>admin</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem', justifyContent: 'space-between' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserListDialogAddUser;
