import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { UsersEntity } from '@react-usermanagement/shared/users';

export interface UserListDialogDeleteUserProps {
  onClose: (deleteUser?: UsersEntity) => void;
  open: boolean;
  deleteUser: UsersEntity | undefined;
}

export function UserListDialogDeleteUser({
  open,
  deleteUser,
  onClose,
}: UserListDialogDeleteUserProps) {
  const handleClose = () => {
    onClose();
  };
  const handleDelete = () => {
    onClose(deleteUser);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle textAlign="center">Delete User</DialogTitle>
      <DialogContent>
        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          sx={{
            width: '100%',
            minWidth: { xs: '300px', sm: '360px', md: '400px' },
            gap: '1.5rem',
          }}
        >
          <Box>
            {deleteUser?.firstName} {deleteUser?.lastName}
          </Box>
          <Box flex={'0 0 auto'} textTransform={'capitalize'}>
            <strong>{deleteUser?.status} User</strong>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem', justifyContent: 'space-between' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="error" onClick={handleDelete} variant="contained">
          Delete user
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserListDialogDeleteUser;
