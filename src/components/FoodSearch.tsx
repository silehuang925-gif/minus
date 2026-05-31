import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import presetFoods from '@/utils/foods';
import type { FoodItem, CustomFood } from '@/types';
import FoodAmountModal from '@/components/FoodAmountModal';
import CustomFoodModal from '@/components/CustomFoodModal';

interface SearchFood {
  name: string;
  caloriesPer100g: number;
  carbsPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  category: string;
  defaultPortion?: number;
  id?: string;
  note?: string;
}

export default function FoodSearch() {
  const { state, dispatch } = useApp();
  const [query, setQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<SearchFood | null>(null);
  const [showCustomFood, setShowCustomFood] = useState(false);

  const allFoods = useMemo((): SearchFood[] => {
    const custom: SearchFood[] = state.customFoods.map((f) => ({
      ...f,
      category: '自定义',
    }));
    return [...presetFoods, ...custom];
  }, [state.customFoods]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allFoods
      .filter((f) => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))
      .slice(0, 30);
  }, [query, allFoods]);

  const frequentFoods = useMemo(() => {
    const freq: Record<string, number> = {};
    state.foodRecords.forEach((r) => {
      freq[r.foodName] = (freq[r.foodName] || 0) + 1;
    });
    const names = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([name]) => name);

    return names
      .map((name) => allFoods.find((f) => f.name === name))
      .filter(Boolean) as SearchFood[];
  }, [state.foodRecords, allFoods]);

  return (
    <div className="flex flex-col min-h-screen safe-top bg-surface-bg dark:bg-[#121212]">
      {/* Header + Search */}
      <div className="bg-white dark:bg-charcoal-800 px-5 pt-3 pb-3 shadow-sm dark:shadow-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'dashboard' })}
            className="w-10 h-10 flex items-center justify-center rounded-full active:scale-90"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="2" strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜一下，比如鸡胸肉"
              className="w-full pl-10 pr-4 py-2.5 bg-charcoal-50 dark:bg-charcoal-700 rounded-btn text-body text-charcoal-900 dark:text-white outline-none focus:bg-charcoal-100 dark:focus:bg-charcoal-600 transition-colors"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Results / Content */}
      <div className="flex-1 px-5 pt-4 pb-8 overflow-y-auto">
        {query.trim() && results.length > 0 && (
          <div>
            <p className="text-label text-charcoal-400 dark:text-charcoal-300 mb-2">搜索结果</p>
            <div className="space-y-1">
              {results.map((food) => (
                <button
                  key={food.name + (food.id || '')}
                  onClick={() => setSelectedFood(food)}
                  className="w-full flex items-center justify-between p-3 bg-white dark:bg-charcoal-700 rounded-card active:scale-[0.98] transition-transform"
                >
                  <div className="text-left">
                    <p className="text-body text-charcoal-800 dark:text-white">{food.name}</p>
                    <p className="text-label-sm text-charcoal-400 dark:text-charcoal-300">{food.caloriesPer100g} kcal/100g · {food.category}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="text-center py-10">
            <p className="text-body text-charcoal-500 dark:text-charcoal-300 mb-2">未找到 "{query}"</p>
            <button
              onClick={() => setShowCustomFood(true)}
              className="text-body text-mint-500 font-medium"
            >
              + 添加自定义食物
            </button>
          </div>
        )}

        {!query.trim() && (
          <>
            {frequentFoods.length > 0 && (
              <div className="mb-6">
                <p className="text-label text-charcoal-400 dark:text-charcoal-300 mb-3">常吃食物</p>
                <div className="grid grid-cols-3 gap-2">
                  {frequentFoods.map((food) => (
                    <button
                      key={food.name}
                      onClick={() => setSelectedFood(food)}
                      className="chip text-center justify-center active:scale-95"
                    >
                      {food.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-label text-charcoal-400 dark:text-charcoal-300 mb-3">食物分类</p>
              {groupByCategory(allFoods).map(([cat, foods]) => (
                <div key={cat} className="mb-4">
                  <p className="text-label-sm text-charcoal-500 dark:text-charcoal-300 mb-2">{cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {foods.slice(0, 8).map((food) => (
                      <button
                        key={food.name}
                        onClick={() => setSelectedFood(food)}
                        className="chip active:scale-95"
                      >
                        {food.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCustomFood(true)}
              className="w-full mt-4 py-3 border-2 border-dashed border-mint-200 rounded-btn text-body text-mint-500 font-medium active:bg-mint-50"
            >
              + 添加自定义食物
            </button>
          </>
        )}
      </div>

      {selectedFood && (
        <FoodAmountModal
          food={selectedFood as any}
          onClose={() => setSelectedFood(null)}
        />
      )}

      {showCustomFood && (
        <CustomFoodModal onClose={() => setShowCustomFood(false)} />
      )}
    </div>
  );
}

function groupByCategory(foods: SearchFood[]): [string, SearchFood[]][] {
  const map: Record<string, SearchFood[]> = {};
  foods.forEach((f) => {
    if (!map[f.category]) map[f.category] = [];
    map[f.category].push(f);
  });
  return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
}
