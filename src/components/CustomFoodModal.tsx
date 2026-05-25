import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { generateId } from '@/utils/data';
import type { CustomFood } from '@/types';

interface Props {
  onClose: () => void;
}

export default function CustomFoodModal({ onClose }: Props) {
  const { dispatch } = useApp();
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [portion, setPortion] = useState('150');
  const [note, setNote] = useState('');

  const handleSave = () => {
    const n = name.trim();
    const cal = parseFloat(calories);
    if (!n || isNaN(cal) || cal <= 0) return;

    const food: CustomFood = {
      id: generateId(),
      name: n,
      caloriesPer100g: cal,
      carbsPer100g: parseFloat(carbs) || 0,
      proteinPer100g: parseFloat(protein) || 0,
      fatPer100g: parseFloat(fat) || 0,
      defaultPortion: parseInt(portion) || 150,
      note: note.trim(),
    };
    dispatch({ type: 'ADD_CUSTOM_FOOD', payload: food });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet sheet-enter max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-headline-xs text-charcoal-900">添加自定义食物</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-label-sm text-charcoal-500 mb-1 block">食物名称</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="如：鸡胸肉"
                className="input-underline"
                autoFocus
              />
            </div>

            <div>
              <label className="text-label-sm text-charcoal-500 mb-1 block">每100g热量（千卡）*</label>
              <input
                type="number"
                inputMode="decimal"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="如：133"
                className="input-underline"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-label-sm text-charcoal-500 mb-1 block">碳水 (g)</label>
                <input type="number" inputMode="decimal" value={carbs} onChange={(e) => setCarbs(e.target.value)} placeholder="0" className="input-underline" />
              </div>
              <div>
                <label className="text-label-sm text-charcoal-500 mb-1 block">蛋白 (g)</label>
                <input type="number" inputMode="decimal" value={protein} onChange={(e) => setProtein(e.target.value)} placeholder="0" className="input-underline" />
              </div>
              <div>
                <label className="text-label-sm text-charcoal-500 mb-1 block">脂肪 (g)</label>
                <input type="number" inputMode="decimal" value={fat} onChange={(e) => setFat(e.target.value)} placeholder="0" className="input-underline" />
              </div>
            </div>

            <div>
              <label className="text-label-sm text-charcoal-500 mb-1 block">默认份重（克）</label>
              <input
                type="number"
                inputMode="numeric"
                value={portion}
                onChange={(e) => setPortion(e.target.value)}
                placeholder="150"
                className="input-underline"
              />
            </div>

            <div>
              <label className="text-label-sm text-charcoal-500 mb-1 block">备注</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="如：去皮"
                className="input-underline"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={!name.trim() || !calories}
            className={`w-full mt-5 rounded-btn py-3 text-body font-medium transition-colors ${
              name.trim() && calories
                ? 'bg-mint-200 text-charcoal-800 active:scale-96'
                : 'bg-charcoal-100 text-charcoal-400'
            }`}
          >
            保存到自定义食物库
          </button>
        </div>
      </div>
    </div>
  );
}
