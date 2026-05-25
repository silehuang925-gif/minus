import { useState } from 'react';

interface Props {
  title: string;
  unit: string;
  value: number;
  step?: number;
  min: number;
  max: number;
  onSubmit: (value: number) => void;
  onClose: () => void;
}

export default function EditNumberModal({ title, unit, value, step = 1, min, max, onSubmit, onClose }: Props) {
  const [val, setVal] = useState(String(value));
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const n = parseFloat(val);
    if (isNaN(n) || n < min || n > max) {
      setError(`请输入 ${min}-${max} 之间的数字`);
      return;
    }
    onSubmit(n);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet sheet-enter" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-headline-xs text-charcoal-900">{title}</h2>
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
              value={val}
              onChange={(e) => { setVal(e.target.value); setError(''); }}
              className="text-center text-[36px] font-din font-bold text-charcoal-900 bg-transparent border-b-2 border-mint-200 w-32 outline-none"
              autoFocus
              step={step}
            />
            <span className="text-body text-charcoal-400 pb-2">{unit}</span>
          </div>

          {error && (
            <p className="text-label-sm text-alert-red text-center mb-3">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full btn-primary mt-3"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
