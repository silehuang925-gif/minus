import type { DailySummary } from '@/types';

interface Props {
  summary: DailySummary;
  hasData: boolean;
}

export default function ProgressRing({ summary, hasData }: Props) {
  const { budget, intake, remaining, exerciseCalories } = summary;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 10;

  if (!hasData || budget === 0) {
    return (
      <div className="flex justify-center py-4">
        <div className="relative w-[200px] h-[200px]">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r={radius} fill="none" stroke="#E5E5EA" strokeWidth={strokeWidth} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-display font-din text-charcoal-300">——</span>
            <span className="text-label-sm text-charcoal-400 mt-1">请先设置身体档案</span>
          </div>
        </div>
      </div>
    );
  }

  const intakeRatio = Math.min(intake / budget, 1);
  const intakeOffset = circumference * (1 - intakeRatio);

  // exercise portion on top of intake
  const exerciseRatio = Math.min(exerciseCalories / budget, 1);

  // Determine color
  let progressColor = '#A7E0C0'; // mint green
  if (remaining <= 0) {
    progressColor = '#FF3B30';
  } else if (remaining / budget <= 0.2) {
    progressColor = '#FF9500';
  }

  return (
    <div className="flex justify-center py-4">
      <div className="relative w-[200px] h-[200px]">
        <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
          {/* Track */}
          <circle cx="100" cy="100" r={radius} fill="none" stroke="#E5E5EA" strokeWidth={strokeWidth} />
          {/* Intake progress */}
          <circle
            cx="100" cy="100" r={radius} fill="none"
            stroke={progressColor} strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={intakeOffset}
            className="progress-ring-circle"
          />
          {/* Exercise overlay */}
          {exerciseCalories > 0 && (
            <circle
              cx="100" cy="100" r={radius} fill="none"
              stroke="#A7E0C0" strokeWidth={strokeWidth}
              strokeLinecap="round" strokeOpacity={0.3}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - exerciseRatio)}
              className="progress-ring-circle"
            />
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {remaining >= 0 ? (
            <>
              <span className="text-body-sm text-charcoal-400">还能吃</span>
              <span className="text-display font-din text-charcoal-900 dark:text-white">{remaining}</span>
              <span className="text-body-sm text-charcoal-400">千卡</span>
            </>
          ) : (
            <>
              <span className="text-body-sm text-alert-red">超出</span>
              <span className="text-display font-din text-alert-red">{Math.abs(remaining)}</span>
              <span className="text-body-sm text-alert-red">千卡</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
