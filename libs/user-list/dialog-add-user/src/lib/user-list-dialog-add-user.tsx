import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  DialogActions,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Box,
} from '@mui/material';
import styles from './user-list-dialog-add-user.module.scss';

export interface UserListDialogAddUserProps {
  onClose: (newUser?: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }) => void;
  open: boolean;
}

export function UserListDialogAddUser({
  open,
  onClose,
}: UserListDialogAddUserProps) {
  interface IFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }
  const { handleSubmit, control, formState, reset, getValues } =
    useForm<IFormInputs>({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
      },
      mode: 'all',
    });
  const onSubmit = () => {
    onClose(getValues());
    reset();
  };
  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={styles['user-list-dialog-add-user']}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle textAlign="center">Add User</DialogTitle>
        <DialogContent sx={{ overflow: 'visible' }}>
          <Stack
            flexWrap={'wrap'}
            flexDirection={'row'}
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            <Box sx={{ position: 'relative', width: 'calc(50% - .75rem)' }}>
              <Controller
                name="firstName"
                key={'firstName'}
                control={control}
                rules={{ required: '* This field is required' }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <TextField
                    fullWidth
                    required
                    type="text"
                    label={'First Name'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={formState.errors.firstName ? true : false}
                    helperText={
                      <ErrorMessage
                        errors={formState.errors}
                        name="firstName"
                        render={({ message }) => <small>{message}</small>}
                      />
                    }
                  />
                )}
              />
            </Box>
            <Box sx={{ position: 'relative', width: 'calc(50% - .75rem)' }}>
              <Controller
                name="lastName"
                key={'lastName'}
                control={control}
                rules={{ required: '* This field is required' }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <TextField
                    fullWidth
                    required
                    type="text"
                    label={'Last Name'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={formState.errors.lastName ? true : false}
                    helperText={
                      <ErrorMessage
                        errors={formState.errors}
                        name="lastName"
                        render={({ message }) => <small>{message}</small>}
                      />
                    }
                  />
                )}
              />
            </Box>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Controller
                name="email"
                key={'email'}
                control={control}
                rules={{
                  required: '* Please enter a valid email',
                  pattern: /^\S+@\S+$/i,
                }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <TextField
                    required
                    fullWidth
                    type="text"
                    label={'Email'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={formState.errors.email ? true : false}
                    helperText={
                      <ErrorMessage
                        errors={formState.errors}
                        name="email"
                        render={() => (
                          <small>* Please enter a valid email</small>
                        )}
                      />
                    }
                  />
                )}
              />
            </Box>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Controller
                name="role"
                key={'role'}
                control={control}
                rules={{ required: '* This field is required' }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <FormControl
                    fullWidth
                    required
                    error={formState.errors.role ? true : false}
                  >
                    <InputLabel id="user-role-label">Role</InputLabel>
                    <Select
                      required
                      fullWidth
                      labelId="user-role-label"
                      label="Role"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    >
                      <MenuItem value={'user'}>user</MenuItem>
                      <MenuItem value={'admin'}>admin</MenuItem>
                    </Select>
                    <ErrorMessage
                      errors={formState.errors}
                      name="role"
                      render={({ message }) => (
                        <small style={{ marginTop: '5px', color: '#d32f2f' }}>
                          {message}
                        </small>
                      )}
                    />
                  </FormControl>
                )}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem', justifyContent: 'space-between' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="secondary"
            type="submit"
            variant="contained"
            disabled={!formState.isValid}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UserListDialogAddUser;
