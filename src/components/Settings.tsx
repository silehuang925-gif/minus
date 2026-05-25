import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { downloadCSV, clearAllData } from '@/utils/data';
import { calcBMR, calcBMI } from '@/utils/calculator';
import type { ActivityLevel } from '@/types';
import EditNumberModal from '@/components/EditNumberModal';
import EditSelectModal from '@/components/EditSelectModal';
import EditNameModal from '@/components/EditNameModal';

const activityOptions: ActivityLevel[] = ['卧床休息', '久坐办公', '轻度活动', '中度活动', '高强度活动', '运动员级别'];

export default function Settings() {
  const { state, dispatch } = useApp();
  const { profile, darkMode } = state;
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const bmiStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: '偏瘦', color: 'text-charcoal-500' };
    if (bmi < 24) return { label: '正常', color: 'text-mint-500' };
    if (bmi < 28) return { label: '偏重', color: 'text-alert-orange' };
    return { label: '肥胖', color: 'text-alert-red' };
  };

  const bmiInfo = bmiStatus(profile.bmi);

  return (
    <div className="flex flex-col min-h-screen safe-top safe-bottom">
      {/* Header */}
      <div className="flex items-center px-5 pt-4 pb-2">
        <button
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'dashboard' })}
          className="w-10 h-10 flex items-center justify-center rounded-full active:scale-90 transition-transform"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-headline-sm text-charcoal-900 dark:text-white ml-1">个人中心</h1>
      </div>

      <div className="flex-1 px-5 space-y-5 pb-8 overflow-y-auto">
        {/* Profile Header */}
        <div className="card flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-mint-200 flex items-center justify-center">
            <span className="text-headline-sm font-din text-mint-500">
              {profile.name ? profile.name[0] : '?'}
            </span>
          </div>
          <div className="flex-1">
            <button
              onClick={() => setActiveModal('name')}
              className="flex items-center gap-1 text-body text-charcoal-900 dark:text-white font-medium"
            >
              {profile.name || '点击设置名字'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <p className="text-label-sm text-charcoal-400 mt-0.5">
              {profile.gender === 'male' ? '男' : '女'} · {profile.age}岁 · {profile.activityLevel}
            </p>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'dashboard' })}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* BMI & BMR Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card text-center">
            <p className="text-label text-charcoal-400">BMI</p>
            <p className="text-headline font-din text-charcoal-900 dark:text-white mt-1">{profile.bmi}</p>
            <p className={`text-label-sm ${bmiInfo.color} mt-0.5`}>{bmiInfo.label}</p>
          </div>
          <div className="card text-center">
            <p className="text-label text-charcoal-400">基础代谢</p>
            <p className="text-headline font-din text-charcoal-900 dark:text-white mt-1">{profile.bmr}</p>
            <p className="text-label-sm text-charcoal-400 mt-0.5">千卡/天</p>
          </div>
        </div>

        {/* Body Profile */}
        <div className="card">
          <p className="text-label text-charcoal-400 uppercase tracking-wider mb-1">身体档案</p>
          <div className="divide-y divide-surface-dim">
            <button
              onClick={() => setActiveModal('height')}
              className="w-full flex items-center justify-between py-3 active:bg-charcoal-50 rounded"
            >
              <span className="text-body text-charcoal-800 dark:text-charcoal-100">身高</span>
              <span className="text-body text-charcoal-500">{profile.height} cm</span>
            </button>
            <button
              onClick={() => setActiveModal('weight')}
              className="w-full flex items-center justify-between py-3 active:bg-charcoal-50 rounded"
            >
              <span className="text-body text-charcoal-800 dark:text-charcoal-100">当前体重</span>
              <span className="text-body text-charcoal-500">{profile.currentWeight} kg</span>
            </button>
            <button
              onClick={() => setActiveModal('age')}
              className="w-full flex items-center justify-between py-3 active:bg-charcoal-50 rounded"
            >
              <span className="text-body text-charcoal-800 dark:text-charcoal-100">年龄</span>
              <span className="text-body text-charcoal-500">{profile.age} 岁</span>
            </button>
            <button
              onClick={() => setActiveModal('gender')}
              className="w-full flex items-center justify-between py-3 active:bg-charcoal-50 rounded"
            >
              <span className="text-body text-charcoal-800 dark:text-charcoal-100">性别</span>
              <span className="text-body text-charcoal-500">{profile.gender === 'male' ? '男' : '女'}</span>
            </button>
            <button
              onClick={() => setActiveModal('activity')}
              className="w-full flex items-center justify-between py-3 active:bg-charcoal-50 rounded"
            >
              <span className="text-body text-charcoal-800 dark:text-charcoal-100">活动水平</span>
              <span className="text-body text-charcoal-500">{profile.activityLevel}</span>
            </button>
            <button
              onClick={() => setActiveModal('targetWeight')}
              className="w-full flex items-center justify-between py-3 active:bg-charcoal-50 rounded"
            >
              <span className="text-body text-charcoal-800 dark:text-charcoal-100">目标体重</span>
              <span className="text-body text-charcoal-500">{profile.targetWeight} kg</span>
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="card">
          <p className="text-label text-charcoal-400 uppercase tracking-wider mb-1">设置</p>
          <div className="divide-y divide-surface-dim">
            <button
              onClick={() => setActiveModal('name')}
              className="w-full flex items-center justify-between py-3 active:bg-charcoal-50 rounded"
            >
              <span className="text-body text-charcoal-800 dark:text-charcoal-100">修改名字</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
              className="w-full flex items-center justify-between py-3 active:bg-charcoal-50 rounded"
            >
              <span className="text-body text-charcoal-800 dark:text-charcoal-100">深色模式</span>
              <div className={`w-10 h-6 rounded-full transition-colors ${darkMode ? 'bg-mint-400' : 'bg-charcoal-200'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow mt-0.5 transition-transform ${darkMode ? 'translate-x-[18px]' : 'translate-x-[2px]'}`} />
              </div>
            </button>
            <button
              onClick={downloadCSV}
              className="w-full flex items-center justify-between py-3 active:bg-charcoal-50 rounded"
            >
              <span className="text-body text-charcoal-800 dark:text-charcoal-100">导出 CSV</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><line x1="7" y1="10" x2="12" y2="15" /><line x1="12" y1="15" x2="17" y2="10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full text-body text-alert-red py-3 text-center"
          >
            清除所有数据
          </button>
        </div>

        {/* Version */}
        <p className="text-center text-label-sm text-charcoal-300 pb-4">Minus v1.0.0</p>
      </div>

      {/* Modals */}
      {activeModal === 'name' && (
        <EditNameModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'height' && (
        <EditNumberModal
          title="身高"
          unit="cm"
          value={profile.height}
          min={100} max={250}
          onSubmit={(v) => {
            dispatch({ type: 'UPDATE_PROFILE', payload: { height: v } });
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'weight' && (
        <EditNumberModal
          title="当前体重"
          unit="kg"
          value={profile.currentWeight}
          step={0.1}
          min={30} max={200}
          onSubmit={(v) => {
            dispatch({ type: 'UPDATE_PROFILE', payload: { currentWeight: v } });
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'age' && (
        <EditNumberModal
          title="年龄"
          unit="岁"
          value={profile.age}
          min={10} max={120}
          onSubmit={(v) => {
            dispatch({ type: 'UPDATE_PROFILE', payload: { age: v } });
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'gender' && (
        <EditSelectModal
          title="性别"
          options={['male', 'female']}
          labels={['男', '女']}
          value={profile.gender}
          onSelect={(v) => {
            dispatch({ type: 'UPDATE_PROFILE', payload: { gender: v as 'male' | 'female' } });
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'activity' && (
        <EditSelectModal
          title="活动水平"
          options={activityOptions}
          labels={activityOptions}
          value={profile.activityLevel}
          onSelect={(v) => {
            dispatch({ type: 'UPDATE_PROFILE', payload: { activityLevel: v as ActivityLevel } });
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'targetWeight' && (
        <EditNumberModal
          title="目标体重"
          unit="kg"
          value={profile.targetWeight}
          step={0.1}
          min={30} max={200}
          onSubmit={(v) => {
            dispatch({ type: 'UPDATE_PROFILE', payload: { targetWeight: v } });
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="absolute bottom-1/2 translate-y-1/2 left-5 right-5 sm:left-auto sm:right-auto sm:w-[353px] sm:mx-auto
                          bg-white dark:bg-charcoal-800 rounded-card p-6 shadow-modal z-50" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-headline-xs text-charcoal-900">确认清除</h3>
            <p className="text-body-sm text-charcoal-500 mt-2">将永久删除所有数据，此操作不可撤销。</p>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 btn-secondary"
              >
                取消
              </button>
              <button
                onClick={() => {
                  clearAllData();
                  window.location.reload();
                }}
                className="flex-1 btn-danger"
              >
                确认清除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
