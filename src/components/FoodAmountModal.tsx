import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { generateId, getTodayStr, getNowTimeStr, getTodayStamp } from '@/utils/data';
import type { MealType, FoodRecord } from '@/types';

interface FoodData {
  name: string;
  caloriesPer100g: number;
  carbsPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  defaultPortion?: number;
}

interface Props {
  food: FoodData;
  onClose: () => void;
  editRecord?: FoodRecord;
}

const mealTypes: MealType[] = ['早餐', '午餐', '晚餐', '加餐'];

export default function FoodAmountModal({ food, onClose, editRecord }: Props) {
  const { dispatch } = useApp();
  const [amount, setAmount] = useState(editRecord?.amount || food.defaultPortion || 100);
  const [unit, setUnit] = useState<'克' | '份'>(editRecord?.unit || '克');
  const [mealType, setMealType] = useState<MealType>(editRecord?.mealType || getDefaultMeal());
  const isEdit = !!editRecord;

  const calsPer100g = food.caloriesPer100g;
  const carbsPer100g = food.carbsPer100g;
  const proteinPer100g = food.proteinPer100g;
  const fatPer100g = food.fatPer100g;

  const calories = Math.round((calsPer100g / 100) * amount);
  const carbs = Math.round((carbsPer100g / 100) * amount * 10) / 10;
  const protein = Math.round((proteinPer100g / 100) * amount * 10) / 10;
  const fat = Math.round((fatPer100g / 100) * amount * 10) / 10;

  const handleSave = () => {
    if (isEdit) {
      dispatch({
        type: 'UPDATE_FOOD_RECORD',
        payload: {
          id: editRecord.id,
          updates: {
            foodName: food.name,
            amount,
            unit,
            mealType,
            calories,
            carbs,
            protein,
            fat,
            time: getNowTimeStr(),
          },
        },
      });
    } else {
      const record: FoodRecord = {
        id: generateId(),
        date: getTodayStr(),
        time: getNowTimeStr(),
        mealType,
        foodName: food.name,
        amount,
        unit,
        calories,
        carbs,
        protein,
        fat,
        timestamp: getTodayStamp(),
      };
      dispatch({ type: 'ADD_FOOD_RECORD', payload: record });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet sheet-enter" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-headline-xs text-charcoal-900">{food.name}</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Amount selector */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAmount(Math.max(10, amount - 10))}
                className="w-10 h-10 rounded-full bg-charcoal-100 flex items-center justify-center text-charcoal-600 text-xl active:scale-90"
              >
                -
              </button>
              <input
                type="number"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-20 text-center text-headline font-din text-charcoal-900 bg-transparent border-b-2 border-mint-200 outline-none"
                step={10}
              />
              <button
                onClick={() => setAmount(amount + 10)}
                className="w-10 h-10 rounded-full bg-charcoal-100 flex items-center justify-center text-charcoal-600 text-xl active:scale-90"
              >
                +
              </button>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setUnit('克')}
                className={`px-3 py-1.5 rounded-full text-label-sm ${unit === '克' ? 'bg-mint-200 text-charcoal-700' : 'bg-charcoal-100 text-charcoal-500'}`}
              >
                克
              </button>
              <button
                onClick={() => setUnit('份')}
                className={`px-3 py-1.5 rounded-full text-label-sm ${unit === '份' ? 'bg-mint-200 text-charcoal-700' : 'bg-charcoal-100 text-charcoal-500'}`}
              >
                份
              </button>
            </div>
          </div>

          {/* Nutrition info */}
          <div className="p-4 bg-mint-50 rounded-card mb-4">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-headline font-din text-mint-600">{calories}</span>
              <span className="text-label-sm text-charcoal-500">千卡</span>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <span className="text-label-sm text-charcoal-400">碳水 {carbs}g</span>
              <span className="text-label-sm text-charcoal-400">蛋白 {protein}g</span>
              <span className="text-label-sm text-charcoal-400">脂肪 {fat}g</span>
            </div>
          </div>

          {/* Meal type */}
          <div className="mb-4">
            <p className="text-label text-charcoal-400 mb-2">餐别</p>
            <div className="flex gap-2">
              {mealTypes.map((m) => (
                <button
                  key={m}
                  onClick={() => setMealType(m)}
                  className={`chip ${mealType === m ? 'chip-active' : ''}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleSave} className="w-full btn-primary">
            {isEdit ? '更新' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
}

function getDefaultMeal(): MealType {
  const h = new Date().getHours();
  if (h < 10) return '早餐';
  if (h < 14) return '午餐';
  if (h < 18) return '晚餐';
  return '加餐';
}
