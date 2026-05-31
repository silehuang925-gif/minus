import { useState, useMemo } from 'react';
import { useApp, useDailySummary } from '@/context/AppContext';
import { getTodayStr } from '@/utils/data';
import type { FoodRecord } from '@/types';
import ProgressRing from '@/components/ProgressRing';
import WeightCard from '@/components/WeightCard';
import IntakeSummary from '@/components/IntakeSummary';
import MealPreview from '@/components/MealPreview';
import StreakCard from '@/components/StreakCard';
import CalendarWidget from '@/components/CalendarWidget';
import FabMenu from '@/components/FabMenu';
import WeightModal from '@/components/WeightModal';
import ExerciseModal from '@/components/ExerciseModal';
import FoodDetailModal from '@/components/FoodDetailModal';
import RecipeRecommend from '@/components/RecipeRecommend';

type ModalType = 'weight' | 'exercise' | 'recipe' | null;

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const summary = useDailySummary();
  const today = getTodayStr();
  const [modal, setModal] = useState<ModalType>(null);
  const [detailRecord, setDetailRecord] = useState<FoodRecord | null>(null);

  const dateLabel = useMemo(() => {
    const d = new Date();
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${d.getMonth() + 1}月${d.getDate()}日 ${weekDays[d.getDay()]}`;
  }, []);

  const hasData = state.profile.bmr > 0;
  const hasFoodToday = state.foodRecords.some((r) => r.date === today);
  const hasIntake = summary.intake > 0;

  const closeModal = () => {
    setModal(null);
    dispatch({ type: 'RECALC_SUMMARY' });
  };

  return (
    <div className="flex flex-col min-h-screen safe-top safe-bottom">
      {/* Header - centered */}
      <div className="relative flex items-center justify-center px-5 pt-4 pb-2">
        <div className="text-center">
          <h1 className="text-headline text-mint-500 dark:text-mint-200">Minus</h1>
          <p className="text-body-sm text-charcoal-400 mt-0.5">{dateLabel}</p>
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'settings' })}
          className="absolute right-5 w-10 h-10 flex items-center justify-center rounded-full active:scale-90 transition-transform"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 space-y-6 pb-24">
        <ProgressRing summary={summary} hasData={hasData} />
        <WeightCard onClick={() => setModal('weight')} />
        {hasIntake && <IntakeSummary summary={summary} />}
        <MealPreview
          onItemClick={setDetailRecord}
          onViewDiary={() => dispatch({ type: 'SET_PAGE', payload: 'diary' })}
        />
        <StreakCard />
        <CalendarWidget />
      </div>

      {/* FAB */}
      <FabMenu
        onFood={() => dispatch({ type: 'SET_PAGE', payload: 'food-search' })}
        onWeight={() => setModal('weight')}
        onExercise={() => setModal('exercise')}
        onRecipe={() => setModal('recipe')}
      />

      {/* Modals */}
      {modal === 'weight' && <WeightModal onClose={closeModal} />}
      {modal === 'exercise' && <ExerciseModal onClose={closeModal} />}
      {modal === 'recipe' && <RecipeRecommend onClose={closeModal} />}

      {/* Food Detail Modal */}
      {detailRecord && (
        <FoodDetailModal
          record={detailRecord}
          onClose={() => { setDetailRecord(null); dispatch({ type: 'RECALC_SUMMARY' }); }}
        />
      )}
    </div>
  );
}
