import React, {useState} from 'react';

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [joblist, setJoblist] = useState<String[]>([]);
  const [job, setJob] = useState('');
  const handleChange = (text: any) => {
    setJob(text);
  };
  const handlePress = () => {
    if (job == '') {
      Alert.alert('Bạn chưa nhập task', 'Vui lòng nhập task');
    } else {
      setJoblist(prevJoblist => [...prevJoblist, job]);
      setJob('');
    }
  };
  const handleDelete = (index: number) => {
    Alert.alert('Xoá công việc', 'Bạn có chắc chắn muốn xoá không?', [
      {
        text: 'Yes',
        onPress: () => {
          if (index === joblist.length - 1) {
            setJoblist(prev => prev.slice(0, prev.length - 1));
          } else {
            setJoblist(prev => prev.filter((_, i) => i !== index));
          }
        },
      },
      {
        text: 'Cancel',
        onPress: () => {
          return;
        },
      },
    ]);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>TODO LIST</Text>
        <ScrollView>
          {joblist.map((element, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => handleDelete(index)}>
                <View style={styles.item}>
                  <View style={styles.icon}>
                    <Text>{index}</Text>
                  </View>
                  <Text>{element}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.InputButton}>
        <TextInput
          style={styles.textInput}
          placeholder="Your task"
          value={job}
          onChangeText={text => handleChange(text)}
        />
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.button}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#eff7f8',
  },
  content: {
    marginVertical: 60,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 25,
    color: 'blue',
    fontWeight: '800',
  },
  item: {
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    marginVertical: 7,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  icon: {
    height: 40,
    width: 45,
    borderRadius: 10,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  footer: {
    height: 70,
  },
  textInput: {
    height: 60,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'cyan',
    marginHorizontal: 7,
    borderRadius: 20,
    flex: 7,
    backgroundColor: 'white',
  },
  InputButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: 'cyan',
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default App;
