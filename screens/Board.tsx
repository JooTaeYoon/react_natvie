import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput } from 'react-native';
import axios from 'axios';
import { Separators } from 'react-native/types_generated/index';

export default function Board({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const payload = await axios.get('http://localhost:8080/api/read');
    };

    fetchData();
    // 초기화 작업 등 필요한 경우 여기에 작성
  });

  const save = async (
    flag: boolean,
    content: string,
    title: string,
    writer: string,
  ) => {
    console.info('로그 테스트 !');
    const payload = await axios.post('http://localhost:8080/api/save', {
      content,
      title,
      writer,
    });

    if (flag) {
      // 저장 로직 구현
      console.log('저장된 내용:', content);
    } else {
      // 취소 로직 구현
      console.log('취소됨');
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Board 화면입니다</Text>
      <Modal visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text>게시글 작성</Text>
            <TextInput
              style={styles.textInput}
              value={writer}
              onChangeText={setWriter}
            />
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.textInput}
              placeholder="내용 입력 하시오"
              value={content}
              onChangeText={setContent}
            />
            <View style={styles.btn}>
              <Button
                title="저장"
                onPress={() => save(false, content, title, writer)}
              />
              <Button title="닫기" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      <Button title="게시글 쓰기" onPress={() => setModalVisible(true)} />
      <Button
        title="Home 화면으로 이동"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
