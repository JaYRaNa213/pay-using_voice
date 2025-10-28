import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MicButton from "../components/buttons/MicButton";
import VoiceVisualizer from "../components/visualizers/VoiceVisualizer";
import { useVoiceCommand } from "../hooks/useVoiceCommand";
import { TransactionContext } from "../context/TransactionContext";

const VoiceCommandScreen = () => {
  const { processCommand } = useContext(TransactionContext);
  const [isListening, setIsListening] = useState(false);
  const { transcript, startListening, stopListening, processing } = useVoiceCommand();

  const handleMicPress = async () => {
    if (isListening) {
      setIsListening(false);
      stopListening();
      if (transcript) {
        const result = await processCommand(transcript);
        if (!result.success) {
          Alert.alert("Error", "Could not process command");
        }
      }
    } else {
      setIsListening(true);
      startListening();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speak your command</Text>
      <VoiceVisualizer active={isListening} />
      <MicButton listening={isListening} onPress={handleMicPress} />
      {processing && <Text style={styles.processing}>Processing your voice...</Text>}
      {transcript ? <Text style={styles.transcript}>🗣️ {transcript}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 20 },
  transcript: { marginTop: 20, color: "#333", fontSize: 16, textAlign: "center" },
  processing: { marginTop: 10, color: "#007AFF", fontSize: 15 },
});

export default VoiceCommandScreen;
