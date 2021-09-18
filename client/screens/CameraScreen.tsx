import * as React from 'react';
import { StyleSheet } from 'react-native';
import Expo from 'expo';
import ExpoTHREE, { three } from 'expo-three';
import ExpoGraphics from 'expo-graphics';

import { Text, View } from '../components/Themed';

const onContextCreate = async ({gl, scale, width, height, arSession}) => {
  // Initialize renderer…
  var renderer = ExpoTHREE.createRenderer({gl});
  renderer = setPixelRatio(scale);
  renderer.setSize(width, height);
  
  // Initialize scene…
  var scene = new three.Scene();
  scene.background =  ExpoTHREE.createARBackgroundTexture(arSession, renderer);
  
  // Initialize camera…
  var camera = ExpoTHREE.createARCamera(arSession, width / scale,
      height / scale, 0.01, 1000);
  
  // Initialize lighting…
  var ambientLight = new three.AmbientLight(0xaaaaaa);
  scene.add(ambientLight);
 }

 const onRender = (renderer, scene, camera) => {
   renderer.render(scene, camera);
 }

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <ExpoGraphics.View style={{flex:1}}
         onContextCreate={onContextCreate}
         onRender={ ()=> {
           onRender(renderer, scene, camera);
         } }
         arEnabled={true}
       />
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
