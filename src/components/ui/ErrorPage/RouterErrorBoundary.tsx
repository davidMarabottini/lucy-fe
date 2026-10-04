import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import ErrorPage from './ErrorPage';

// Route non trovata -> 404, qualsiasi altro errore di rendering/loader -> 500
const RouterErrorBoundary = () => {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return <ErrorPage code={isNotFound ? 404 : 500} />;
};

export default RouterErrorBoundary;
