import Expo from "expo";
import React, { Component } from "react";
import * as THREE from "three";
import ExpoTHREE from "expo-three"

export default class App extends Component {  
    render() {    
       return(       
          <Expo.GLView           
          style={{ flex: 1 }}           
          onContextCreate={this._onGLContextCreate}/>    
          )
      }
}

_onGLContextCreate = async (gl) => {
    const arSession = await this._glView.startARSessionAsync();
    // 1. Scene
    var scene = new THREE.Scene(); 
    // 2. Camera
    const camera = ExpoTHREE.createARCamera(
    arSession,width,height,0.01,1000);
    this.scene.background = ExpoTHREE.createARBackgroundTexture(
    arSession,
    renderer
    );
    // 3. Renderer
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // Define our shape (Below is a tetrahedron, but can be whatever)
    const geometry = new THREE.TetrahedronBufferGeometry(0.1, 0)
    // Define the material, Below is material with hex color #00ff00
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // For custom material of any image, simply download any image into your project and use:
    // Define the full 3-D object
    const objectToRender = new THREE.Mesh(geometry, material);
    // Specifying the cameras Z position will allow the object to appear in front of the camera rather that in line (which the camera which is the default)
    camera.position.z = 2;

    scene.add(objectToRender);

  }