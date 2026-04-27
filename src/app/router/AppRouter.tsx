import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { LoginPage } from '../../pages/login/LoginPage';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { ProfilPage } from '../../pages/profil/ProfilPage';
import { MoliyaPage } from '../../pages/moliya/MoliyaPage';
import { NotificationsPage } from '../../pages/notifications/NotificationsPage';
import { CreateLeadsPage } from '../../pages/create-leads/CreateLeadsPage';

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/moliya"
          element={
            <PrivateRoute>
              <MoliyaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <ProfilPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <PrivateRoute>
              <NotificationsPage />
            </PrivateRoute>
          }
        />
        <Route path="/create-leads" element={<CreateLeadsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
