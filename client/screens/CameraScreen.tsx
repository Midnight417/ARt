import React from 'react';
import { View } from 'react-native';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GLView style={{ width: 300, height: 300 }} onContextCreate={onContextCreate} />
    </View>
  );
}

function onContextCreate(gl: ExpoWebGLRenderingContext) {
  // Initialize renderer…
  const renderer = new Renderer({ gl });
  (renderer as any).setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
}