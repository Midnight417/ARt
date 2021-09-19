import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { MonumentBlock } from "../components/MonumentBlock";
import { SearchBar } from '../components/SearchBar';
export default function MonumentsScreen() {

  const [search, setInput] = useState("");

  const data = [{
    id: "1",
    name: "Socrates Statue",
    owner: "Leo Tian",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Socrates_Louvre.jpg",
    description: " A statue of Socrates. Socrates was a Greek philosopher from Athens who is credited as a founder of Western philosophy and the first moral philosopher of the Western ethical tradition of thought."
  }, {
    id: "2",
    name: "Socrates Painting",
    owner: "Leo Tian",
    image: "https://www.history.com/.image/t_share/MTU3ODc5MDg2NDMzNTEwNzI5/death-of-socrates.jpg",
    description: " A statue of Socrates. Socrates was a Greek philosopher from Athens who is credited as a founder of Western philosophy and the first moral philosopher of the Western ethical tradition of thought."
  }];

  const filteredData = data.filter(item => RegExp(search).test(item.name))

  return (
    <View>
      <SafeAreaView style={styles.container}>

      <SearchBar useInput={[search, setInput]} />

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
            >
              {item.description}
            </MonumentBlock>
          )}
          keyExtractor={item => item.id}
        />

      </SafeAreaView>
    </View>
  );
}

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
  }
});
