import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { generateId, getTodayStr, getNowTimeStr, getTodayStamp } from '@/utils/data';
import { calcExerciseCalories } from '@/utils/calculator';
import type { ExerciseType, ExerciseRecord } from '@/types';

const exerciseTypes: { type: ExerciseType; label: string; icon: string }[] = [
  { type: '跑步', label: '跑步', icon: '🏃' },
  { type: '骑行', label: '骑行', icon: '🚴' },
  { type: '游泳', label: '游泳', icon: '🏊' },
  { type: '力量训练', label: '力量', icon: '🏋️' },
  { type: '瑜伽', label: '瑜伽', icon: '🧘' },
  { type: '篮球', label: '篮球', icon: '🏀' },
  { type: '足球', label: '足球', icon: '⚽' },
  { type: '羽毛球', label: '羽毛球', icon: '🏸' },
  { type: '乒乓球', label: '乒乓球', icon: '🏓' },
  { type: '网球', label: '网球', icon: '🎾' },
  { type: '排球', label: '排球', icon: '🏐' },
  { type: '徒步', label: '徒步', icon: '🥾' },
  { type: '爬楼梯', label: '爬楼梯', icon: '🪜' },
  { type: '跳绳', label: '跳绳', icon: '🪢' },
  { type: '跳舞', label: '跳舞', icon: '💃' },
  { type: '椭圆机', label: '椭圆机', icon: '🔄' },
  { type: '划船机', label: '划船机', icon: '🚣' },
  { type: '其他', label: '其他', icon: '💪' },
];

export default function ExerciseModal({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useApp();
  const [selectedType, setSelectedType] = useState<ExerciseType>('跑步');
  const [duration, setDuration] = useState(30);
  const [manualCalories, setManualCalories] = useState('');
  const [extraKm, setExtraKm] = useState('5');

  const isManual = selectedType === '其他';

  const estimatedCalories = isManual
    ? parseInt(manualCalories) || 0
    : calcExerciseCalories(selectedType, state.profile.currentWeight, duration, parseFloat(extraKm) || 0);

  const handleSave = () => {
    if (estimatedCalories <= 0) return;
    const record: ExerciseRecord = {
      id: generateId(),
      date: getTodayStr(),
      time: getNowTimeStr(),
      type: selectedType,
      duration,
      calories: estimatedCalories,
      timestamp: getTodayStamp(),
    };
    dispatch({ type: 'ADD_EXERCISE_RECORD', payload: record });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet sheet-enter" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-headline-xs text-charcoal-900">记录运动</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Exercise Type Selector */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {exerciseTypes.map((e) => (
              <button
                key={e.type}
                onClick={() => setSelectedType(e.type)}
                className={`flex-shrink-0 chip ${selectedType === e.type ? 'chip-active' : ''}`}
              >
                <span className="mr-1">{e.icon}</span>
                {e.label}
              </button>
            ))}
          </div>

          {/* Duration */}
          {!isManual && (
            <div className="mt-5">
              <p className="text-label text-charcoal-400 dark:text-charcoal-300 mb-2">时长（分钟）</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDuration(Math.max(1, duration - 5))}
                  className="w-10 h-10 rounded-full bg-charcoal-100 dark:bg-charcoal-700 flex items-center justify-center text-charcoal-600 dark:text-charcoal-300 text-xl active:scale-90"
                >
                  -
                </button>
                <input
                  type="number"
                  inputMode="numeric"
                  value={duration}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 1;
                    setDuration(Math.max(1, Math.min(480, v)));
                  }}
                  className="text-headline font-din text-charcoal-900 dark:text-white bg-transparent flex-1 text-center border-b-2 border-mint-200 outline-none"
                />
                <button
                  onClick={() => setDuration(Math.min(480, duration + 5))}
                  className="w-10 h-10 rounded-full bg-charcoal-100 dark:bg-charcoal-700 flex items-center justify-center text-charcoal-600 dark:text-charcoal-300 text-xl active:scale-90"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Extra km for running */}
          {selectedType === '跑步' && (
            <div className="mt-4">
              <p className="text-label text-charcoal-400 mb-2">距离（公里）</p>
              <input
                type="number"
                inputMode="decimal"
                value={extraKm}
                onChange={(e) => setExtraKm(e.target.value)}
                className="input-underline text-center text-headline-sm font-din"
                step="0.5"
              />
            </div>
          )}

          {/* Manual input */}
          {isManual && (
            <div className="mt-5">
              <p className="text-label text-charcoal-400 mb-2">消耗热量（千卡）</p>
              <input
                type="number"
                inputMode="numeric"
                value={manualCalories}
                onChange={(e) => setManualCalories(e.target.value)}
                placeholder="手动输入消耗值"
                className="input-underline text-center text-headline-sm font-din"
                autoFocus
              />
            </div>
          )}

          {/* Estimated Calories */}
          <div className="mt-5 p-4 bg-mint-50 dark:bg-charcoal-700 rounded-card text-center">
            <p className="text-label text-charcoal-400 dark:text-charcoal-300">预估消耗</p>
            <p className="text-headline font-din text-mint-600 dark:text-mint-300 mt-1">{estimatedCalories}</p>
            <p className="text-label-sm text-charcoal-400 dark:text-charcoal-300">千卡</p>
          </div>

          <button
            onClick={handleSave}
            disabled={estimatedCalories <= 0}
            className={`w-full mt-4 py-3 rounded-btn text-body font-medium transition-colors ${
              estimatedCalories > 0
                ? 'bg-mint-200 text-charcoal-800 active:scale-96'
                : 'bg-charcoal-100 text-charcoal-400'
            }`}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
