import { Navigation } from '../components/Navigation';
import { Navigation_superior } from '../components/navigation_supirior';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="app-layout">
      <Navigation_superior />
      <Navigation />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}