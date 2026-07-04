import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, MealPlanScreen, ShoppingListScreen, ProfileScreen } from '../screens';
import { MainTabParamList } from '../types/navigation';
import { colors } from '../constants/theme';
import { useLocale } from '../i18n';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainNavigator() {
  const { t } = useLocale();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t.nav_home,
          tabBarLabel: t.nav_home,
        }}
      />
      <Tab.Screen
        name="MealPlan"
        component={MealPlanScreen}
        options={{
          title: t.nav_mealPlan,
          tabBarLabel: t.nav_mealPlan,
        }}
      />
      <Tab.Screen
        name="ShoppingList"
        component={ShoppingListScreen}
        options={{
          title: t.nav_shopping,
          tabBarLabel: t.nav_shopping,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t.nav_profile,
          tabBarLabel: t.nav_profile,
        }}
      />
    </Tab.Navigator>
  );
}
