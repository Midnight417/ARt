import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import { getNFTs } from '../blockchain/walletTest';
import { Text, View } from '../components/Themed';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  const [nftmarkers, setNftmarkers] = React.useState<any[]>([]);
  getNFTs().then((nfts) => {
    console.log("hello"+nfts);
    setNftmarkers(nfts.map((nft) => {
      return <Marker coordinate={{ latitude: nft.latitude, longitude: nft.longitude }} title={nft.title} description={nft.details} />;
    }));
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      <MapView style={styles.map}>
        { nftmarkers }
      </MapView>
    </View>
  );
  // { nfts.map((nft) => <Marker coordinate={{ latitude: nft.latitude, longitude: nft.longitude }} title={nft.title} description={nft.details} />) }
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
