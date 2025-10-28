import Voice from "@react-native-voice/voice";
import Tts from "react-native-tts";

export const initVoice = () => {
  Voice.onSpeechResults = () => {}; // set in components
};

export const startListening = async (onResult: (text: string) => void) => {
  try {
    await Voice.start("en-IN"); // or 'hi-IN'
    Voice.onSpeechResults = e => {
      const text = (e.value && e.value[0]) || "";
      onResult(text);
    };
  } catch (err) {
    console.error("Voice start error", err);
  }
};

export const stopListening = async () => {
  try {
    await Voice.stop();
  } catch (err) {
    console.warn(err);
  }
};

export const speak = (text: string) => {
  Tts.speak(text);
};
