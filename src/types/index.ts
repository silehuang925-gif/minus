export interface UserProfile {
  name: string;
  avatar?: string;       // base64 image
  height: number;        // cm
  currentWeight: number; // kg
  age: number;
  gender: 'male' | 'female';
  activityLevel: ActivityLevel;
  initialWeight: number;  // kg, 初始体重
  targetWeight: number;  // kg
  bmr: number;
  bmi: number;
}

export type ActivityLevel = '卧床休息' | '久坐办公' | '轻度活动' | '中度活动' | '高强度活动' | '运动员级别';

export interface WeightRecord {
  id: string;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:MM
  weight: number; // kg
  timestamp: number;
}

export interface FoodRecord {
  id: string;
  date: string;
  time: string;
  mealType: MealType;
  foodName: string;
  amount: number;    // 克
  unit: '克' | '份';
  calories: number;  // 本项热量
  carbs: number;     // 碳水 g
  protein: number;   // 蛋白 g
  fat: number;       // 脂肪 g
  timestamp: number;
}

export type MealType = '早餐' | '午餐' | '晚餐' | '加餐';

export interface ExerciseRecord {
  id: string;
  date: string;
  time: string;
  type: ExerciseType;
  duration: number;   // 分钟
  calories: number;   // 估算消耗
  timestamp: number;
}

export type ExerciseType = '跑步' | '骑行' | '游泳' | '力量训练' | '瑜伽' | '篮球' | '足球' | '羽毛球' | '乒乓球' | '网球' | '排球' | '徒步' | '爬楼梯' | '跳绳' | '跳舞' | '椭圆机' | '划船机' | '其他';

export interface Recipe {
  id: string;
  name: string;
  calories: number;       // 一人份热量 (kcal)
  carbs: number;          // 碳水 g
  protein: number;        // 蛋白 g
  fat: number;            // 脂肪 g
  category: RecipeCategory; // 主食/荤菜/素菜/汤/小吃
  cuisine: string;        // 菜系
}

export type RecipeCategory = '主食' | '荤菜' | '素菜' | '汤品' | '小吃';

export interface MealPlan {
  items: Recipe[];
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFat: number;
  matchScore: number;     // 与目标的匹配度 %
}

export interface CustomFood {
  id: string;
  name: string;
  caloriesPer100g: number;
  carbsPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  defaultPortion: number; // 默认克数
  note: string;
}

export interface FoodItem {
  name: string;
  caloriesPer100g: number;
  carbsPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  category: string;
}

export interface DailySummary {
  budget: number;        // 当日预算 = BMR + 运动消耗
  bmr: number;           // 基础代谢
  exerciseCalories: number; // 今日运动消耗
  intake: number;        // 今日已摄入
  remaining: number;     // 还能吃
  carbs: number;         // 已摄入碳水
  protein: number;       // 已摄入蛋白
  fat: number;           // 已摄入脂肪
}

export type PageRoute = 'dashboard' | 'diary' | 'settings' | 'food-search';
