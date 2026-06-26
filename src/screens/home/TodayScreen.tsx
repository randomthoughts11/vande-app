import {
    ConsultationCard,
    EventPreviewCard,
    FaqSection,
    FreeConsultCta,
    HealthProgramGrid,
    HelpSection,
    HomeHeader,
    PromoImageCard,
    ScreeningActionCard,
    VANDESectionHeader,
    WellnessBalanceCard,
} from "@/components/features/home";
import {
    HOME_COLORS,
    HOME_CONNECT_APP,
    HOME_MIND_BODY,
    HOME_SPACING,
} from "@/constants/home-mock";
import { useAppNavigation } from "@/hooks";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** VANDE screen 1 — Home dashboard (pixel-matched) */
export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const {
    goToLearn,
    goToChat,
    goToConsultIntro,
    goToBookAppointment,
    goToConsult,
  } = useAppNavigation();

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={HOME_COLORS.headerGreen}
      />

      <HomeHeader onNotificationPress={() => {}} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <ScreeningActionCard onPress={goToConsultIntro} />

        <View style={styles.section}>
          <ConsultationCard
            onAddToCalendar={() => {}}
            onReschedule={goToConsult}
          />
        </View>

        <View style={styles.section}>
          <VANDESectionHeader title="Explore Events" onAction={goToLearn} />
          <EventPreviewCard onPress={goToLearn} />
        </View>

        <View style={styles.section}>
          <VANDESectionHeader title="Your Wellness Balance" />
          <WellnessBalanceCard onPress={goToConsultIntro} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{HOME_MIND_BODY.sectionTitle}</Text>
          <Text style={styles.sectionDescription}>
            {HOME_MIND_BODY.sectionDescription}
          </Text>
          <PromoImageCard
            title={HOME_MIND_BODY.cardTitle}
            description={HOME_MIND_BODY.cardDescription}
            actionLabel={HOME_MIND_BODY.actionLabel}
            imageUri={HOME_MIND_BODY.imageUri}
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {HOME_CONNECT_APP.sectionTitle}
          </Text>
          <Text style={styles.sectionDescription}>
            {HOME_CONNECT_APP.sectionDescription}
          </Text>
          <PromoImageCard
            title={HOME_CONNECT_APP.cardTitle}
            description={HOME_CONNECT_APP.cardDescription}
            actionLabel={HOME_CONNECT_APP.actionLabel}
            imageUri={HOME_CONNECT_APP.imageUri}
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <VANDESectionHeader title="Explore our Health Programs" />
          <HealthProgramGrid onProgramPress={goToBookAppointment} />
          <FreeConsultCta onPress={goToConsultIntro} />
        </View>

        <View style={styles.section}>
          <VANDESectionHeader
            title="Your Questions, Answered"
            onAction={() => {}}
          />
          <FaqSection />
        </View>

        <View style={styles.section}>
          <VANDESectionHeader title="Need Help?" />
          <HelpSection
            onItemPress={(id) => (id === "message" ? goToChat() : undefined)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: HOME_COLORS.pageBackground,
  },
  scroll: {
    paddingHorizontal: HOME_SPACING.screenX,
    paddingTop: 16,
    gap: HOME_SPACING.sectionGap,
  },
  section: {
    gap: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: HOME_COLORS.textPrimary,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: HOME_COLORS.textBody,
    lineHeight: 20,
    marginBottom: 12,
  },
});
