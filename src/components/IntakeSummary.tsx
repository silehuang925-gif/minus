import type { DailySummary } from '@/types';

interface Props {
  summary: DailySummary;
}

export default function IntakeSummary({ summary }: Props) {
  const { intake, carbs, protein, fat } = summary;
  const hasMacro = carbs > 0 || protein > 0 || fat > 0;

  return (
    <div className="card">
      <p className="text-label text-charcoal-400 uppercase tracking-wider">今日摄入</p>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-headline font-din text-charcoal-900 dark:text-white">{intake}</span>
        <span className="text-body-sm text-charcoal-400">千卡</span>
      </div>
      {hasMacro && (
        <div className="flex gap-4 mt-3 pt-3 border-t border-surface-dim">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-mint-200" />
            <span className="text-label-sm text-charcoal-500">碳水 {carbs}g</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-alert-orange" />
            <span className="text-label-sm text-charcoal-500">蛋白 {protein}g</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-alert-red" />
            <span className="text-label-sm text-charcoal-500">脂肪 {fat}g</span>
          </div>
        </div>
      )}
    </div>
  );
}
