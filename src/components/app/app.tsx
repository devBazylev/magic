import history from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import { MemoizedMain } from '../../pages/main/main';
import { MemoizedLogin } from '../../pages/login/login';
import { MemoizedError } from '../../pages/error/error';
import { ScrollToTop } from '../../utils';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useMedia } from '../../hooks';
import { MemoizedFavorites } from '../../pages/favorites/favorites';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  useMedia();
  return (
    <HistoryRouter history={history} basename={import.meta.env.BASE_URL} >
      <ScrollToTop />
      <Routes>
        <Route path="/">
          <Route index element={<MemoizedMain />}/>
          <Route path={AppRoute.Login} element={<MemoizedLogin />}/>
          <Route path={AppRoute.Favorites} element={<MemoizedFavorites />}/>
          <Route path="*" element={<MemoizedError />}/>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </HistoryRouter>
  );
}

export default App;
