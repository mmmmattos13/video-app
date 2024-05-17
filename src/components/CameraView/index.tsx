import React from 'react';
import { Button, TouchableOpacity, View, Text } from 'react-native';

import { styles } from './styles';

import { CameraViewProps } from "./props";
import { Camera } from 'expo-camera';

export function CameraView({cameraRef, isRecording, onRecording, onStopRecording}: CameraViewProps) {
  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonRecord} onPress={isRecording ? onStopRecording : onRecording}>
          <Text style={{color: "black"}}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}