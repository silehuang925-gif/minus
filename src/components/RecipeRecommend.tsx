import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { recommendMeal } from '@/utils/recipes';
import type { FoodRecord } from '@/types';
import { generateId, getTodayStr, getNowTimeStr, getTodayStamp } from '@/utils/data';

interface RecResult {
  foods: { food: any; amount: number; calories: number; carbs: number; protein: number; fat: number }[];
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFat: number;
  carbPct: number;
  proteinPct: number;
  fatPct: number;
  targetCal: number;
  exactMatch: boolean;
}

export default function RecipeRecommend({ onClose }: { onClose: () => void }) {
  const { dispatch } = useApp();
  const [targetCal, setTargetCal] = useState('500');
  const [personCount, setPersonCount] = useState(1);
  const [region, setRegion] = useState('all');
  const [result, setResult] = useState<RecResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    const cal = parseInt(targetCal);
    if (isNaN(cal) || cal <= 0) return;
    setLoading(true);
    // Use setTimeout to avoid blocking UI
    setTimeout(() => {
      try {
        const res = recommendMeal(cal, personCount, region);
        setResult(res);
      } catch {
        setResult(null);
      }
      setLoading(false);
    }, 50);
  };

  const handleRecordAll = () => {
    if (!result) return;
    result.foods.forEach((item) => {
      const record: FoodRecord = {
        id: generateId(),
        date: getTodayStr(),
        time: getNowTimeStr(),
        mealType: '晚餐',
        foodName: item.food.name,
        amount: item.amount === 1 ? 150 : item.amount,
        unit: item.amount === 1 ? '份' : '克',
        calories: item.calories,
        carbs: item.carbs,
        protein: item.protein,
        fat: item.fat,
        timestamp: getTodayStamp(),
      };
      dispatch({ type: 'ADD_FOOD_RECORD', payload: record });
    });
    onClose();
  };

  const calError = result ? result.totalCalories - result.targetCal : 0;

  // Small macro ring: SVG arc
  const ringR = 32;
  const ringCirc = 2 * Math.PI * ringR;

  const renderMacroRing = () => {
    if (!result) return null;
    const carbLen = ringCirc * (result.carbPct / 100);
    const proteinLen = ringCirc * (result.proteinPct / 100);
    const fatLen = ringCirc * (result.fatPct / 100);
    const gap = ringCirc - carbLen - proteinLen - fatLen;
    return (
      <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
        <circle cx="40" cy="40" r={ringR} fill="none" stroke="#E5E5EA" strokeWidth="6" />
        <circle cx="40" cy="40" r={ringR} fill="none" stroke="#A7E0C0" strokeWidth="6"
          strokeLinecap="butt" strokeDasharray={`${carbLen} ${ringCirc - carbLen}`} strokeDashoffset={0} />
        <circle cx="40" cy="40" r={ringR} fill="none" stroke="#FF9500" strokeWidth="6"
          strokeLinecap="butt" strokeDasharray={`${proteinLen} ${ringCirc - proteinLen}`}
          strokeDashoffset={-carbLen} />
        <circle cx="40" cy="40" r={ringR} fill="none" stroke="#FF3B30" strokeWidth="6"
          strokeLinecap="butt" strokeDasharray={`${fatLen} ${ringCirc - fatLen}`}
          strokeDashoffset={-(carbLen + proteinLen)} />
      </svg>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet sheet-enter max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-headline-xs text-charcoal-900 dark:text-white">
              {result ? '搭配结果' : '今天想怎么吃？'}
            </h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-100 dark:bg-charcoal-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {!result ? (
            <>
              {/* Calorie input */}
              <div className="mb-5">
                <p className="text-label text-charcoal-400 dark:text-charcoal-300 mb-3">
                  输入你想摄入的目标热量
                </p>
                <div className="flex items-end justify-center gap-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={targetCal}
                    onChange={(e) => setTargetCal(e.target.value)}
                    className="text-center text-[36px] font-din font-bold text-charcoal-900 dark:text-white bg-transparent border-b-2 border-mint-200 w-40 outline-none"
                    autoFocus
                  />
                  <span className="text-body text-charcoal-400 dark:text-charcoal-300 pb-2">千卡</span>
                </div>
              </div>

              {/* Region selector */}
              <div className="mb-5">
                <p className="text-label text-charcoal-400 dark:text-charcoal-300 mb-2">地域偏好</p>
                <div className="flex bg-charcoal-100 dark:bg-charcoal-700 rounded-full p-1">
                  {[
                    { key: 'all', label: '不限' },
                    { key: 'north', label: '北方' },
                    { key: 'south', label: '南方' },
                  ].map((r) => (
                    <button
                      key={r.key}
                      onClick={() => setRegion(r.key)}
                      className={`flex-1 py-2.5 rounded-full text-body-sm font-medium transition-colors ${
                        region === r.key
                          ? 'bg-mint-200 text-charcoal-800 shadow-sm'
                          : 'text-charcoal-500 dark:text-charcoal-400'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Person toggle */}
              <div className="mb-5">
                <p className="text-label text-charcoal-400 dark:text-charcoal-300 mb-2">用餐人数</p>
                <div className="flex bg-charcoal-100 dark:bg-charcoal-700 rounded-full p-1">
                  <button
                    onClick={() => setPersonCount(1)}
                    className={`flex-1 py-2.5 rounded-full text-body-sm font-medium transition-colors ${
                      personCount === 1
                        ? 'bg-mint-200 text-charcoal-800 shadow-sm'
                        : 'text-charcoal-500 dark:text-charcoal-400'
                    }`}
                  >
                    个人
                  </button>
                  <button
                    onClick={() => setPersonCount(2)}
                    className={`flex-1 py-2.5 rounded-full text-body-sm font-medium transition-colors ${
                      personCount === 2
                        ? 'bg-mint-200 text-charcoal-800 shadow-sm'
                        : 'text-charcoal-500 dark:text-charcoal-400'
                    }`}
                  >
                    家庭
                  </button>
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={!targetCal || parseInt(targetCal) <= 0 || loading}
                className={`w-full rounded-btn py-3.5 text-body font-medium transition-all ${
                  targetCal && parseInt(targetCal) > 0 && !loading
                    ? 'bg-mint-200 text-charcoal-800 active:scale-[0.97]'
                    : 'bg-charcoal-100 dark:bg-charcoal-700 text-charcoal-400'
                }`}
              >
                {loading ? '搭配中...' : '帮我搭配'}
              </button>
            </>
          ) : (
            <>
              {/* Accuracy warning */}
              {!result.exactMatch && (
                <div className="mb-4 px-4 py-2.5 bg-alert-orange/10 rounded-card">
                  <p className="text-label-sm text-alert-orange">未找到精确匹配，以下是最接近的搭配</p>
                </div>
              )}

              {/* Top info card */}
              <div className="card mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-label text-charcoal-400 dark:text-charcoal-300">预计摄入</p>
                    <p className="text-headline font-din text-charcoal-900 dark:text-white mt-1">
                      {result.totalCalories}
                      <span className="text-body text-charcoal-400 dark:text-charcoal-300 ml-1">千卡</span>
                    </p>
                    <p className="text-label-sm text-charcoal-400 mt-0.5">
                      目标 {result.targetCal} 千卡，误差 {calError >= 0 ? '+' : ''}{calError} 千卡
                    </p>
                  </div>
                  {/* Macro ring */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    {renderMacroRing()}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[10px] leading-tight">
                      <span className="text-charcoal-500 dark:text-charcoal-300">碳水{result.carbPct}%</span>
                      <span className="text-charcoal-500 dark:text-charcoal-300">蛋白{result.proteinPct}%</span>
                      <span className="text-charcoal-500 dark:text-charcoal-300">脂肪{result.fatPct}%</span>
                    </div>
                  </div>
                </div>
                {/* Macro legend */}
                <div className="flex gap-4 mt-3 pt-3 border-t border-surface-dim dark:border-charcoal-700">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-mint-200" />
                    <span className="text-label-sm text-charcoal-400 dark:text-charcoal-300">碳水 {result.totalCarbs}g</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-alert-orange" />
                    <span className="text-label-sm text-charcoal-400 dark:text-charcoal-300">蛋白 {result.totalProtein}g</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-alert-red" />
                    <span className="text-label-sm text-charcoal-400 dark:text-charcoal-300">脂肪 {result.totalFat}g</span>
                  </div>
                </div>
              </div>

              {/* Food list */}
              <div className="mb-4">
                <p className="text-label text-charcoal-400 dark:text-charcoal-300 mb-2">推荐搭配</p>
                <div className="space-y-1.5">
                  {result.foods.map((item, i) => (
                    <div key={i} className="card flex items-center justify-between py-3">
                      <div>
                        <p className="text-body-sm text-charcoal-800 dark:text-white">{item.food.name}</p>
                        <p className="text-label-sm text-charcoal-400 dark:text-charcoal-300">
                          {item.amount === 1 ? '1份' : `${item.amount}g`} · {item.food.category} · {item.food.cuisine}
                        </p>
                      </div>
                      <span className="text-body font-din text-charcoal-600 dark:text-mint-200">{item.calories} kcal</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  className="flex-1 rounded-btn py-3 text-body font-medium border-2 border-mint-200 text-mint-600 dark:text-mint-300 active:scale-[0.97] transition-transform"
                >
                  再换一换
                </button>
                <button
                  onClick={handleRecordAll}
                  className="flex-1 btn-primary"
                >
                  一键记录
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
