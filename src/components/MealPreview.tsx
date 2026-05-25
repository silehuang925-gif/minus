import { useApp } from '@/context/AppContext';
import { getTodayStr } from '@/utils/data';
import type { MealType, FoodRecord } from '@/types';

interface Props {
  onItemClick: (record: FoodRecord) => void;
  onViewDiary: () => void;
}

const mealLabels: MealType[] = ['早餐', '午餐', '晚餐', '加餐'];

export default function MealPreview({ onItemClick, onViewDiary }: Props) {
  const { state } = useApp();
  const today = getTodayStr();
  const todayFoods = state.foodRecords.filter((r) => r.date === today);

  const byMeal = (type: MealType) => todayFoods.filter((r) => r.mealType === type);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <p className="text-label text-charcoal-400 uppercase tracking-wider">今日饮食</p>
        <button
          onClick={onViewDiary}
          className="text-label-sm text-mint-500 active:text-mint-600"
        >
          查看完整饮食日记 &gt;
        </button>
      </div>
      {mealLabels.map((meal) => {
        const items = byMeal(meal);
        if (items.length === 0) return null;
        return (
          <div key={meal} className="mb-2 last:mb-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-label-sm text-charcoal-500">{meal}</span>
              <span className="text-label-sm font-din text-charcoal-400">
                {items.reduce((s, r) => s + r.calories, 0)} kcal
              </span>
            </div>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick(item)}
                className="w-full flex items-center justify-between py-1.5 pl-2 border-l-2 border-mint-200 active:bg-charcoal-50 rounded-r"
              >
                <div className="text-left">
                  <p className="text-body-sm text-charcoal-800 dark:text-charcoal-100">{item.foodName}</p>
                  <p className="text-label-sm text-charcoal-400">{item.time}</p>
                </div>
                <span className="text-body-sm font-din text-charcoal-600">{item.calories} kcal</span>
              </button>
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
