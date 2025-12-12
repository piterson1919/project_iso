import { useState } from 'react';
import './App.css';
import RegisterForm from './pages/registerForm';
import Main from './pages/main';
import LoginForm from './pages/loginForm';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ObservationPages } from './pages/observationPages';
import ObservationForm from './pages/observationsFormPages';
import { Toaster } from "react-hot-toast";
import { MainLayout } from './components/mainLayout';
import { AuthLayout } from './components/authLayout';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticación (sin Navigation) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/main" element={<Main />} />
        </Route>

        {/* Rutas principales (con Navigation dentro de MainLayout) */}
        <Route element={<MainLayout />}>
        
          <Route path="/" element={<Navigate to="/main" />} />
          
          <Route path="/createObservations" element={<ObservationForm />} />
          <Route path="/observations" element={<ObservationPages />} />
          <Route path="/observation/:id" element={<ObservationForm />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;