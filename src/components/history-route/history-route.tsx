import { useState, useLayoutEffect } from 'react';// useLayoutEffect — для синхронного эффекта после всех изменений DOM
import { Router } from 'react-router-dom';
import type { BrowserHistory } from 'history';//тип из библиотеки history.

// Описываем тип пропсов для компонента HistoryRouter.
// history — обязательный объект истории (создаётся через createBrowserHistory или createMemoryHistory),
// basename — опциональная базовая часть URL,
// children — вложенные компоненты (роуты и т.д.).
export interface HistoryRouterProps {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
}

// Компонент HistoryRouter — обёртка над <Router>, позволяющая использовать
// собственный history-объект, а не стандартный внутри BrowserRouter.
function HistoryRouter({
  basename,
  children,
  history,
}: HistoryRouterProps) {

  // Создаём локальное состояние для хранения текущего location и action.
  // Эти данные будут переданы в <Router>, чтобы он знал, где находится пользователь.
  const [state, setState] = useState({
    action: history.action,// текущее действие (PUSH, REPLACE, POP)
    location: history.location,// текущее местоположение (объект с pathname, search и т.п.)
  });

  // useLayoutEffect запускается синхронно после всех изменений DOM.
  // Мы подписываемся на изменения истории: при переходе по ссылке или изменении адреса
  // вызывается setState, и компонент перерисовывается с новым location и action.
  useLayoutEffect(() => history.listen(setState), [history]);

  // Возвращаем оригинальный компонент <Router> и передаём в него вручную нужные параметры:
  // - location и navigationType берутся из состояния (обновляются при изменении history),
  // - navigator — это сам history (обеспечивает методы push, replace и т.д.),
  // - basename — если указан, используется как префикс для всех путей.
  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;
