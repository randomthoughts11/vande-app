import {
    MenuFooter,
    MenuProfileCard,
    MenuScreenHeader,
    MenuSectionList,
} from "@/components/features/menu";
import {
    MENU_COLORS,
    MENU_SECTIONS,
    MENU_SPACING,
} from "@/constants/menu-mock";
import { useAppNavigation } from "@/hooks";
import { signOut } from "@/lib/api";
import { openVandeCart } from "@/lib/vandecart";
import { useAuthStore } from "@/store/authStore";
import { aiConsultHref } from "@/lib/ai-consult-navigation";
import { useRouter } from "expo-router";
import { Alert, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** VANDE screen 3 — Menu / Profile */
export default function MenuScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { goToLearn } = useAppNavigation();
  const { profile, reset, setAuthenticated, setProfile } = useAuthStore();

  const displayName = profile
    ? `${profile.firstName} ${profile.lastName}`.trim() || "Member"
    : "Member";
  const displayEmail = profile?.email ?? "";

  const handleLogout = async () => {
    await signOut();
    await reset();
    setAuthenticated(false);
    setProfile(null);
    router.replace("/(auth)/welcome");
  };

  const handleItemPress = (sectionId: string, itemId: string) => {
    if (sectionId === "general") {
      switch (itemId) {
        case "events":
          goToLearn();
          return;
        case "shop":
          openVandeCart();
          return;
        case "wellness-assessment":
          router.push("/(auth)/onboarding");
          return;
        case "nuggets":
          router.push("/(tabs)/consult");
          return;
        default:
          break;
      }
    }

    if (sectionId === "health") {
      switch (itemId) {
        case "ai-consult":
          router.push(aiConsultHref());
          return;
        case "my-plan":
          router.push("/(tabs)/plan");
          return;
        case "order-history":
          openVandeCart();
          return;
        case "medical-reports":
          router.push("/chat");
          return;
        default:
          Alert.alert(
            "Coming soon",
            "This feature will be available in a future update.",
          );
      }
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={MENU_COLORS.background}
      />

      <MenuScreenHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <MenuProfileCard
          name={displayName}
          email={displayEmail}
          onPress={() => {}}
        />

        {MENU_SECTIONS.map((section) => (
          <MenuSectionList
            key={section.id}
            section={section}
            onItemPress={handleItemPress}
          />
        ))}

        <MenuFooter onLogout={handleLogout} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: MENU_COLORS.background,
  },
  scroll: {
    paddingHorizontal: MENU_SPACING.screenX,
    gap: MENU_SPACING.sectionGap,
  },
});
