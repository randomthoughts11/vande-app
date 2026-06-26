import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Upload } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MESSAGES_COLORS, MESSAGES_FONTS, MESSAGES_SPACING } from '@/constants/messages-mock';

interface ReplyBottomSheetProps {
  visible: boolean;
  message: string;
  onChangeMessage: (text: string) => void;
  onClose: () => void;
  onSend: () => void;
}

export function ReplyBottomSheet({
  visible,
  message,
  onChangeMessage,
  onClose,
  onSend,
}: ReplyBottomSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose} accessibilityRole="button">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboard}
        >
          <Pressable
            style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.title}>Reply</Text>

            <Text style={styles.label}>Message</Text>
            <TextInput
              value={message}
              onChangeText={onChangeMessage}
              placeholder="Enter your message"
              placeholderTextColor={MESSAGES_COLORS.placeholder}
              style={styles.input}
              multiline
              textAlignVertical="top"
              accessibilityLabel="Reply message"
            />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Upload file"
              style={({ pressed }) => [styles.uploadArea, pressed && styles.uploadPressed]}
            >
              <Upload size={20} color={MESSAGES_COLORS.sendGreen} strokeWidth={2} />
              <Text style={styles.uploadText}>Upload File</Text>
            </Pressable>

            <View style={styles.actions}>
              <Pressable
                onPress={onClose}
                accessibilityRole="button"
                style={({ pressed }) => [styles.cancelBtn, pressed && styles.btnPressed]}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={onSend}
                accessibilityRole="button"
                style={({ pressed }) => [styles.sendBtn, pressed && styles.btnPressed]}
              >
                <Text style={styles.sendText}>Send</Text>
              </Pressable>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  keyboard: {
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: MESSAGES_COLORS.sheetBackground,
    borderTopLeftRadius: MESSAGES_SPACING.sheetRadius,
    borderTopRightRadius: MESSAGES_SPACING.sheetRadius,
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: MESSAGES_COLORS.textPrimary,
    fontFamily: MESSAGES_FONTS.sans,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: MESSAGES_COLORS.textBody,
    fontFamily: MESSAGES_FONTS.sans,
  },
  input: {
    backgroundColor: MESSAGES_COLORS.background,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 100,
    fontSize: 15,
    color: MESSAGES_COLORS.textPrimary,
    fontFamily: MESSAGES_FONTS.sans,
  },
  uploadArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: MESSAGES_COLORS.uploadBackground,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: MESSAGES_COLORS.sendGreen,
    borderRadius: 8,
    paddingVertical: 16,
  },
  uploadPressed: { opacity: 0.9 },
  uploadText: {
    fontSize: 15,
    fontWeight: '600',
    color: MESSAGES_COLORS.sendGreen,
    fontFamily: MESSAGES_FONTS.sans,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: MESSAGES_COLORS.textPrimary,
    backgroundColor: MESSAGES_COLORS.background,
    alignItems: 'center',
  },
  sendBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 28,
    backgroundColor: MESSAGES_COLORS.sendGreen,
    alignItems: 'center',
  },
  btnPressed: { opacity: 0.9 },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: MESSAGES_COLORS.textPrimary,
    fontFamily: MESSAGES_FONTS.sans,
  },
  sendText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: MESSAGES_FONTS.sans,
  },
});
