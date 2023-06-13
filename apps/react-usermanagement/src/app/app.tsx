import { store } from '@react-usermanagement/shared/store';
import { UserListUserListPage } from '@react-usermanagement/user-list/user-list-page';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';

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
