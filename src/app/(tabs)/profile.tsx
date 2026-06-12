import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import {
  CreditCard,
  ExternalLink,
  MessageCircle,
  Shield,
  ShoppingBag,
  Users,
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MenuRow } from '@/components/ui/MenuRow';
import { PageHeader } from '@/components/ui/PageHeader';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { getFamilyMembers, requestDataDeletion, signOut } from '@/lib/api';
import { registerForPushNotifications } from '@/lib/notifications';
import { openVandeCart } from '@/lib/vandecart';
import { useAuthStore } from '@/store/authStore';
import { colors, layout, radii, spacing, typography } from '@/lib/theme';

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

  const initials = `${profile?.firstName?.[0] ?? ''}${profile?.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <Screen>
      <PageHeader title="Profile" subtitle="Manage your account and preferences" />

      <Card variant="elevated" style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials || 'VW'}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>
              {profile?.firstName} {profile?.lastName}
            </Text>
            <Text style={styles.email}>{profile?.email}</Text>
            <Badge label="Vande Wellness Member" variant="gold" />
          </View>
        </View>
      </Card>

      {family && family.length > 0 ? (
        <View style={styles.section}>
          <SectionHeader title="Family profiles" />
          {family.map((member) => (
            <Card key={member.id} variant="elevated" style={styles.familyCard}>
              <View style={styles.familyRow}>
                <View style={styles.familyIcon}>
                  <Users size={18} color={colors.primaryGreen} />
                </View>
                <View>
                  <Text style={styles.familyName}>
                    {member.firstName} {member.lastName}
                  </Text>
                  <Text style={styles.familyRelation}>{member.relationship}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionHeader title="Membership & shop" />
        <MenuRow
          label="Membership & plans"
          subtitle="View benefits and upgrade"
          icon={CreditCard}
          onPress={() => router.push('/membership')}
        />
        <MenuRow
          label="Shop VandeCart"
          subtitle="Herbal products & wellness kits"
          icon={ShoppingBag}
          onPress={() => openVandeCart()}
          rightElement={<ExternalLink size={18} color={colors.primaryGreen} />}
          showChevron={false}
        />
        <MenuRow
          label="Messages"
          subtitle="Chat with your care team"
          icon={MessageCircle}
          onPress={() => router.push('/chat')}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Settings" />
        <Card variant="elevated">
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Push notifications</Text>
              <Text style={styles.settingDesc}>Generic alerts only — no health details</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ true: colors.primaryGreen, false: colors.border }}
              accessibilityLabel="Toggle push notifications"
            />
          </View>
        </Card>
        <MenuRow
          label="Privacy & consent"
          subtitle="Review your agreements"
          icon={Shield}
          onPress={() => router.push('/(auth)/consent')}
        />
      </View>

      <View style={styles.section}>
        <Button title="Request data deletion" variant="outline" onPress={handleDataDeletion} fullWidth />
        <Button
          title="Log out"
          variant="ghost"
          onPress={handleLogout}
          fullWidth
          style={styles.logoutBtn}
        />
      </View>

      <Text style={styles.version}>Vande Wellness · Demo build</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: { marginBottom: layout.sectionGap },
  profileRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.lightGold,
  },
  avatarText: { ...typography.h3, color: colors.deepGreen },
  profileInfo: { flex: 1, gap: 4 },
  name: { ...typography.h3, color: colors.ink },
  email: { ...typography.bodySmall, color: colors.mutedText },
  section: { marginBottom: layout.sectionGap },
  familyCard: { marginBottom: layout.cardGap },
  familyRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  familyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  familyName: { ...typography.label, color: colors.ink },
  familyRelation: { ...typography.caption, color: colors.mutedText },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.md },
  settingLabel: { ...typography.label, color: colors.ink },
  settingDesc: { ...typography.caption, color: colors.mutedText, marginTop: 2 },
  logoutBtn: { marginTop: spacing.sm },
  version: { ...typography.caption, color: colors.mutedText, textAlign: 'center', marginBottom: spacing.lg },
});
