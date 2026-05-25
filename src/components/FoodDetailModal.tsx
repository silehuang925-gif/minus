import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import type { FoodRecord } from '@/types';
import FoodAmountModal from '@/components/FoodAmountModal';

interface Props {
  record: FoodRecord;
  onClose: () => void;
}

export default function FoodDetailModal({ record, onClose }: Props) {
  const { dispatch } = useApp();
  const [editing, setEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    dispatch({ type: 'DELETE_FOOD_RECORD', payload: record.id });
    onClose();
  };

  if (editing) {
    // Construct a food-like object for the amount modal
    const foodItem = {
      name: record.foodName,
      caloriesPer100g: Math.round((record.calories / record.amount) * 100),
      carbsPer100g: Math.round((record.carbs / record.amount) * 100 * 10) / 10,
      proteinPer100g: Math.round((record.protein / record.amount) * 100 * 10) / 10,
      fatPer100g: Math.round((record.fat / record.amount) * 100 * 10) / 10,
      category: '',
    };

    return (
      <FoodAmountModal
        food={foodItem}
        editRecord={record}
        onClose={() => {
          setEditing(false);
          onClose();
        }}
      />
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet sheet-enter" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-headline-xs text-charcoal-900">{record.foodName}</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-body-sm text-charcoal-400">热量</span>
              <span className="text-body font-din text-charcoal-800">{record.calories} 千卡</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body-sm text-charcoal-400">分量</span>
              <span className="text-body text-charcoal-800">{record.amount}{record.unit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body-sm text-charcoal-400">碳水</span>
              <span className="text-body text-charcoal-800">{record.carbs}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body-sm text-charcoal-400">蛋白质</span>
              <span className="text-body text-charcoal-800">{record.protein}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body-sm text-charcoal-400">脂肪</span>
              <span className="text-body text-charcoal-800">{record.fat}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body-sm text-charcoal-400">记录时间</span>
              <span className="text-body text-charcoal-800">{record.date} {record.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body-sm text-charcoal-400">餐别</span>
              <span className="text-body text-charcoal-800">{record.mealType}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button onClick={() => setEditing(true)} className="flex-1 btn-secondary">
              编辑
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="flex-1 bg-alert-red/10 text-alert-red font-medium rounded-btn py-3 active:scale-96"
            >
              删除
            </button>
          </div>

          {/* Delete confirmation */}
          {showDelete && (
            <div className="mt-3 p-4 bg-alert-red/5 rounded-card">
              <p className="text-body-sm text-charcoal-700 mb-3">确认删除这条饮食记录？</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDelete(false)} className="flex-1 btn-secondary text-sm">取消</button>
                <button onClick={handleDelete} className="flex-1 btn-danger text-sm">确认删除</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
