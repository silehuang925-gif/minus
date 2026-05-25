import { useApp } from '@/context/AppContext';
import Dashboard from '@/components/Dashboard';
import Diary from '@/components/Diary';
import Settings from '@/components/Settings';
import FoodSearch from '@/components/FoodSearch';

export default function App() {
  const { state } = useApp();

  const renderPage = () => {
    switch (state.currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'diary':
        return <Diary />;
      case 'settings':
        return <Settings />;
      case 'food-search':
        return <FoodSearch />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={state.darkMode ? 'dark' : ''}>
      <div className="phone-frame bg-surface-bg dark:bg-charcoal-900">
        {renderPage()}
      </div>
    </div>
  );
}
