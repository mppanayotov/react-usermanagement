import { fetchUsers, usersAdapter, usersReducer } from './users.slice';

describe('users reducer', () => {
  it('should handle initial state', () => {
    const expected = usersAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(usersReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchUsers', () => {
    let state = usersReducer(undefined, fetchUsers.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = usersReducer(state, fetchUsers.fulfilled([{ id: 1 }], ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );

    state = usersReducer(state, fetchUsers.rejected(new Error('Uh oh'), ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );
  });
});
