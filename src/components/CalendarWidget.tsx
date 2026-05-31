import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { getTodayStr } from '@/utils/data';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export default function CalendarWidget() {
  const { state, dispatch } = useApp();
  const today = getTodayStr();
  const [todayY, todayM, todayD] = today.split('-').map(Number);

  const [viewYear, setViewYear] = useState(todayY);
  const [viewMonth, setViewMonth] = useState(todayM);

  // Compute set of dates with records
  const recordDays = useMemo(() => {
    const set = new Set<string>();
    for (const r of state.foodRecords) set.add(r.date);
    for (const r of state.exerciseRecords) set.add(r.date);
    return set;
  }, [state.foodRecords, state.exerciseRecords]);

  const isToday = (y: number, m: number, d: number) =>
    y === todayY && m === todayM && d === todayD;

  const hasRecords = (y: number, m: number, d: number) => {
    const mm = String(m).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return recordDays.has(`${y}-${mm}-${dd}`);
  };

  const handleDateClick = (y: number, m: number, d: number) => {
    const mm = String(m).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    dispatch({ type: 'SET_DIARY_DATE', payload: `${y}-${mm}-${dd}` });
    dispatch({ type: 'SET_PAGE', payload: 'diary' });
  };

  const prevMonth = () => {
    if (viewMonth === 1) { setViewYear(viewYear - 1); setViewMonth(12); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 12) { setViewYear(viewYear + 1); setViewMonth(1); }
    else setViewMonth(viewMonth + 1);
  };

  // Build calendar grid
  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth - 1, 1).getDay(); // 0=Sun

  const cells: { y: number; m: number; d: number; currentMonth: boolean }[] = [];

  // Previous month trailing days
  const prevMonthDays = new Date(viewYear, viewMonth - 1, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    cells.push({ y: viewYear, m: viewMonth - 1 || 12, d: prevMonthDays - i, currentMonth: false });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ y: viewYear, m: viewMonth, d, currentMonth: true });
  }

  // Next month leading days
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ y: viewYear, m: viewMonth + 1 > 12 ? 1 : viewMonth + 1, d, currentMonth: false });
  }

  return (
    <div className="card">
      {/* Month header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="w-11 h-11 flex items-center justify-center rounded-full active:bg-charcoal-100 dark:active:bg-charcoal-700"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h3 className="text-body font-medium text-charcoal-900 dark:text-white">
          {viewYear}年{viewMonth}月
        </h3>
        <button
          onClick={nextMonth}
          className="w-11 h-11 flex items-center justify-center rounded-full active:bg-charcoal-100 dark:active:bg-charcoal-700"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center text-[11px] font-medium text-charcoal-400 py-1">
            {w}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7">
        {cells.map((cell, i) => {
          const todayCell = isToday(cell.y, cell.m, cell.d);
          const hasRecord = hasRecords(cell.y, cell.m, cell.d);
          const currentMonth = cell.currentMonth;

          return (
            <button
              key={i}
              onClick={() => currentMonth && handleDateClick(cell.y, cell.m, cell.d)}
              disabled={!currentMonth}
              className="relative flex flex-col items-center justify-center h-11 text-[13px] active:bg-charcoal-50 dark:active:bg-charcoal-700 rounded-lg transition-colors disabled:opacity-30"
            >
              {/* Today circle */}
              {todayCell ? (
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-medium
                  ${hasRecord ? 'bg-mint-200 text-charcoal-800' : 'border-2 border-mint-200 text-charcoal-800 dark:text-white'}`}
                >
                  {cell.d}
                </span>
              ) : (
                <span className={`text-[13px] ${currentMonth ? 'text-charcoal-800 dark:text-charcoal-200' : 'text-charcoal-300 dark:text-charcoal-600'}`}>
                  {cell.d}
                </span>
              )}

              {/* Record dot */}
              {hasRecord && currentMonth && !todayCell && (
                <span className="w-1.5 h-1.5 rounded-full bg-mint-200 mt-0.5" />
              )}
              {hasRecord && currentMonth && todayCell && (
                <span className="w-1.5 h-1.5 rounded-full bg-mint-200 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
