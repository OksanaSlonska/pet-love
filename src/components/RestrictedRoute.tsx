import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

interface RestrictedRouteProps {
  component: React.ReactElement;
  redirectTo?: string;
}

/**
 * RestrictedRoute - если юзер УЖЕ залогинен, 
 * он перенаправляет его (обычно в /profile).
 * Если НЕ залогинен - показывает компонент (логин/регистрацию).
 */
export const RestrictedRoute = ({ 
  component: Component, 
  redirectTo = '/' 
}: RestrictedRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};