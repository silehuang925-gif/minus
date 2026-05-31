import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { getTodayStr } from '@/utils/data';
import type { MealType, FoodRecord } from '@/types';

interface Props {
  onItemClick: (record: FoodRecord) => void;
  onViewDiary: () => void;
}

const mealLabels: MealType[] = ['早餐', '午餐', '晚餐', '加餐'];

export default function MealPreview({ onItemClick, onViewDiary }: Props) {
  const { state, dispatch } = useApp();
  const today = getTodayStr();
  const todayFoods = state.foodRecords.filter((r) => r.date === today);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const batchDelete = () => {
    selected.forEach((id) => dispatch({ type: 'DELETE_FOOD_RECORD', payload: id }));
    setSelected(new Set());
    setSelectMode(false);
  };

  const byMeal = (type: MealType) => todayFoods.filter((r) => r.mealType === type);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <p className="text-label text-charcoal-400 uppercase tracking-wider">今日饮食</p>
        <div className="flex items-center gap-3">
          {todayFoods.length > 0 && (
            <button
              onClick={() => { setSelectMode(!selectMode); setSelected(new Set()); }}
              className="text-label-sm text-charcoal-400 active:text-charcoal-600"
            >
              {selectMode ? '取消' : '多选'}
            </button>
          )}
          <button
            onClick={onViewDiary}
            className="text-label-sm text-mint-500 active:text-mint-600"
          >
            查看完整饮食日记 &gt;
          </button>
        </div>
      </div>
      {selectMode && selected.size > 0 && (
        <button
          onClick={batchDelete}
          className="w-full mb-2 py-2 bg-alert-red/10 text-alert-red text-label-sm font-medium rounded-btn active:scale-[0.97]"
        >
          删除选中 ({selected.size})
        </button>
      )}
      {mealLabels.map((meal) => {
        const items = byMeal(meal);
        if (items.length === 0) return null;
        return (
          <div key={meal} className="mb-2 last:mb-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-label-sm text-charcoal-500">{meal}</span>
              <span className="text-label-sm font-din text-charcoal-400 dark:text-mint-200">
                {items.reduce((s, r) => s + r.calories, 0)} kcal
              </span>
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                className="w-full flex items-center justify-between py-1.5 pl-2 border-l-2 border-mint-200 rounded-r"
              >
                {selectMode && (
                  <button
                    onClick={() => toggle(item.id)}
                    className={`w-5 h-5 rounded border-2 mr-2 flex-shrink-0 flex items-center justify-center ${
                      selected.has(item.id) ? 'bg-mint-200 border-mint-200' : 'border-charcoal-300'
                    }`}
                  >
                    {selected.has(item.id) && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                    )}
                  </button>
                )}
                <button
                  onClick={() => selectMode ? toggle(item.id) : onItemClick(item)}
                  className="flex-1 flex items-center justify-between active:bg-charcoal-50 rounded-r"
                >
                  <div className="text-left">
                    <p className="text-body-sm text-charcoal-800 dark:text-charcoal-100">{item.foodName}</p>
                    <p className="text-label-sm text-charcoal-400">{item.time}</p>
                  </div>
                  <span className="text-body-sm font-din text-charcoal-600 dark:text-mint-200">{item.calories} kcal</span>
                </button>
              </div>
            ))}
          </div>
        );
      })}
      {todayFoods.length === 0 && (
        <p className="text-body-sm text-charcoal-400 py-2">今天还没有记录饮食</p>
      )}
    </div>
  );
}
