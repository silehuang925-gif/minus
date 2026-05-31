import { useState, useMemo, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { getTodayStr } from '@/utils/data';
import type { FoodRecord, MealType } from '@/types';
import FoodDetailModal from '@/components/FoodDetailModal';

const mealTypes: MealType[] = ['早餐', '午餐', '晚餐', '加餐'];

export default function Diary() {
  const { state, dispatch } = useApp();
  const [date, setDate] = useState(getTodayStr());
  const [detailRecord, setDetailRecord] = useState<FoodRecord | null>(null);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (state.diaryDate) {
      setDate(state.diaryDate);
      dispatch({ type: 'SET_DIARY_DATE', payload: null });
    }
  }, [state.diaryDate]);

  const dateFoods = useMemo(
    () => state.foodRecords.filter((r) => r.date === date),
    [state.foodRecords, date]
  );

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const batchDelete = () => {
    selected.forEach((id) => dispatch({ type: 'DELETE_FOOD_RECORD', payload: id }));
    setSelected(new Set());
    setSelectMode(false);
  };

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
        {dateFoods.length > 0 && (
          <button
            onClick={() => { setSelectMode(!selectMode); setSelected(new Set()); }}
            className="text-label-sm text-charcoal-400 px-3 active:text-charcoal-600"
          >
            {selectMode ? '取消' : '多选'}
          </button>
        )}
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
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'food-search' })}
              className="w-12 h-12 rounded-lg bg-mint-200 flex items-center justify-center mx-auto mb-4 active:scale-90 transition-transform"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <p className="text-body text-charcoal-400">这天没有饮食记录</p>
          </div>
        ) : (
          <>
            {selectMode && selected.size > 0 && (
              <button
                onClick={batchDelete}
                className="w-full py-2 bg-alert-red/10 text-alert-red text-label-sm font-medium rounded-btn active:scale-[0.97]"
              >
                删除选中 ({selected.size})
              </button>
            )}
            {mealTypes.map((meal) => {
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
                    <div key={item.id} className="card flex items-center justify-between py-3 active:scale-[0.98]">
                      {selectMode && (
                        <button
                          onClick={() => toggleSelect(item.id)}
                          className={`w-5 h-5 rounded border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
                            selected.has(item.id) ? 'bg-mint-200 border-mint-200' : 'border-charcoal-300'
                          }`}
                        >
                          {selected.has(item.id) && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                          )}
                        </button>
                      )}
                      <button
                        onClick={() => selectMode ? toggleSelect(item.id) : setDetailRecord(item)}
                        className="flex-1 flex items-center justify-between"
                      >
                        <div className="text-left">
                          <p className="text-body text-charcoal-800 dark:text-white">{item.foodName}</p>
                          <p className="text-label-sm text-charcoal-400 dark:text-charcoal-300">{item.time} · {item.amount}{item.unit}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-body font-din text-charcoal-700 dark:text-mint-200">{item.calories}</p>
                          <p className="text-label-sm text-charcoal-400 dark:text-charcoal-300">kcal</p>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          </>
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
