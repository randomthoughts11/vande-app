import {
    GeneralNotificationRow,
    MessagesFab,
    MessagesHeader,
    MessagesSearchBar,
    MessagesTabBar,
    MessageThreadRow,
} from "@/components/features/messages";
import {
    GENERAL_NOTIFICATIONS,
    MESSAGE_THREADS,
    MESSAGES_COLORS,
    MESSAGES_SPACING,
    type MessageTab,
} from "@/constants/messages-mock";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** VANDE screens 4–5 — Messages inbox */
export default function MessagesListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<MessageTab>("messages");
  const [query, setQuery] = useState("");

  const filteredThreads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MESSAGE_THREADS;
    return MESSAGE_THREADS.filter(
      (t) =>
        t.sender.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.preview.toLowerCase().includes(q),
    );
  }, [query]);

  const filteredNotifications = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GENERAL_NOTIFICATIONS;
    return GENERAL_NOTIFICATIONS.filter(
      (n) =>
        n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q),
    );
  }, [query]);

  const unreadGeneralCount = GENERAL_NOTIFICATIONS.filter(
    (n) => n.unread,
  ).length;

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={MESSAGES_COLORS.background}
      />

      <MessagesHeader />
      <MessagesTabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        generalBadgeCount={unreadGeneralCount}
      />

      <View style={styles.searchWrap}>
        <MessagesSearchBar value={query} onChangeText={setQuery} />
      </View>

      {activeTab === "messages" ? (
        <FlatList
          data={filteredThreads}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <MessageThreadRow
              thread={item}
              isLast={index === filteredThreads.length - 1}
              onPress={() => router.push(`/chat/${item.id}`)}
            />
          )}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <GeneralNotificationRow
              notification={item}
              isLast={index === filteredNotifications.length - 1}
              onViewMessage={() => {
                if (item.threadId) router.push(`/chat/${item.threadId}`);
              }}
              onPress={() => {
                if (item.threadId) router.push(`/chat/${item.threadId}`);
              }}
            />
          )}
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === "messages" ? (
        <MessagesFab onPress={() => router.push("/chat/thread-1")} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: MESSAGES_COLORS.background,
  },
  searchWrap: {
    paddingHorizontal: MESSAGES_SPACING.screenX,
    paddingVertical: 16,
  },
});
