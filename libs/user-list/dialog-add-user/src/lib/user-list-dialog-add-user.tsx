import { UsersEntity } from '@react-usermanagement/shared/users';
import { useState } from 'react';
import styles from './user-list-dialog-add-user.module.scss';
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
  onClose: () => void;
  onSubmit: (values: UsersEntity) => void;
  open: boolean;
}

export function UserListDialogAddUser({
  open,
  onClose,
  onSubmit,
}: UserListDialogAddUserProps) {
  const [values, setValues] = useState<any>();

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent sx={{ overflow: 'visible' }}>
        <form onSubmit={(e) => e.preventDefault()}>
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
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key={'lastName'}
              label={'Last Name'}
              name={'lastName'}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key={'email'}
              label={'Email'}
              name={'email'}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key={'role'}
              label={'Role'}
              name={'role'}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserListDialogAddUser;
