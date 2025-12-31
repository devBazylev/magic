import { lazy, Suspense } from 'react';
import history from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import { ScrollToTop } from '../../utils';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useMedia } from '../../hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = lazy(() => import('../../pages/main/main'));
const Login = lazy(() => import('../../pages/login/login'));
const Favorites = lazy(() => import('../../pages/favorites/favorites'));
const Error = lazy(() => import('../../pages/error/error'));

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <div style={{ fontSize: '1.5rem' }}>Loading...</div>
  </div>
);

function App(): JSX.Element {
  useMedia();
  return (
    <HistoryRouter history={history} basename="/" >
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/">
            <Route index element={<Main />}/>
            <Route path={AppRoute.Login} element={<Login />}/>
            <Route path={AppRoute.Favorites} element={<Favorites />}/>
            <Route path="*" element={<Error />}/>
          </Route>
        </Routes>
      </Suspense>
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
