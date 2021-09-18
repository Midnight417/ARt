/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, StyleProp, View, ViewStyle, Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import MapScreen from '../screens/MapScreen';
import MonumentsScreen from '../screens/MonumentsScreen';
import CameraScreen from '../screens/CameraScreen';
import StoreScreen from '../screens/StoreScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { StyleSheet } from 'react-native';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  
  const styles = StyleSheet.create({
    centerNavItem: {
      backgroundColor: Colors[colorScheme].background,

      borderWidth: 1,
      borderColor: Colors[colorScheme].tabIconDefault,
      borderRadius: 50,
      
      height: 75,
      width: 75,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      position: "absolute",
      bottom: -5,
    },
    centerNavItemFocused: {
      backgroundColor: Colors[colorScheme].tabIconSelected,

      borderWidth: 1,
      borderColor: Colors[colorScheme].tabIconSelected,
      borderRadius: 50,
      
      height: 75,
      width: 75,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      position: "absolute",
      bottom: -5,
    },
    centerNavText: {
      fontSize: 12,
      marginTop: 4,
    },
  }) as Record<string, StyleProp<ViewStyle>>;

  return (
    <BottomTab.Navigator
      initialRouteName="Map"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }: RootTabScreenProps<'Map'>) => ({
          title: 'Map',
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Models"
        component={MonumentsScreen}
        options={{
          title: 'Monuments',
          tabBarIcon: ({ color }) => <TabBarIcon name="cube" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          title: 'Camera',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.centerNavItemFocused : styles.centerNavItem}>
              <TabBarIcon name="camera" color={focused ? Colors[colorScheme].background : color} />
              <Text style={{
                ...styles.centerNavText as {},
                color: focused ? Colors[colorScheme].background : color
              }}>Camera</Text>
            </View>
          ),
          tabBarLabel: ""
        }}
      />
      <BottomTab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          title: 'Store',
          tabBarIcon: ({ color }) => <TabBarIcon name="store" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}


// headerRight: () => (
//   <Pressable
//     onPress={() => navigation.navigate('Modal')}
//     style={({ pressed }) => ({
//       opacity: pressed ? 0.5 : 1,
//     })}>
//     <FontAwesome
//       name="info-circle"
//       size={25}
//       color={Colors[colorScheme].text}
//       style={{ marginRight: 15 }}
//     />
//   </Pressable>
// ),