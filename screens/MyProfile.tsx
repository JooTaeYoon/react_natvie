import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';

export default function News({ navigation }) {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const image: string = '이름입니다.';

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    console.log('result: ', result);
    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <TouchableOpacity onPress={pickImage}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 150, height: 150, borderRadius: 75 }}
          />
        ) : (
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              backgroundColor: '#eee',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="person" size={80} color="#aaa" />
          </View>
        )}
      </TouchableOpacity>
      <Button title="사진 선택" onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: '#dfbebedc',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
