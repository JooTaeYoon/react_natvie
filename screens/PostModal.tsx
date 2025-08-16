import { React, useState, useEffect } from 'react';
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import axios from 'axios';

export default function PostModal({ visible, onClose, id, navigation }) {
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [localTitle, setLocalTitle] = useState(title);
  useEffect(() => {
    if (visible) setLocalTitle(title);
  }, [visible, title]);

  const onSave = async () => {
    const payload = await axios.post('http://localhost:8080/api/save', {
      writer,
      title,
      content,
    });
    if (payload.status === 200) {
      Alert.alert('저장 성공', '게시글이 저장되었습니다.');
      onClose();
    }
    setting();
  };

  const setting = () => {
    setWriter('');
    setTitle('');
    setContent('');
  };

  const onUpdate = async () => {
    console.log('postId는', id);
    console.log('writer는', writer);
    console.log('title는', title);
    console.log('content는', content);
    const payload = await axios.put(`http://localhost:8080/api/update/${id}`, {
      id,
      writer,
      title,
      content,
    });
    if (payload.status === 200) {
      Alert.alert('수정 성공', '게시글이 수정되었습니다.');
      onClose();
    }
    // setting();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>게시글 작성</Text>
          <TextInput
            style={styles.textInput}
            placeholder="작성자"
            value={writer}
            onChangeText={setWriter}
          />
          <TextInput
            style={styles.textInput}
            placeholder="제목"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.textInput}
            placeholder="내용"
            value={content}
            onChangeText={setContent}
            multiline
          />
          <View style={styles.btn}>
            {id ? (
              <>
                <Button title="수정" onPress={onUpdate} />
                <Button title="닫기" onPress={onClose} color="red" />
              </>
            ) : (
              <>
                <Button title="저장" onPress={onSave} />
                <Button title="닫기" onPress={onClose} color="red" />
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
