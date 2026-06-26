import { categoryColors } from "@/lib/theme";

/**
 * Health concern grid — VANDE screens 7–8 (onboarding / consult focus)
 */
export const HEALTH_CONCERNS = [
  {
    id: "anxiety",
    label: "Anxiety and Depression",
    color: categoryColors.anxiety,
  },
  {
    id: "diabetes",
    label: "Diabetic Complications",
    color: categoryColors.diabetes,
  },
  {
    id: "cholesterol",
    label: "Cholesterol & Triglycerides",
    color: categoryColors.cholesterol,
  },
  { id: "cancer", label: "Cancer Care", color: categoryColors.cancer },
  { id: "arthritis", label: "Arthritis", color: categoryColors.arthritis },
  { id: "sleep", label: "Sleep Quality", color: categoryColors.sleep },
  { id: "digestion", label: "Digestion", color: categoryColors.digestion },
  { id: "headaches", label: "Headaches", color: categoryColors.headaches },
  {
    id: "womens-health",
    label: "Women's Health",
    color: categoryColors.womensHealth,
  },
] as const;

export const HEALTH_CONCERN_FOLLOW_UPS = [
  { id: "digestion", label: "Digestion", color: categoryColors.digestion },
  { id: "headaches", label: "Headaches", color: categoryColors.headaches },
  {
    id: "womens-health",
    label: "Women's Health",
    color: categoryColors.womensHealth,
  },
] as const;
