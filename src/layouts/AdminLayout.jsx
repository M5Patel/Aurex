import { Navigate, Outlet } from 'react-router-dom';

const AUTH_KEY = 'aurex-session';

export default function AdminLayout() {
  const session = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
  const isLoggedIn = session?.loggedIn;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: '/admin' }} />;
  }

  return <Outlet />;
}
