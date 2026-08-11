import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RecipeSearchScreen, MealPlanScreen, ShoppingListScreen, ProfileScreen } from '../screens';
import { MainTabParamList } from '../types/navigation';
import { colors } from '../constants/theme';
import { useLocale } from '../i18n';

const Tab = createBottomTabNavigator<MainTabParamList>();

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

function tabIcon(name: IoniconName, outlineName: IoniconName) {
  return ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
    <Ionicons name={focused ? name : outlineName} size={size} color={color} />
  );
}

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
        name="RecipeSearch"
        component={RecipeSearchScreen}
        options={{
          title: t.nav_recipes,
          tabBarLabel: t.nav_recipes,
          tabBarIcon: tabIcon('restaurant', 'restaurant-outline'),
        }}
      />
      <Tab.Screen
        name="MealPlan"
        component={MealPlanScreen}
        options={{
          title: t.nav_mealPlan,
          tabBarLabel: t.nav_mealPlan,
          tabBarIcon: tabIcon('calendar', 'calendar-outline'),
        }}
      />
      <Tab.Screen
        name="ShoppingList"
        component={ShoppingListScreen}
        options={{
          title: t.nav_shopping,
          tabBarLabel: t.nav_shopping,
          tabBarIcon: tabIcon('cart', 'cart-outline'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t.nav_profile,
          tabBarLabel: t.nav_profile,
          tabBarIcon: tabIcon('person', 'person-outline'),
        }}
      />
    </Tab.Navigator>
  );
}
