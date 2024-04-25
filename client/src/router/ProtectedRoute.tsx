import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isAuth: boolean;
  redirectTo: string;
};

export default function ProtectedRoute({ isAuth, redirectTo }: Props) {
  if (isAuth) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
}
