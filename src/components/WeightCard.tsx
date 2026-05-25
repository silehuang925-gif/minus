import { useApp } from '@/context/AppContext';

export default function WeightCard() {
  const { state } = useApp();
  const { weightRecords, profile } = state;

  const latest = weightRecords.length > 0 ? weightRecords[0] : null;
  const previous = weightRecords.length > 1 ? weightRecords[1] : null;

  const diff = latest && previous ? latest.weight - previous.weight : 0;
  const hasToday = latest ? latest.date === new Date().toISOString().split('T')[0] : false;

  return (
    <div className="card">
      <p className="text-label text-charcoal-400 uppercase tracking-wider">今日体重</p>
      <div className="flex items-end gap-3 mt-2">
        {latest ? (
          <>
            <span className="text-headline font-din text-charcoal-900 dark:text-white">
              {latest.weight.toFixed(1)}
            </span>
            <span className="text-body-sm text-charcoal-400 pb-0.5">kg</span>
            {previous && (
              <span className={`text-body-sm pb-0.5 flex items-center gap-0.5 ${
                diff < 0 ? 'text-mint-500' : diff > 0 ? 'text-alert-red' : 'text-charcoal-400'
              }`}>
                {diff < 0 ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5l-7 7h14z"/></svg>
                ) : diff > 0 ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 19l7-7H5z"/></svg>
                ) : null}
                {Math.abs(diff).toFixed(1)}kg
              </span>
            )}
          </>
        ) : (
          <span className="text-headline font-din text-charcoal-300">——</span>
        )}
      </div>
      {!hasToday && latest && (
        <p className="text-label-sm text-alert-orange mt-1">未更新</p>
      )}
    </div>
  );
}
