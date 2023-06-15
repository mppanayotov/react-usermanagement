import { AccountCircle, Add, Delete, Edit, VpnKey } from '@mui/icons-material';
import {
  Box,
  Chip,
  Fab,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Switch,
  Tooltip,
} from '@mui/material';
import { AppDispatch } from '@react-usermanagement/shared/store';
import {
  UsersEntity,
  fetchUsers,
  newUserTemplate,
  selectAllUsers,
  usersActions,
} from '@react-usermanagement/shared/users';
import { UserListDialogAddUser } from '@react-usermanagement/user-list/dialog-add-user';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './user-list-user-list-page.module.scss';
import { UserListDialogDeleteUser } from '@react-usermanagement/user-list/dialog-delete-user';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserListUserListPageProps {}
export function UserListUserListPage(props: UserListUserListPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUsers);
  const [filter, setFilter] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState<UsersEntity | undefined>(
    undefined
  );
  const [tableData, setTableData] = useState<UsersEntity[]>([]);
  const tableRef = useRef<any>(null);
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    tableRef.current?.setGlobalFilter(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useMemo(() => {
    setTableData(users);
  }, [users]);

  const genId = (): number => {
    return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  };

  const handleOpenDeleteDialog = (deleteUser: UsersEntity) => {
    setDeleteUser(deleteUser);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteDialog = (result: UsersEntity | undefined) => {
    setDeleteModalOpen(false);
    result && dispatch(usersActions.remove(result.id));
  };

  const handleCloseAddDialog = (result: UsersEntity | undefined) => {
    setAddModalOpen(false);
    if (result) {
      const newUser = new newUserTemplate(genId(), result);
      dispatch(usersActions.add(newUser));
    }
  };

  const columns = useMemo<MRT_ColumnDef<UsersEntity>[]>(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName} ${row.email}`,
        header: 'User',
        id: 'username',
        size: 140,
        Cell: ({ cell }) => (
          <span
            className={styles['user-list__user']}
            style={{
              opacity: cell.row.getValue('status') === 'active' ? '1' : '0.5',
              transition: 'opacity .15s ease-in-out',
            }}
          >
            <AccountCircle color="action" />
            {cell.row.original.firstName} {cell.row.original.lastName}
            <br />
            <small>{cell.row.original.email}</small>
          </span>
        ),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 140,
        Cell: ({ cell }) => (
          <span
            className={styles['user-list__role']}
            style={{
              opacity: cell.row.getValue('status') === 'active' ? '1' : '0.5',
              transition: 'opacity .15s ease-in-out',
            }}
          >
            <Chip
              icon={<VpnKey />}
              color={
                cell.row.getValue('status') === 'active' ? 'primary' : 'default'
              }
              className={styles['user-list__admin-chip']}
              sx={{
                display:
                  (cell.row.original.role !== 'admin' && 'none') ||
                  'inline-flex',
              }}
            />
            <span>{cell.row.original.role}</span>
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 140,
        Cell: ({ cell }) => (
          <Switch
            checked={cell.row.getValue('status') === 'active' && true}
            onChange={(event, checked) => {
              const updatedUser: UsersEntity = {
                ...cell.row.original,
                status: checked ? 'active' : 'disabled',
              };
              dispatch(usersActions.update(updatedUser));
            }}
            inputProps={{ role: 'switch' }}
          />
        ),
      },
    ],
    [dispatch]
  );

  return (
    <div className={styles['user-list']}>
      <Paper elevation={8} square>
        <div className="shell">
          <div className={styles['user-list__head']}>
            <Fab color="primary" onClick={() => setAddModalOpen(true)}>
              <Add />
            </Fab>
            <h2>Project Access</h2>
            <FormControl className={styles['user-list__search']}>
              <InputLabel>Type to filter the table</InputLabel>
              <Input
                value={filter}
                onChange={handleFilterChange}
                placeholder="Ex. Mia"
                endAdornment={
                  <InputAdornment sx={{ pointerEvents: 'none' }} position="end">
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
          <MaterialReactTable
            displayColumnDefOptions={{
              'mrt-row-actions': {
                size: 120,
              },
            }}
            columns={columns}
            data={tableData}
            enableEditing
            autoResetPageIndex={false}
            muiTableBodyRowProps={{
              sx: {
                backgroundColor: 'none',
              },
            }}
            muiTablePaperProps={{
              elevation: 0,
              sx: {
                background: 'none',
              },
            }}
            muiTableHeadRowProps={{
              sx: {
                background: 'none',
                boxShadow: 'none',
              },
            }}
            muiTableHeadCellProps={{
              sx: {
                borderBottomWidth: '2px',
              },
            }}
            muiBottomToolbarProps={{
              sx: {
                background: 'none',
                boxShadow: 'none',
              },
            }}
            initialState={{ pagination: { pageIndex: 0, pageSize: 5 } }}
            editingMode="modal"
            enableColumnActions={false}
            tableInstanceRef={tableRef}
            enableFilterMatchHighlighting={false}
            enableTopToolbar={false}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip
                  arrow
                  placement="left"
                  title="Edit"
                  disableFocusListener={
                    row.getValue('status') === 'disabled' && true
                  }
                  sx={{
                    opacity: row.getValue('status') === 'active' ? '1' : '0',
                    pointerEvents:
                      row.getValue('status') === 'active' ? 'default' : 'none',
                    transition: 'opacity .15s ease-in-out',
                  }}
                >
                  <IconButton onClick={() => console.log(row.original)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleOpenDeleteDialog(row.original)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            positionActionsColumn="last"
          />
          <UserListDialogAddUser
            open={addModalOpen}
            onClose={(result) => handleCloseAddDialog(result)}
          />
          <UserListDialogDeleteUser
            open={deleteModalOpen}
            onClose={(result) => handleCloseDeleteDialog(result)}
            deleteUser={deleteUser}
          />
        </div>
      </div>
    </div>
  );
}

export default UserListUserListPage;
