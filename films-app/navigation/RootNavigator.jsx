import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();


function HomeStackNavigator() {
return (
<HomeStack.Navigator>
<HomeStack.Screen name="HomeList" component={HomeScreen} options={{ title: 'Films' }} />
<HomeStack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail' }} />
</HomeStack.Navigator>
);
}


export default function RootNavigator() {
return (
<Tab.Navigator screenOptions={{ headerShown: false }}>
<Tab.Screen name="Home" component={HomeStackNavigator} />
<Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
);
}