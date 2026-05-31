import type { UserProfile, WeightRecord, FoodRecord, ExerciseRecord, CustomFood, ActivityLevel } from '@/types';

// ====== Storage Keys ======
const KEYS = {
  userProfile: 'minus_userProfile',
  weightRecords: 'minus_weightRecords',
  foodRecords: 'minus_foodRecords',
  exerciseRecords: 'minus_exerciseRecords',
  customFoods: 'minus_customFoods',
} as const;

// ====== ID Generator ======
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

// ====== Generic Storage Helpers ======
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ====== User Profile ======
export function getDefaultProfile(): UserProfile {
  return {
    name: '',
    height: 170,
    currentWeight: 60,
    age: 28,
    gender: 'female',
    activityLevel: '久坐办公',
    initialWeight: 60,
    targetWeight: 55,
    bmr: 0,
    bmi: 0,
  };
}

export function loadProfile(): UserProfile {
  return load<UserProfile>(KEYS.userProfile, getDefaultProfile());
}

export function saveProfile(profile: UserProfile): void {
  save(KEYS.userProfile, profile);
}

// ====== Weight Records ======
export function loadWeightRecords(): WeightRecord[] {
  return load<WeightRecord[]>(KEYS.weightRecords, []);
}

export function saveWeightRecords(records: WeightRecord[]): void {
  save(KEYS.weightRecords, records);
}

export function addWeightRecord(record: WeightRecord): WeightRecord[] {
  const records = [record, ...loadWeightRecords()];
  saveWeightRecords(records);
  return records;
}

export function deleteWeightRecord(id: string): WeightRecord[] {
  const records = loadWeightRecords().filter((r) => r.id !== id);
  saveWeightRecords(records);
  return records;
}

export function getTodayWeight(): WeightRecord | null {
  const today = getTodayStr();
  const records = loadWeightRecords();
  const todayRecords = records.filter((r) => r.date === today);
  if (todayRecords.length > 0) return todayRecords[0]; // latest first
  return records.length > 0 ? null : null; // no record today
}

export function getLatestWeight(): WeightRecord | null {
  const records = loadWeightRecords();
  return records.length > 0 ? records[0] : null;
}

export function getPreviousWeight(): WeightRecord | null {
  const records = loadWeightRecords();
  return records.length > 1 ? records[1] : null;
}

// ====== Food Records ======
export function loadFoodRecords(): FoodRecord[] {
  return load<FoodRecord[]>(KEYS.foodRecords, []);
}

export function saveFoodRecords(records: FoodRecord[]): void {
  save(KEYS.foodRecords, records);
}

export function addFoodRecord(record: FoodRecord): FoodRecord[] {
  const records = [record, ...loadFoodRecords()];
  saveFoodRecords(records);
  return records;
}

export function updateFoodRecord(id: string, updates: Partial<FoodRecord>): FoodRecord[] {
  const records = loadFoodRecords().map((r) => (r.id === id ? { ...r, ...updates } : r));
  saveFoodRecords(records);
  return records;
}

export function deleteFoodRecord(id: string): FoodRecord[] {
  const records = loadFoodRecords().filter((r) => r.id !== id);
  saveFoodRecords(records);
  return records;
}

export function getTodayFoodRecords(): FoodRecord[] {
  const today = getTodayStr();
  return loadFoodRecords().filter((r) => r.date === today);
}

export function getDateFoodRecords(date: string): FoodRecord[] {
  return loadFoodRecords().filter((r) => r.date === date);
}

// ====== Exercise Records ======
export function loadExerciseRecords(): ExerciseRecord[] {
  return load<ExerciseRecord[]>(KEYS.exerciseRecords, []);
}

export function saveExerciseRecords(records: ExerciseRecord[]): void {
  save(KEYS.exerciseRecords, records);
}

export function addExerciseRecord(record: ExerciseRecord): ExerciseRecord[] {
  const records = [record, ...loadExerciseRecords()];
  saveExerciseRecords(records);
  return records;
}

export function deleteExerciseRecord(id: string): ExerciseRecord[] {
  const records = loadExerciseRecords().filter((r) => r.id !== id);
  saveExerciseRecords(records);
  return records;
}

export function getTodayExerciseRecords(): ExerciseRecord[] {
  const today = getTodayStr();
  return loadExerciseRecords().filter((r) => r.date === today);
}

// ====== Custom Foods ======
export function loadCustomFoods(): CustomFood[] {
  return load<CustomFood[]>(KEYS.customFoods, []);
}

export function saveCustomFoods(foods: CustomFood[]): void {
  save(KEYS.customFoods, foods);
}

export function addCustomFood(food: CustomFood): CustomFood[] {
  const foods = [food, ...loadCustomFoods()];
  saveCustomFoods(foods);
  return foods;
}

// ====== Helpers ======
export function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getNowTimeStr(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function getTodayStamp(): number {
  return Date.now();
}

// ====== Data Export ======
export function exportAllCSV(): string {
  const profile = loadProfile();
  const foods = loadFoodRecords();
  const weights = loadWeightRecords();
  const exercises = loadExerciseRecords();

  const lines: string[] = [];

  lines.push('--- 用户档案 ---');
  lines.push(`姓名,身高(cm),体重(kg),年龄,性别,活动水平,目标体重(kg),BMR,BMI`);
  lines.push(
    `${profile.name},${profile.height},${profile.currentWeight},${profile.age},${profile.gender},${profile.activityLevel},${profile.targetWeight},${profile.bmr},${profile.bmi}`
  );

  lines.push('');
  lines.push('--- 饮食记录 ---');
  lines.push(`日期,时间,餐别,食物名,分量(g),单位,热量(kcal),碳水(g),蛋白(g),脂肪(g)`);
  for (const f of foods) {
    lines.push(
      `${f.date},${f.time},${f.mealType},${f.foodName},${f.amount},${f.unit},${f.calories},${f.carbs},${f.protein},${f.fat}`
    );
  }

  lines.push('');
  lines.push('--- 体重记录 ---');
  lines.push(`日期,时间,体重(kg)`);
  for (const w of weights) {
    lines.push(`${w.date},${w.time},${w.weight}`);
  }

  lines.push('');
  lines.push('--- 运动记录 ---');
  lines.push(`日期,时间,类型,时长(分钟),消耗(kcal)`);
  for (const e of exercises) {
    lines.push(`${e.date},${e.time},${e.type},${e.duration},${e.calories}`);
  }

  return lines.join('\n');
}

export function downloadCSV(): void {
  const csv = exportAllCSV();
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `minus_export_${getTodayStr()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function clearAllData(): void {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}
