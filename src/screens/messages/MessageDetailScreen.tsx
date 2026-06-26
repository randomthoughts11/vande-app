import {
    MessageDetailBanner,
    MessageDetailContent,
    MessageReplyButton,
    MessagesHeader,
    ReplyBottomSheet,
} from "@/components/features/messages";
import { MESSAGE_DETAIL, MESSAGES_COLORS } from "@/constants/messages-mock";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StatusBar, StyleSheet, View } from "react-native";

/** VANDE screens 13–14 — Message detail + reply sheet */
export default function MessageDetailScreen() {
  const { threadId } = useLocalSearchParams<{ threadId: string }>();
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyText, setReplyText] = useState("");

  const detail =
    MESSAGE_DETAIL.threadId === threadId ? MESSAGE_DETAIL : MESSAGE_DETAIL;

  const handleSend = () => {
    if (!replyText.trim()) return;
    setReplyVisible(false);
    setReplyText("");
    Alert.alert("Message sent", "Your reply has been sent to the care team.");
  };

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={MESSAGES_COLORS.background}
      />

      <MessagesHeader />
      <MessageDetailBanner subject={detail.subject} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <MessageDetailContent
          sender={detail.sender}
          role={detail.role}
          timestamp={detail.timestamp}
          body={detail.body}
        />
      </ScrollView>

      <MessageReplyButton onPress={() => setReplyVisible(true)} />

      <ReplyBottomSheet
        visible={replyVisible}
        message={replyText}
        onChangeMessage={setReplyText}
        onClose={() => setReplyVisible(false)}
        onSend={handleSend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: MESSAGES_COLORS.background,
  },
  scroll: {
    flexGrow: 1,
  },
});
