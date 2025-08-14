import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function News({ navigation }) {
  return (
    <View>
      <Text>뉴스 페이지입니다</Text>
      <Button
        title="board 페이지로 이동"
        onPress={() => navigation.navigate('보더')}
      />
    </View>
  );
}
