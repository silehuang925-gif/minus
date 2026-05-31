import type { ExerciseType, FoodRecord, ExerciseRecord, DailySummary } from '@/types';
import {
  loadProfile,
  getTodayFoodRecords,
  getTodayExerciseRecords,
  saveProfile,
  getTodayStr,
} from './data';

// ====== BMR (Mifflin-St Jeor) ======
export function calcBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return Math.round(gender === 'male' ? base + 5 : base - 161);
}

// ====== BMI ======
export function calcBMI(weight: number, height: number): number {
  const h = height / 100;
  return Math.round((weight / (h * h)) * 10) / 10;
}

// ====== Exercise Calorie Estimation (MET-based) ======
export function calcExerciseCalories(
  type: ExerciseType,
  weight: number,
  duration: number, // minutes
  extraValue?: number // km for running
): number {
  const h = duration / 60;
  switch (type) {
    case '跑步':
      return Math.round(weight * (extraValue || duration / 10) * 1.036);
    case '骑行':
      return Math.round(weight * h * 7.0);
    case '游泳':
      return Math.round(weight * duration * 0.106);
    case '力量训练':
      return Math.round(weight * h * 6.0);
    case '瑜伽':
      return Math.round(weight * h * 3.3);
    case '篮球':
      return Math.round(weight * h * 6.5);
    case '足球':
      return Math.round(weight * h * 7.0);
    case '羽毛球':
      return Math.round(weight * h * 5.5);
    case '乒乓球':
      return Math.round(weight * h * 4.0);
    case '网球':
      return Math.round(weight * h * 7.3);
    case '排球':
      return Math.round(weight * h * 4.0);
    case '徒步':
      return Math.round(weight * h * 6.0);
    case '爬楼梯':
      return Math.round(weight * h * 8.0);
    case '跳绳':
      return Math.round(weight * h * 10.0);
    case '跳舞':
      return Math.round(weight * h * 5.0);
    case '椭圆机':
      return Math.round(weight * h * 5.0);
    case '划船机':
      return Math.round(weight * h * 7.0);
    case '其他':
      return 0;
    default:
      return 0;
  }
}

// ====== Food Calorie Calculation ======
export function calcFoodCalories(
  caloriesPer100g: number,
  amount: number // grams
): number {
  return Math.round((caloriesPer100g / 100) * amount);
}

// ====== Daily Summary ======
export function getDailySummary(
  foodRecords?: FoodRecord[],
  exerciseRecords?: ExerciseRecord[],
): DailySummary {
  const profile = loadProfile();
  const today = getTodayStr();
  const todayFoods = foodRecords
    ? foodRecords.filter((r) => r.date === today)
    : getTodayFoodRecords();
  const todayExercises = exerciseRecords
    ? exerciseRecords.filter((r) => r.date === today)
    : getTodayExerciseRecords();

  const bmr = profile.bmr || calcBMR(profile.currentWeight, profile.height, profile.age, profile.gender);
  const exerciseCalories = todayExercises.reduce((sum, e) => sum + e.calories, 0);
  const budget = bmr + exerciseCalories;

  const intake = todayFoods.reduce((sum, f) => sum + f.calories, 0);
  const carbs = todayFoods.reduce((sum, f) => sum + f.carbs, 0);
  const protein = todayFoods.reduce((sum, f) => sum + f.protein, 0);
  const fat = todayFoods.reduce((sum, f) => sum + f.fat, 0);
  const remaining = budget - intake;

  return {
    budget,
    bmr,
    exerciseCalories,
    intake,
    remaining,
    carbs: Math.round(carbs * 10) / 10,
    protein: Math.round(protein * 10) / 10,
    fat: Math.round(fat * 10) / 10,
  };
}

// ====== Update profile with calculated BMR/BMI ======
export function recalcProfile(): void {
  const profile = loadProfile();
  profile.bmr = calcBMR(profile.currentWeight, profile.height, profile.age, profile.gender);
  profile.bmi = calcBMI(profile.currentWeight, profile.height);
  saveProfile(profile);
}
