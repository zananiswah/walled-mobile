import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#19918F' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home', headerShown: false,
          tabBarIcon: ({ color }) => <Entypo size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          title: 'Transfer',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="bank-transfer" color={color} />,
        }}
      />
      <Tabs.Screen
        name="topup"
        options={{
          title: 'Top Up',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="wallet" color={color} />,
        }}
      />
    </Tabs>
  );
}
