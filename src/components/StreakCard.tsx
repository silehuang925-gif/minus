import { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { getTodayStr } from '@/utils/data';

export default function StreakCard() {
  const { state } = useApp();
  const today = getTodayStr();

  const streak = useMemo(() => {
    const allDates = new Set<string>();
    for (const r of state.foodRecords) allDates.add(r.date);
    for (const r of state.exerciseRecords) allDates.add(r.date);

    let count = 0;
    const d = new Date(today);

    // Include today if it has records
    if (allDates.has(today)) {
      count = 1;
    }

    // Go backwards from yesterday
    d.setDate(d.getDate() - 1);
    while (true) {
      const ds = d.toISOString().split('T')[0];
      if (allDates.has(ds)) {
        count++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }

    return count;
  }, [state.foodRecords, state.exerciseRecords, today]);

  return (
    <div className="card text-center">
      <p className="text-body text-charcoal-800 dark:text-charcoal-200">
        已坚持
        <span className="text-[28px] font-din text-mint-200 mx-1.5">{streak}</span>
        天
      </p>
    </div>
  );
}
