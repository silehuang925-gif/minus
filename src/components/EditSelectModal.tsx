interface Props {
  title: string;
  options: string[];
  labels: string[];
  value: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export default function EditSelectModal({ title, options, labels, value, onSelect, onClose }: Props) {
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

          <div className="space-y-1 max-h-[320px] overflow-y-auto">
            {options.map((opt, i) => (
              <button
                key={opt}
                onClick={() => onSelect(opt)}
                className={`w-full text-left py-3 px-4 rounded-btn text-body transition-colors ${
                  opt === value
                    ? 'bg-mint-200 text-charcoal-800 font-medium'
                    : 'text-charcoal-600 active:bg-charcoal-50'
                }`}
              >
                {labels[i]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
