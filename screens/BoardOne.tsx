import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import PostModal from './PostModal';

export default function BoardOne({ route, navigation }) {
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = route.params;

  const fetchData = async () => {
    const payload = await axios.get(`http://localhost:8080/api/read/${id}`);
    const data = payload.data;
    console.log('data: ', data);
    if (payload.status === 201) {
      Alert.alert('데이터 없음', '게시글을 찾을 수 없습니다.');
      navigation.goBack();
      return;
    }
    setFunction(data);
  };

  const setFunction = data => {
    setContent(data.content);
    setWriter(data.writer);
    setTitle(data.title);
    console.log(data);
  };

  const deletePost = async id => {
    const payload = await axios.delete(
      `http://localhost:8080/api/delete/${id}`,
    );
    if (payload.status === 200) {
      Alert.alert('삭제 성공', '게시글이 삭제되었습니다.');
      navigation.goBack();
    }
  };

  useEffect(() => {
    fetchData();
    // 초기화 작업 등 필요한 경우 여기에 작성
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.writer}>작성자: {writer}</Text>
        <View style={styles.separator} />
        <Text style={styles.content}>{content}</Text>
      </View>

      <View>
        <PostModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          setContent={setContent}
          setWriter={setWriter}
          setTitle={setTitle}
          title={title}
          content={content}
          id={id} // ← 이렇게 추가!
        />
      </View>
      <View style={styles.footer}>
        <Button
          title="수정"
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <Button title="삭제" onPress={() => deletePost(id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  writer: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  separator: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginVertical: 12,
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
