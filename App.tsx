import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Board from './screens/Board';
import News from './screens/News';
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
      <Button
        title="뉴스 페이지로 이동"
        onPress={() => navigation.navigate('뉴스 페이지')}
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
        <Stack.Screen name="뉴스 페이지" component={News} />
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
});
