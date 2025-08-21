import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import axios from 'axios';
import PostModal from './PostModal';
import { useFocusEffect } from '@react-navigation/native';

export default function Board({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState(null);
  const [posts, setPosts] = useState([]); // 게시글 목록 상태 추가

  const BASE_URL =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:8080'
      : 'http://localhost:8080';

  const fetchData = async () => {
    const payload = await axios.get(`${BASE_URL}/api/read`);
    const data = payload.data;
    setPosts(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData(); // 게시글 목록 새로고침 함수
    }, []),
  );

  return (
    <View style={styles.container}>
      <Button title="게시글 쓰기" onPress={() => setModalVisible(true)} />
      <FlatList
        style={{ width: '100%' }}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postItem}
            onPress={async () => {
              const id = item.id;
              navigation.navigate('getOne', { id });
            }}
          >
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postWriter}>{item.writer}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
            <Text style={styles.create_at}>{item.create_at}</Text>
            <Text style={styles.text}>{item.id}</Text>
          </TouchableOpacity>
        )}
      />
      <PostModal
        visible={modalVisible}
        writer={writer}
        title={title}
        content={content}
        setWriter={setWriter}
        setTitle={setTitle}
        setContent={setContent}
        setId={setId}
        onClose={() => setModalVisible(false)}
      />
      <>
        <Button
          title="Home 화면으로 이동"
          onPress={() => navigation.navigate('Home')}
        />
        <Button title="새로고침" onPress={() => fetchData()}></Button>
      </>
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
  postItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postWriter: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  postContent: {
    fontSize: 14,
  },
  create_at: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
});
