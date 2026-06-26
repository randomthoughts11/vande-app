import {
    IntakeBrandHeader,
    IntakeFooterNav,
    IntakeHeader,
    IntakeProgressBar,
    IntakeQuestionCard,
} from "@/components/features/intake";
import {
    INTAKE_COLORS,
    INTAKE_FONTS,
    INTAKE_REVIEW_SECTIONS,
} from "@/constants/intake-mock";
import {
    getPrevStepId,
    intakeHref,
    intakeStepHref,
} from "@/lib/intake-navigation";
import { useRouter } from "expo-router";
import {
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";

/** VANDE intake review & submit */
export default function IntakeReviewScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <IntakeHeader />
      <IntakeBrandHeader onSaveExit={() => router.back()} />
      <IntakeProgressBar
        section="Review"
        step={17}
        totalSteps={17}
        filledSegments={3}
        totalSegments={3}
      />
      <Text style={styles.reviewTitle}>Review & Submit</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        <IntakeQuestionCard>
          <Text style={styles.heading}>Check if this feels right.</Text>
          <Text style={styles.sub}>
            Take a quick look through your answers before you submit.
          </Text>
          <View style={styles.callout}>
            <Text style={styles.calloutText}>
              <Text style={styles.calloutBold}>
                You can still edit any section.
              </Text>{" "}
              Perfect wording is not important — just make sure the main points
              feel accurate.
            </Text>
          </View>
        </IntakeQuestionCard>

        {INTAKE_REVIEW_SECTIONS.map((section) => (
          <IntakeQuestionCard key={section.id} style={styles.sectionCard}>
            <Text style={styles.sectionLabel}>{section.label}</Text>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Pressable style={styles.editBtn}>
              <Text style={styles.editBtnText}>Edit section</Text>
            </Pressable>
            {section.questions.map((q) => (
              <View key={q.question} style={styles.answerBox}>
                <Text style={styles.question}>{q.question}</Text>
                <Text style={styles.answer}>{q.answer}</Text>
              </View>
            ))}
          </IntakeQuestionCard>
        ))}
      </ScrollView>

      <IntakeFooterNav
        onBack={() => {
          const prev = getPrevStepId("stress");
          if (prev) router.push(intakeStepHref(prev));
        }}
        onNext={() => router.push(intakeHref("/intake/booking-confirmed"))}
        nextLabel="Submit intake →"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: INTAKE_COLORS.background },
  reviewTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: INTAKE_COLORS.primaryGreen,
    marginVertical: 8,
    fontFamily: INTAKE_FONTS.sans,
  },
  scroll: { paddingVertical: 16, gap: 16 },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: INTAKE_COLORS.primaryGreen,
    fontFamily: INTAKE_FONTS.serif,
    marginBottom: 8,
  },
  sub: {
    fontSize: 14,
    color: INTAKE_COLORS.textSecondary,
    fontFamily: INTAKE_FONTS.sans,
    marginBottom: 16,
  },
  callout: {
    backgroundColor: INTAKE_COLORS.innerAnswerBg,
    borderRadius: 12,
    padding: 16,
  },
  calloutText: {
    fontSize: 14,
    lineHeight: 21,
    color: INTAKE_COLORS.textSecondary,
    fontFamily: INTAKE_FONTS.sans,
  },
  calloutBold: { fontWeight: "700", color: INTAKE_COLORS.textPrimary },
  sectionCard: { marginTop: 0 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    color: INTAKE_COLORS.textMuted,
    fontFamily: INTAKE_FONTS.sans,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: INTAKE_COLORS.primaryGreen,
    fontFamily: INTAKE_FONTS.serif,
    marginVertical: 8,
  },
  editBtn: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: INTAKE_COLORS.border,
    marginBottom: 16,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: INTAKE_COLORS.primaryGreen,
    fontFamily: INTAKE_FONTS.sans,
  },
  answerBox: {
    backgroundColor: INTAKE_COLORS.innerAnswerBg,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  question: {
    fontSize: 13,
    color: INTAKE_COLORS.textMuted,
    fontFamily: INTAKE_FONTS.sans,
  },
  answer: {
    fontSize: 18,
    color: INTAKE_COLORS.primaryGreen,
    fontFamily: INTAKE_FONTS.serif,
  },
});
