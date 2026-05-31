import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import Dashboard from '@/components/Dashboard';
import Diary from '@/components/Diary';
import Settings from '@/components/Settings';
import FoodSearch from '@/components/FoodSearch';

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
};

const pageOrder: Record<string, number> = {
  dashboard: 0,
  diary: 1,
  'food-search': 2,
  settings: 3,
};

export default function App() {
  const { state, dispatch } = useApp();

  const handleBack = () => {
    if (state.pageStack.length > 0) {
      dispatch({ type: 'GO_BACK' });
    }
  };

  // Sync page navigation with browser history for back button support
  useEffect(() => {
    if (state.pageStack.length > 0) {
      window.history.pushState({ page: state.currentPage }, '');
    }
  }, [state.currentPage]);

  useEffect(() => {
    const onPopState = () => {
      dispatch({ type: 'GO_BACK' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const dir = pageOrder[state.currentPage] ?? 0;

  const renderPage = () => {
    switch (state.currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'diary': return <Diary />;
      case 'settings': return <Settings />;
      case 'food-search': return <FoodSearch />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={state.darkMode ? 'dark' : ''}>
      <div className="phone-frame bg-surface-bg dark:bg-[#121212] overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={state.currentPage}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
