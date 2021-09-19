import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { MonumentBlock } from '../components/MonumentBlock';
import { SearchBar } from '../components/SearchBar';
import { Text, View } from '../components/Themed';
import { MonumentInfo } from '../types';

export default function StoreScreen() {
  const [search, setInput] = React.useState("");

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
              type="store"
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

