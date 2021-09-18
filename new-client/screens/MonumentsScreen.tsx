import React, { useState } from 'react';
import { StyleSheets } from 'react-native';
import { Text, View } from '../components/Themed';
import { MonumentBlock } from "../components/MonumentBlock";

export default function MonumentsScreen() {

  const [input, setInput] = useState("");

  return (
    <View style={styles.container}>
      <MonumentBlock></MonumentBlock>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
