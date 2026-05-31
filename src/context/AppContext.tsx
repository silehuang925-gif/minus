import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type {
  UserProfile,
  WeightRecord,
  FoodRecord,
  ExerciseRecord,
  CustomFood,
  DailySummary,
  PageRoute,
} from '@/types';
import {
  loadProfile,
  saveProfile,
  loadWeightRecords,
  saveWeightRecords,
  loadFoodRecords,
  saveFoodRecords,
  loadExerciseRecords,
  saveExerciseRecords,
  loadCustomFoods,
  saveCustomFoods,
} from '@/utils/data';
import { getDailySummary, recalcProfile, calcBMR, calcBMI } from '@/utils/calculator';

// ====== State ======
interface AppState {
  profile: UserProfile;
  weightRecords: WeightRecord[];
  foodRecords: FoodRecord[];
  exerciseRecords: ExerciseRecord[];
  customFoods: CustomFood[];
  dailySummary: DailySummary;
  currentPage: PageRoute;
  pageStack: PageRoute[];
  diaryDate: string | null;
  darkMode: boolean;
}

type Action =
  | { type: 'SET_PROFILE'; payload: UserProfile }
  | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'SET_WEIGHT_RECORDS'; payload: WeightRecord[] }
  | { type: 'ADD_WEIGHT_RECORD'; payload: WeightRecord }
  | { type: 'DELETE_WEIGHT_RECORD'; payload: string }
  | { type: 'SET_FOOD_RECORDS'; payload: FoodRecord[] }
  | { type: 'ADD_FOOD_RECORD'; payload: FoodRecord }
  | { type: 'UPDATE_FOOD_RECORD'; payload: { id: string; updates: Partial<FoodRecord> } }
  | { type: 'DELETE_FOOD_RECORD'; payload: string }
  | { type: 'SET_EXERCISE_RECORDS'; payload: ExerciseRecord[] }
  | { type: 'ADD_EXERCISE_RECORD'; payload: ExerciseRecord }
  | { type: 'DELETE_EXERCISE_RECORD'; payload: string }
  | { type: 'SET_CUSTOM_FOODS'; payload: CustomFood[] }
  | { type: 'ADD_CUSTOM_FOOD'; payload: CustomFood }
  | { type: 'SET_PAGE'; payload: PageRoute }
  | { type: 'GO_BACK' }
  | { type: 'SET_DIARY_DATE'; payload: string | null }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'RECALC_SUMMARY' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };

    case 'UPDATE_PROFILE': {
      const profile = { ...state.profile, ...action.payload };
      // Recalculate BMR/BMI whenever relevant fields change
      if (
        action.payload.currentWeight !== undefined ||
        action.payload.height !== undefined ||
        action.payload.age !== undefined ||
        action.payload.gender !== undefined
      ) {
        profile.bmr = calcBMR(profile.currentWeight, profile.height, profile.age, profile.gender);
        profile.bmi = calcBMI(profile.currentWeight, profile.height);
      }
      const dailySummary = getDailySummary(state.foodRecords, state.exerciseRecords);
      return { ...state, profile, dailySummary };
    }

    case 'SET_WEIGHT_RECORDS':
      return { ...state, weightRecords: action.payload };

    case 'ADD_WEIGHT_RECORD':
      return {
        ...state,
        weightRecords: [action.payload, ...state.weightRecords],
        dailySummary: getDailySummary(state.foodRecords, state.exerciseRecords),
      };

    case 'DELETE_WEIGHT_RECORD':
      return {
        ...state,
        weightRecords: state.weightRecords.filter((r) => r.id !== action.payload),
      };

    case 'SET_FOOD_RECORDS':
      return { ...state, foodRecords: action.payload };

    case 'ADD_FOOD_RECORD': {
      const foods = [action.payload, ...state.foodRecords];
      return { ...state, foodRecords: foods, dailySummary: getDailySummary(foods, state.exerciseRecords) };
    }

    case 'UPDATE_FOOD_RECORD': {
      const records = state.foodRecords.map((r) =>
        r.id === action.payload.id ? { ...r, ...action.payload.updates } : r
      );
      return { ...state, foodRecords: records, dailySummary: getDailySummary(records, state.exerciseRecords) };
    }

    case 'DELETE_FOOD_RECORD': {
      const foods = state.foodRecords.filter((r) => r.id !== action.payload);
      return { ...state, foodRecords: foods, dailySummary: getDailySummary(foods, state.exerciseRecords) };
    }

    case 'SET_EXERCISE_RECORDS':
      return { ...state, exerciseRecords: action.payload };

    case 'ADD_EXERCISE_RECORD': {
      const exercises = [action.payload, ...state.exerciseRecords];
      return { ...state, exerciseRecords: exercises, dailySummary: getDailySummary(state.foodRecords, exercises) };
    }

    case 'DELETE_EXERCISE_RECORD': {
      const exercises = state.exerciseRecords.filter((r) => r.id !== action.payload);
      return { ...state, exerciseRecords: exercises, dailySummary: getDailySummary(state.foodRecords, exercises) };
    }

    case 'SET_CUSTOM_FOODS':
      return { ...state, customFoods: action.payload };

    case 'ADD_CUSTOM_FOOD':
      return { ...state, customFoods: [action.payload, ...state.customFoods] };

    case 'SET_PAGE': {
      const stack = [...state.pageStack, state.currentPage];
      return { ...state, currentPage: action.payload, pageStack: stack };
    }

    case 'GO_BACK': {
      if (state.pageStack.length === 0) return state;
      const prev = state.pageStack[state.pageStack.length - 1];
      return {
        ...state,
        currentPage: prev,
        pageStack: state.pageStack.slice(0, -1),
      };
    }

    case 'SET_DIARY_DATE':
      return { ...state, diaryDate: action.payload };

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'RECALC_SUMMARY': {
      const dailySummary = getDailySummary(state.foodRecords, state.exerciseRecords);
      return { ...state, dailySummary };
    }

    default:
      return state;
  }
}

// ====== Context ======
interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | null>(null);

// ====== Provider ======
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, () => {
    const profile = loadProfile();
    // Recalc BMR/BMI on load
    recalcProfile();
    const updatedProfile = loadProfile();

    return {
      profile: updatedProfile,
      weightRecords: loadWeightRecords(),
      foodRecords: loadFoodRecords(),
      exerciseRecords: loadExerciseRecords(),
      customFoods: loadCustomFoods(),
      dailySummary: getDailySummary(),
      currentPage: 'dashboard' as PageRoute,
      pageStack: [] as PageRoute[],
      diaryDate: null,
      darkMode: localStorage.getItem('minus_darkMode') === 'true',
    };
  });

  // Persist on change
  useEffect(() => { saveProfile(state.profile); }, [state.profile]);
  useEffect(() => { saveWeightRecords(state.weightRecords); }, [state.weightRecords]);
  useEffect(() => { saveFoodRecords(state.foodRecords); }, [state.foodRecords]);
  useEffect(() => { saveExerciseRecords(state.exerciseRecords); }, [state.exerciseRecords]);
  useEffect(() => { saveCustomFoods(state.customFoods); }, [state.customFoods]);

  // Dark mode class toggle + persist
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode);
    localStorage.setItem('minus_darkMode', String(state.darkMode));
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function useDailySummary() {
  return useApp().state.dailySummary;
}

export function useProfile() {
  return useApp().state.profile;
}
