-- Expanded RLS for Vande Wellness MVP (dev-friendly; tighten before production)

ALTER TABLE consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE intake_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Catalog: readable by anyone (anon + authenticated)
CREATE POLICY "catalog_services_read" ON services FOR SELECT USING (active = true);
CREATE POLICY "catalog_practitioners_read" ON practitioners FOR SELECT USING (true);
CREATE POLICY "catalog_events_read" ON events FOR SELECT USING (true);
CREATE POLICY "catalog_products_read" ON products FOR SELECT USING (true);
CREATE POLICY "catalog_memberships_read" ON memberships FOR SELECT USING (active = true);
CREATE POLICY "catalog_entitlements_read" ON membership_entitlements FOR SELECT USING (true);
CREATE POLICY "catalog_content_read" ON content_items FOR SELECT USING (published = true);

-- Member-owned rows
CREATE POLICY "member_consents_select" ON consents FOR SELECT TO authenticated
  USING (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "member_consents_insert" ON consents FOR INSERT TO authenticated
  WITH CHECK (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "member_intake_select" ON intake_responses FOR SELECT TO authenticated
  USING (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "member_intake_insert" ON intake_responses FOR INSERT TO authenticated
  WITH CHECK (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "member_checkins_select" ON checkins FOR SELECT TO authenticated
  USING (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "member_checkins_insert" ON checkins FOR INSERT TO authenticated
  WITH CHECK (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "member_appointments_select" ON appointments FOR SELECT TO authenticated
  USING (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "member_appointments_insert" ON appointments FOR INSERT TO authenticated
  WITH CHECK (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "member_care_plans_select" ON care_plans FOR SELECT TO authenticated
  USING (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "member_care_plan_items_select" ON care_plan_items FOR SELECT TO authenticated
  USING (
    care_plan_id IN (
      SELECT id FROM care_plans
      WHERE member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
    )
  );

CREATE POLICY "member_event_registrations_select" ON event_registrations FOR SELECT TO authenticated
  USING (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "member_event_registrations_insert" ON event_registrations FOR INSERT TO authenticated
  WITH CHECK (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "member_family_select" ON family_members FOR SELECT TO authenticated
  USING (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "member_support_tickets_insert" ON support_tickets FOR INSERT TO authenticated
  WITH CHECK (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));

-- Messaging (member threads they own)
CREATE POLICY "member_threads_select" ON message_threads FOR SELECT TO authenticated
  USING (member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "member_messages_select" ON messages FOR SELECT TO authenticated
  USING (
    thread_id IN (
      SELECT id FROM message_threads
      WHERE member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
    )
  );
CREATE POLICY "member_messages_insert" ON messages FOR INSERT TO authenticated
  WITH CHECK (
    sender_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
    AND thread_id IN (
      SELECT id FROM message_threads
      WHERE member_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
    )
  );
