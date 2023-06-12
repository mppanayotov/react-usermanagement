import { Delete, Edit, VpnKey } from '@mui/icons-material';
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
  genId,
  newUserTemplate,
  selectAllUsers,
  usersActions,
} from '@react-usermanagement/shared/users';
import { UserListDialogAddUser } from '@react-usermanagement/user-list/dialog-add-user';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './user-list-user-list-page.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserListUserListPageProps {}
export function UserListUserListPage(props: UserListUserListPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUsers);
  const [filter, setFilter] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
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

  const handleCreateNewRow = (values: UsersEntity) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleDeleteRow = (row: MRT_Row<UsersEntity>) => {
    if (!confirm(`Are you sure you want to delete ${row.original.firstName}`)) {
      return;
    }
    dispatch(usersActions.remove(row.original.id));
  };

  const columns = useMemo<MRT_ColumnDef<UsersEntity>[]>(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName} ${row.email}`,
        header: 'Username',
        id: 'username',
        size: 140,
        Cell: ({ cell }) => (
          <span>
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
          <span className={styles['user-list__role']}>
            <Chip
              icon={<VpnKey />}
              color="primary"
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
              // handleStatusChange(cell.row.original, checked);
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
            <Fab color="primary" onClick={() => setCreateModalOpen(true)}>
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
            muiBottomToolbarProps={{
              sx: {
                background: 'none',
              },
            }}
            editingMode="modal"
            enableColumnActions={false}
            tableInstanceRef={tableRef}
            enableFilterMatchHighlighting={false}
            enableTopToolbar={false}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => console.log(row.original)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            positionActionsColumn="last"
          />
          <UserListDialogAddUser
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
          />
        </div>
      </div>
    </div>
  );
}

export default UserListUserListPage;
