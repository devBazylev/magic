import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Error from '../../pages/error/error';
import { ScrollToTop } from '../../utils';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import history from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import { useMedia } from '../../hooks';
import Favorites from '../../pages/favorites/favorites';

function App(): JSX.Element {
  useMedia();
  return (
    <HistoryRouter history={history} basename={import.meta.env.BASE_URL} >
      <ScrollToTop />
      <Routes>
        <Route path="/">
          <Route index element={<Main />}/>
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.Favorites} element={<Favorites />}/>
          <Route path="*" element={<Error />}/>
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
