import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';
import { Camera, CameraRecordingOptions } from 'expo-camera';


import { VideoPlayer } from './src/components/VideoPlayer';
import { CameraView } from './src/components/CameraView';

export default function App() {

  const cameraRef = useRef<any>(null);
  const [isRecoding, setIsRecoding] = useState(false);
  const [video, setVideo] = useState<any>();

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicrophonePermission, sethasMicrophonePermission] = useState(false);
  const [hasMediaLibraryPermission, sethasMediaLibraryPermission] = useState(false);
  
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();

      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();

      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      sethasMicrophonePermission(microphonePermission.status === "granted")
      sethasMediaLibraryPermission(mediaLibraryPermission.status === "granted")
    })()
  }, [])

  if (hasCameraPermission === false || hasMicrophonePermission === false){
    return <View />
  }

  if (hasMediaLibraryPermission === false){
    return <View />
  }

  const recordVideo = () => {
    setIsRecoding(true);
    const options: CameraRecordingOptions = {
      maxDuration: 60,
    };

    cameraRef.current?.recordAsync(options).then((recordedVideo: any) => {
      setVideo(recordedVideo);  
      setIsRecoding(false);   
    });
  }

  const stopRecording = () => {
    setIsRecoding(false);
    cameraRef.current?.stopRecording();
  }

  if(video){

    const saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      })
    }

    const shareVideo = () => {
      Sharing.shareAsync(video.uri).then(() => {
        setVideo(undefined);
      })
    }
    
    return (
      <VideoPlayer
        video={video}
        onShare={shareVideo}
        onSave={saveVideo}
        onDelete={() => {setVideo(undefined)}}
      />
    )
  }


  return (
    <CameraView
      cameraRef = {cameraRef}
      isRecording = {isRecoding}
      onRecording = {recordVideo}
      onStopRecording = {stopRecording}
    />    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
