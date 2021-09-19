import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { MonumentBlock } from '../components/MonumentBlock';
import { SearchBar } from '../components/SearchBar';
import { Text, View } from '../components/Themed';
import { MonumentInfo } from '../types';
import { getMarketNFTs } from '../blockchain/walletTest';

export default function StoreScreen() {
  const [search, setInput] = React.useState("");

  const [data, setData] = React.useState<MonumentInfo[]>([]);

  getMarketNFTs().then((nfts) => {
    console.log("hello" + nfts);
    setData(nfts.map((nft: any) => ({
      id: nft.tokenId,
      name: nft.title,
      owner: nft.owner,
      creator: nft.seller,
      coordinates: { latitude: nft.lat, longitude: nft.long },
      image: nft.previewUri,
      description: nft.description,
      value: nft.price,
      views: 0,
    })))
  });

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

