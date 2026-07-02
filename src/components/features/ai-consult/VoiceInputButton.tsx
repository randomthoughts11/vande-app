import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Mic } from 'lucide-react-native';
import { AI_CONSULT_COLORS, AI_CONSULT_FONTS } from '@/constants/ai-consult-mock';

interface VoiceInputButtonProps {
  onPress?: () => void;
  isListening?: boolean;
  disabled?: boolean;
}

/** Placeholder voice input control for AI consultation */
export function VoiceInputButton({
  onPress,
  isListening = false,
  disabled = false,
}: VoiceInputButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={isListening ? 'Stop voice input' : 'Start voice input'}
      style={({ pressed }) => [
        styles.button,
        isListening && styles.listening,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Mic
        size={22}
        color={isListening ? '#FFFFFF' : AI_CONSULT_COLORS.primaryGreen}
        strokeWidth={2}
      />
      {isListening ? <View style={styles.pulse} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AI_CONSULT_COLORS.accentMint,
    borderWidth: 1,
    borderColor: AI_CONSULT_COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listening: {
    backgroundColor: AI_CONSULT_COLORS.voiceActive,
    borderColor: AI_CONSULT_COLORS.voiceActive,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.88,
  },
  pulse: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: AI_CONSULT_COLORS.voiceActive,
    opacity: 0.35,
  },
});
