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
      const dailySummary = getDailySummary();
      return { ...state, profile, dailySummary };
    }

    case 'SET_WEIGHT_RECORDS':
      return { ...state, weightRecords: action.payload };

    case 'ADD_WEIGHT_RECORD':
      return { ...state, weightRecords: [action.payload, ...state.weightRecords] };

    case 'DELETE_WEIGHT_RECORD':
      return {
        ...state,
        weightRecords: state.weightRecords.filter((r) => r.id !== action.payload),
      };

    case 'SET_FOOD_RECORDS':
      return { ...state, foodRecords: action.payload };

    case 'ADD_FOOD_RECORD':
      return { ...state, foodRecords: [action.payload, ...state.foodRecords] };

    case 'UPDATE_FOOD_RECORD': {
      const records = state.foodRecords.map((r) =>
        r.id === action.payload.id ? { ...r, ...action.payload.updates } : r
      );
      return { ...state, foodRecords: records };
    }

    case 'DELETE_FOOD_RECORD':
      return {
        ...state,
        foodRecords: state.foodRecords.filter((r) => r.id !== action.payload),
      };

    case 'SET_EXERCISE_RECORDS':
      return { ...state, exerciseRecords: action.payload };

    case 'ADD_EXERCISE_RECORD':
      return { ...state, exerciseRecords: [action.payload, ...state.exerciseRecords] };

    case 'DELETE_EXERCISE_RECORD':
      return {
        ...state,
        exerciseRecords: state.exerciseRecords.filter((r) => r.id !== action.payload),
      };

    case 'SET_CUSTOM_FOODS':
      return { ...state, customFoods: action.payload };

    case 'ADD_CUSTOM_FOOD':
      return { ...state, customFoods: [action.payload, ...state.customFoods] };

    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'RECALC_SUMMARY': {
      const dailySummary = getDailySummary();
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
      darkMode: false,
    };
  });

  // Persist on change
  useEffect(() => { saveProfile(state.profile); }, [state.profile]);
  useEffect(() => { saveWeightRecords(state.weightRecords); }, [state.weightRecords]);
  useEffect(() => { saveFoodRecords(state.foodRecords); }, [state.foodRecords]);
  useEffect(() => { saveExerciseRecords(state.exerciseRecords); }, [state.exerciseRecords]);
  useEffect(() => { saveCustomFoods(state.customFoods); }, [state.customFoods]);

  // Dark mode class toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode);
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
