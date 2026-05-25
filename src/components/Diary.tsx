import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { getTodayStr } from '@/utils/data';
import type { FoodRecord, MealType } from '@/types';
import FoodDetailModal from '@/components/FoodDetailModal';

const mealTypes: MealType[] = ['早餐', '午餐', '晚餐', '加餐'];

export default function Diary() {
  const { state, dispatch } = useApp();
  const [date, setDate] = useState(getTodayStr());
  const [detailRecord, setDetailRecord] = useState<FoodRecord | null>(null);

  const dateFoods = useMemo(
    () => state.foodRecords.filter((r) => r.date === date),
    [state.foodRecords, date]
  );

  const totalCalories = dateFoods.reduce((s, r) => s + r.calories, 0);

  const byMeal = (type: MealType) => dateFoods.filter((r) => r.mealType === type);

  const changeDate = (delta: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + delta);
    setDate(d.toISOString().split('T')[0]);
  };

  const formatDate = (d: string) => {
    const dt = new Date(d);
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${dt.getMonth() + 1}月${dt.getDate()}日 ${weekDays[dt.getDay()]}`;
  };

  const isToday = date === getTodayStr();

  return (
    <div className="flex flex-col min-h-screen safe-top safe-bottom">
      {/* Header */}
      <div className="flex items-center px-2 pt-4 pb-2">
        <button
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'dashboard' })}
          className="w-10 h-10 flex items-center justify-center rounded-full active:scale-90"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-headline-sm text-charcoal-900 dark:text-white ml-1 flex-1">饮食日记</h1>
      </div>

      {/* Date Navigation */}
      <div className="flex items-center justify-between px-5 py-3">
        <button onClick={() => changeDate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-charcoal-100 active:scale-90">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-body text-charcoal-800 dark:text-charcoal-100 font-medium">{formatDate(date)}</p>
          {!isToday && (
            <button onClick={() => setDate(getTodayStr())} className="text-label-sm text-mint-500 mt-0.5">
              回到今天
            </button>
          )}
        </div>
        <button onClick={() => changeDate(1)} disabled={isToday} className="w-10 h-10 flex items-center justify-center rounded-full bg-charcoal-100 active:scale-90 disabled:opacity-30">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Meal Groups */}
      <div className="flex-1 px-5 space-y-4 overflow-y-auto pb-8">
        {dateFoods.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-charcoal-100 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="2" strokeLinecap="round">
                <path d="M18 8a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8Z" />
                <line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            </div>
            <p className="text-body text-charcoal-500">这天没有饮食记录</p>
          </div>
        ) : (
          mealTypes.map((meal) => {
            const items = byMeal(meal);
            if (items.length === 0) return null;
            return (
              <div key={meal}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-label text-charcoal-500">{meal}</span>
                  <span className="text-label-sm font-din text-charcoal-400">
                    {items.reduce((s, r) => s + r.calories, 0)} kcal
                  </span>
                </div>
                <div className="space-y-1.5">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setDetailRecord(item)}
                      className="w-full card flex items-center justify-between py-3 active:scale-[0.98]"
                    >
                      <div className="text-left">
                        <p className="text-body text-charcoal-800">{item.foodName}</p>
                        <p className="text-label-sm text-charcoal-400">{item.time} · {item.amount}{item.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-body font-din text-charcoal-700">{item.calories}</p>
                        <p className="text-label-sm text-charcoal-400">kcal</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        )}

        {/* Total */}
        {dateFoods.length > 0 && (
          <div className="pt-3 border-t border-surface-dim">
            <div className="flex items-center justify-between">
              <span className="text-body text-charcoal-500">当日总摄入</span>
              <span className="text-headline-sm font-din text-charcoal-900 dark:text-white">{totalCalories} kcal</span>
            </div>
          </div>
        )}
      </div>

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
