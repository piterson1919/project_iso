import { useState } from 'react';
import './App.css';
import RegisterForm from './pages/registerForm';
import Main from './pages/main';
import LoginForm from './pages/loginForm';
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ObservationPages } from './pages/observationPages';
import ObservationForm from './pages/observationsFormPages';
import { Toaster } from "react-hot-toast";
import { MainLayout } from './components/mainLayout';
import { AuthLayout } from './components/authLayout';
import { ListFiles } from "./pages/listMasterPage";
import {DashboardPage} from "./pages/indexPage"
import { Manual } from './pages/helpPage';
import Page from './pages/listUserPage';
import UserForm from './pages/formUser'


function App() {
  const [count, setCount] = useState(0);

  const isElectron = navigator.userAgent.toLowerCase().includes('electron');
  const Router = isElectron ? HashRouter : BrowserRouter;

  return (
    <Router>
      <Routes>

        {/* Layout sin sidebar */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/main" element={<Main />} />
        </Route>

        {/* Layout con sidebar */}
        <Route element={<MainLayout className="content" />}>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/createObservations" element={<ObservationForm />} />
          <Route path="/observations" element={<ObservationPages />} />
          <Route path="/observation/:id" element={<ObservationForm />} />
          <Route path="/listMaster" element={<ListFiles />} />
          <Route path="/index" element={<DashboardPage />} />
          <Route path="/manual" element={<Manual/>} />
          <Route path="/listUser" element={<Page/>} />
          <Route path="/userForm" element={<UserForm/>} />
        </Route>

      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;