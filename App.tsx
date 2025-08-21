import React from 'react';
import { Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import MyProfile from './screens/MyProfile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Board from './screens/Board';
import BoardOne from './screens/BoardOne';
import PostModal from './screens/PostModal';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Board 화면으로 이동"
        onPress={() => navigation.navigate('보더')}
      />
      <View style={styles.topRight}>
        <TouchableOpacity>
          <Icon
            name="person"
            size={40}
            onPress={() => navigation.navigate('내 프로필')}
          />
        </TouchableOpacity>
      </View>
      <Button
        title="내 프로필"
        onPress={() => navigation.navigate('내 프로필')}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="보더"
          component={Board}
          // options={{ headerShown: false }}
        />
        <Stack.Screen name="내 프로필" component={MyProfile} />
        <Stack.Screen name="getOne" component={BoardOne} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRight: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
