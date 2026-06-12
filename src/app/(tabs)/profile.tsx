import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronRight,
  ExternalLink,
  LogOut,
  MessageCircle,
  Shield,
  Users,
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getFamilyMembers, requestDataDeletion, signOut } from '@/lib/api';
import { registerForPushNotifications } from '@/lib/notifications';
import { openVandeCart } from '@/lib/vandecart';
import { useAuthStore } from '@/store/authStore';
import { colors, spacing, typography } from '@/lib/theme';
import { useQuery } from '@tanstack/react-query';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, reset, setAuthenticated, setProfile } = useAuthStore();
  const [notifications, setNotifications] = useState(true);

  const { data: family } = useQuery({
    queryKey: ['family'],
    queryFn: getFamilyMembers,
  });

  useEffect(() => {
    if (notifications) registerForPushNotifications();
  }, [notifications]);

  const handleLogout = async () => {
    await signOut();
    await reset();
    setAuthenticated(false);
    setProfile(null);
    router.replace('/(auth)/welcome');
  };

  const handleDataDeletion = async () => {
    Alert.alert(
      'Request data deletion',
      'We will process your request within 30 days per our privacy policy.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Request',
          onPress: async () => {
            const { ticketId } = await requestDataDeletion();
            Alert.alert('Request submitted', `Ticket: ${ticketId}`);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <Card variant="elevated">
          <Text style={styles.name}>
            {profile?.firstName} {profile?.lastName}
          </Text>
          <Text style={styles.email}>{profile?.email}</Text>
          <Text style={styles.memberSince}>Vande Wellness Member</Text>
        </Card>

        <SectionHeader title="Family profiles" />
        {family?.map((member) => (
          <Card key={member.id} style={styles.familyCard}>
            <Users size={18} color={colors.primaryGreen} />
            <View style={styles.familyInfo}>
              <Text style={styles.familyName}>
                {member.firstName} {member.lastName}
              </Text>
              <Text style={styles.familyRelation}>{member.relationship}</Text>
            </View>
          </Card>
        ))}

        <Pressable onPress={() => router.push('/membership')} style={styles.menuItem}>
          <Card>
            <View style={styles.menuRow}>
              <Text style={styles.menuText}>Membership & plans</Text>
              <ChevronRight size={20} color={colors.mutedText} />
            </View>
          </Card>
        </Pressable>

        <Pressable onPress={() => openVandeCart()} style={styles.menuItem}>
          <Card>
            <View style={styles.menuRow}>
              <Text style={styles.menuText}>Shop VandeCart</Text>
              <ExternalLink size={18} color={colors.primaryGreen} />
            </View>
          </Card>
        </Pressable>

        <Pressable onPress={() => router.push('/chat')} style={styles.menuItem}>
          <Card>
            <View style={styles.menuRow}>
              <MessageCircle size={18} color={colors.primaryGreen} />
              <Text style={[styles.menuText, styles.menuTextFlex]}>Messages</Text>
              <ChevronRight size={20} color={colors.mutedText} />
            </View>
          </Card>
        </Pressable>

        <SectionHeader title="Settings" />
        <Card>
          <View style={styles.settingRow}>
            <Text style={styles.menuText}>Push notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ true: colors.primaryGreen }}
              accessibilityLabel="Toggle push notifications"
            />
          </View>
        </Card>

        <Pressable onPress={() => router.push('/(auth)/consent')} style={styles.menuItem}>
          <Card>
            <View style={styles.menuRow}>
              <Shield size={18} color={colors.primaryGreen} />
              <Text style={[styles.menuText, styles.menuTextFlex]}>Privacy & consent</Text>
              <ChevronRight size={20} color={colors.mutedText} />
            </View>
          </Card>
        </Pressable>

        <Button
          title="Request data deletion"
          variant="outline"
          onPress={handleDataDeletion}
          fullWidth
          style={styles.deletionBtn}
        />

        <Button
          title="Log out"
          variant="ghost"
          onPress={handleLogout}
          fullWidth
          style={styles.logoutBtn}
        />
        <View style={styles.logoutIcon}>
          <LogOut size={16} color={colors.danger} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.md },
  title: { ...typography.h1, color: colors.deepGreen, fontSize: 24 },
  name: { ...typography.h3, color: colors.ink },
  email: { ...typography.bodySmall, color: colors.mutedText },
  memberSince: { ...typography.caption, color: colors.gold, marginTop: spacing.sm },
  familyCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  familyInfo: { flex: 1 },
  familyName: { ...typography.label, color: colors.ink },
  familyRelation: { ...typography.caption, color: colors.mutedText },
  menuItem: { marginBottom: spacing.sm },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  menuText: { ...typography.body, color: colors.ink },
  menuTextFlex: { flex: 1 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  deletionBtn: { marginTop: spacing.md },
  logoutBtn: { marginTop: spacing.sm },
  logoutIcon: { display: 'none' },
});
