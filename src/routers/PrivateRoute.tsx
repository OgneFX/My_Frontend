import React from "react";
import { Navigate, Outlet } from "react-router";

interface PrivateRouteProps {
  isRegistered: boolean;
}

/**
 * PrivateRoute — обёртка для защищённых маршрутов.
 * Если isRegistered === true -> рендерим Outlet (т.е. вложенные Route)
 * Иначе -> редиректим на /registration
 */
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ isRegistered }) => {
  if (isRegistered) {
    return <Outlet />;
  }

  return <Navigate to='/registration' replace />;
};
