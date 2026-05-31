import { useState } from 'react';

interface Props {
  onFood: () => void;
  onWeight: () => void;
  onExercise: () => void;
  onRecipe: () => void;
}

export default function FabMenu({ onFood, onWeight, onExercise, onRecipe }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <div className="modal-overlay" onClick={() => setOpen(false)} />}

      {open && (
        <div className="fixed bottom-28 right-5 sm:right-auto sm:left-1/2 sm:translate-x-[170px] z-40 flex flex-col items-center gap-3">
          <button className="fab-child flex flex-col items-center gap-1" onClick={() => { onFood(); setOpen(false); }}>
            <div className="w-12 h-12 rounded-full bg-white dark:bg-charcoal-800 shadow-card dark:shadow-none flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A7E0C0" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 8a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8Z" />
                <line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
                <path d="M8.5 2l-1 3h9l-1-3" />
              </svg>
            </div>
            <span className="text-label-sm text-white">记录饮食</span>
          </button>

          <button className="fab-child flex flex-col items-center gap-1" onClick={() => { onWeight(); setOpen(false); }}>
            <div className="w-12 h-12 rounded-full bg-white dark:bg-charcoal-800 shadow-card dark:shadow-none flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A7E0C0" strokeWidth="2.5" strokeLinecap="round">
                <rect x="4" y="2" width="16" height="20" rx="4" />
                <line x1="8" y1="8" x2="12" y2="12" />
                <circle cx="12" cy="12" r="5" />
              </svg>
            </div>
            <span className="text-label-sm text-white">记录体重</span>
          </button>

          <button className="fab-child flex flex-col items-center gap-1" onClick={() => { onExercise(); setOpen(false); }}>
            <div className="w-12 h-12 rounded-full bg-white dark:bg-charcoal-800 shadow-card dark:shadow-none flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A7E0C0" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <span className="text-label-sm text-white">记录运动</span>
          </button>

          <button className="fab-child flex flex-col items-center gap-1" onClick={() => { onRecipe(); setOpen(false); }}>
            <div className="w-12 h-12 rounded-full bg-white dark:bg-charcoal-800 shadow-card dark:shadow-none flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A7E0C0" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
                <path d="M12 14l1 3 3-1-1-3" />
              </svg>
            </div>
            <span className="text-label-sm text-white">推荐饮食</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-5 sm:right-auto sm:left-1/2 sm:translate-x-[170px] z-40
                   w-14 h-14 rounded-full bg-mint-200 shadow-lg flex items-center justify-center
                   active:scale-95 transition-all duration-300"
        style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </>
  );
}
