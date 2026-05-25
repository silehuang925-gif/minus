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

// ====== Exercise Calorie Estimation ======
export function calcExerciseCalories(
  type: ExerciseType,
  weight: number,
  duration: number, // minutes
  extraValue?: number // km for running
): number {
  switch (type) {
    case '跑步':
      return Math.round(weight * (extraValue || duration / 10) * 1.036);
    case '骑行':
      return Math.round(weight * (duration / 60) * 7.0);
    case '游泳':
      return Math.round(weight * duration * 0.106);
    case '力量训练':
      return Math.round(weight * duration * 0.08);
    case '瑜伽':
      return Math.round(weight * duration * 0.053);
    case '其他':
      return 0; // manual input
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
export function getDailySummary(): DailySummary {
  const profile = loadProfile();
  const todayFoods = getTodayFoodRecords();
  const todayExercises = getTodayExerciseRecords();

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
