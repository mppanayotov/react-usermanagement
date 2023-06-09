// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import '@react-usermanagement/shared/styles';

import { Route, Routes } from 'react-router-dom';
import { UserListUserListPage } from '@react-usermanagement/user-list/user-list-page';
import { store } from '@react-usermanagement/shared/store';
import { Provider } from 'react-redux';

export function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<UserListUserListPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
