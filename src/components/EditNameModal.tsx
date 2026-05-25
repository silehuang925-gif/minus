import { useState } from 'react';
import { useApp } from '@/context/AppContext';

interface Props {
  onClose: () => void;
}

export default function EditNameModal({ onClose }: Props) {
  const { state, dispatch } = useApp();
  const [name, setName] = useState(state.profile.name);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet sheet-enter" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-headline-xs text-charcoal-900">修改名字</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入你的名字"
            className="input-underline text-center text-headline-sm"
            autoFocus
            maxLength={20}
          />

          <button
            onClick={() => {
              dispatch({ type: 'UPDATE_PROFILE', payload: { name: name.trim() } });
              onClose();
            }}
            className="w-full btn-primary mt-5"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
