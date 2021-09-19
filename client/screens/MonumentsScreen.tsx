import React, { useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, useColorScheme, Text } from 'react-native';
import { View } from '../components/Themed';
import { MonumentBlock } from "../components/MonumentBlock";
import { SearchBar } from '../components/SearchBar';
import { MonumentInfo } from '../types';
import Colors from '../constants/Colors';
import { CreateModal } from '../components/CreateModal';
export default function MonumentsScreen() {

  const [search, setInput] = useState("");
  const colorScheme = useColorScheme();

  const [modalOpen, setModalOpen] = useState(false)

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: 'center',
      marginHorizontal: 20,
    },
    scrollView: {
      width: "100%",
      position: "relative"
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    list: {
      paddingTop: 20,
    },
    button: {
        padding: 8,
  
        width: "100%",
    },
    btnBg: {
        backgroundColor: Colors[colorScheme!].tabIconSelected,
        borderRadius: 8,
    },
    btnText: {
        color: Colors[colorScheme!].background,
  
        padding: 8,
  
        textAlign: "center"
    }
  });
  

  const data: MonumentInfo[] = [{
    id: "1",
    name: "Socrates Statue",
    owner: "Leo Tian",
    creator: "Leo Tian",
    coordinates: { latitude: 51.5078788, longitude: -0.0877321 },
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Socrates_Louvre.jpg",
    description: " A statue of Socrates. Socrates was a Greek philosopher from Athens who is credited as a founder of Western philosophy and the first moral philosopher of the Western ethical tradition of thought.",
    value: 0.1,
    views: 16
  }, {
    id: "2",
    name: "Socrates Painting",
    owner: "Leo Tian",
    creator: "Leo Tian",
    coordinates: { latitude: 51.5078788, longitude: -0.0877321 },
    image: "https://www.history.com/.image/t_share/MTU3ODc5MDg2NDMzNTEwNzI5/death-of-socrates.jpg",
    description: " A statue of Socrates. Socrates was a Greek philosopher from Athens who is credited as a founder of Western philosophy and the first moral philosopher of the Western ethical tradition of thought.",
    value: 0.1,
    views: 16
  }];

  const filteredData = data.filter(item => RegExp(search).test(item.name))

  return (
    <View>
      <SafeAreaView style={styles.container}>

        <SearchBar useInput={[search, setInput]} />

        <Pressable style={styles.button} onPress={() => {
          setModalOpen(true);
        }}>
          <View style={styles.btnBg}>
            <Text style={styles.btnText}>{"Create Monument"}</Text>
          </View>
        </Pressable>

        <FlatList
          directionalLockEnabled
          style={styles.list}
          data={filteredData}
          renderItem={({ item, index }) => (
            <MonumentBlock
              name={item.name}
              owner={item.owner}
              image={item.image}
              pos={index == (filteredData.length - 1) ? "last" : undefined}
              data={item}
            >
              {item.description}
            </MonumentBlock>
          )}
          keyExtractor={item => item.id}
        />

      </SafeAreaView>

      <CreateModal useModalOpen={[modalOpen, setModalOpen]}></CreateModal>
    </View>
  );
}