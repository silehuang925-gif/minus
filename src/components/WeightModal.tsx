import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { generateId, getTodayStr, getNowTimeStr, getTodayStamp, getLatestWeight } from '@/utils/data';
import type { WeightRecord } from '@/types';

interface Props {
  onClose: () => void;
}

export default function WeightModal({ onClose }: Props) {
  const { state, dispatch } = useApp();
  const latest = getLatestWeight();
  const prevWeight = state.weightRecords.length > 1 ? state.weightRecords[1]?.weight : null;
  const defaultWeight = latest ? String(latest.weight) : String(state.profile.currentWeight);
  const [weight, setWeight] = useState(defaultWeight);
  const [error, setError] = useState('');

  const diff = prevWeight !== null ? parseFloat(weight || '0') - prevWeight : 0;

  const handleSave = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0 || w > 300) {
      setError('请输入合理的体重数值');
      return;
    }
    const record: WeightRecord = {
      id: generateId(),
      date: getTodayStr(),
      time: getNowTimeStr(),
      weight: Math.round(w * 10) / 10,
      timestamp: getTodayStamp(),
    };
    dispatch({ type: 'ADD_WEIGHT_RECORD', payload: record });
    dispatch({ type: 'UPDATE_PROFILE', payload: { currentWeight: record.weight } });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet sheet-enter" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-headline-xs text-charcoal-900">记录今日体重</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex items-end justify-center gap-2 py-4">
            <input
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={(e) => { setWeight(e.target.value); setError(''); }}
              className="text-center text-[40px] font-din font-bold text-charcoal-900 bg-transparent border-b-2 border-mint-200 w-40 outline-none"
              autoFocus
              step="0.1"
            />
            <span className="text-body text-charcoal-400 pb-2">kg</span>
          </div>

          {prevWeight !== null && (
            <p className={`text-center text-body-sm mt-2 ${
              diff < 0 ? 'text-mint-500' : diff > 0 ? 'text-alert-red' : 'text-charcoal-400'
            }`}>
              与上次对比 {diff !== 0 ? (diff > 0 ? '+' : '') + diff.toFixed(1) : '无变化'} kg
            </p>
          )}

          {error && (
            <p className="text-label-sm text-alert-red text-center mt-2">{error}</p>
          )}

          <button onClick={handleSave} className="w-full btn-primary mt-5">
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
