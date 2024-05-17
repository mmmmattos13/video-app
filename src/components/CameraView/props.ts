import { Camera } from "expo-camera";

export interface CameraViewProps {
    cameraRef: React.MutableRefObject<any>
    isRecording: boolean
    onRecording: () => void
    onStopRecording: () => void
}