import React from 'react';
import { Button, SafeAreaView, View } from 'react-native';

import { Audio, Video } from 'expo-av';

import { styles } from './styles';

import { VideoPlayerProps } from './props';

export function VideoPlayer({video, onShare, onSave, onDelete} : VideoPlayerProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Video 
        style={styles.video}
        source={{uri: video.uri}}
        useNativeControls        
      />
      <View style={styles.menuButton}>
        <Button title="Share" onPress={onShare} />
        <Button title="Save" onPress={onSave} />
        <Button title="Delete" onPress={onDelete} />
      </View>
    </SafeAreaView>
  );
}