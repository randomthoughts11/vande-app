-- Reference catalog seed data for Vande Wellness MVP
-- Safe to re-run: uses fixed UUIDs with ON CONFLICT DO NOTHING

INSERT INTO services (id, name, description, duration_minutes, price_cents, service_type, category, active)
VALUES
  ('a1000001-0000-4000-8000-000000000001', 'Virtual Individual Consultation', 'One-on-one Ayurvedic wellness consultation via video.', 60, 14000, 'virtual', 'consultation', true),
  ('a1000001-0000-4000-8000-000000000002', 'Couples Consultation', 'Joint wellness session for you and your partner.', 75, 20000, 'both', 'consultation', true),
  ('a1000001-0000-4000-8000-000000000003', 'Ayurveda Wellness Consultation', 'Comprehensive dosha assessment and wellness planning.', 60, 15000, 'both', 'consultation', true),
  ('a1000001-0000-4000-8000-000000000004', 'Follow-up with Ayurvedic Consultant', '30-day progress review and plan adjustments.', 30, 7500, 'virtual', 'follow_up', true),
  ('a1000001-0000-4000-8000-000000000005', 'Panchakarma Consultation', 'Eligibility review and pre-care guidance for Panchakarma.', 45, 10000, 'both', 'panchakarma', true),
  ('a1000001-0000-4000-8000-000000000006', 'Lifestyle Members Session', 'Included session for active lifestyle members.', 30, 0, 'virtual', 'membership', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO practitioners (id, first_name, last_name, credentials, specialty, location, bio)
VALUES
  ('b2000001-0000-4000-8000-000000000001', 'Ananya', 'Verma', 'BAMS, MD (Ayurveda)', 'Digestive & Lifestyle Disorders', 'Virtual / New Jersey', '15+ years guiding members through personalized Ayurvedic wellness plans.'),
  ('b2000001-0000-4000-8000-000000000002', 'Meera', 'Patel', 'BAMS, Yoga Therapist', 'Stress, Sleep & Yoga Therapy', 'Virtual', 'Specializes in restorative yoga and sleep hygiene.'),
  ('b2000001-0000-4000-8000-000000000003', 'Ravi', 'Krishnan', 'Wellness Coach, Panchakarma Specialist', 'Detox & Panchakarma', 'Edison, NJ', 'Guides members through seasonal detox and Panchakarma prep.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, title, description, event_type, starts_at, ends_at, location, is_virtual, max_spots)
VALUES
  ('c3000001-0000-4000-8000-000000000001', 'Meditation Circle', 'Guided group meditation for calm and clarity.', 'meditation', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days 1 hour', 'Virtual', true, 20),
  ('c3000001-0000-4000-8000-000000000002', 'Panchakarma Orientation', 'Learn what to expect from a Panchakarma program.', 'workshop', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days' + INTERVAL '90 minutes', 'Virtual', true, 15),
  ('c3000001-0000-4000-8000-000000000003', 'Stress Management Webinar', 'Live expert session on Ayurvedic stress tools.', 'webinar', NOW() + INTERVAL '7 days', NOW() + INTERVAL '7 days 1 hour', 'Virtual', true, 100)
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, description, suggested_use, safety_note, sku, product_url, price_cents, practitioner_recommended)
VALUES
  ('d4000001-0000-4000-8000-000000000001', 'Triphala Capsules', 'Digestion', 'Traditional Ayurvedic blend for gentle daily support.', '1-2 capsules before bed with warm water.', 'Consult your practitioner if pregnant or taking blood thinners.', 'VND-TRI-60', 'https://vandecart.com/products/triphala', 2499, true),
  ('d4000001-0000-4000-8000-000000000002', 'Ashwagandha Root', 'Stress & Sleep', 'Adaptogenic herb to support calm and resilience.', 'Take as directed by your practitioner.', 'Avoid if hyperthyroid without practitioner guidance.', 'VND-ASH-90', 'https://vandecart.com/products/ashwagandha', 3299, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO memberships (id, name, description, price_cents, billing_period, featured, active)
VALUES
  ('e5000001-0000-4000-8000-000000000001', 'Lifestyle Member', 'Essential wellness support with monthly virtual access.', 4900, 'monthly', false, true),
  ('e5000001-0000-4000-8000-000000000002', 'Premium Wellness', 'Expanded consultations and member-only events.', 9900, 'monthly', true, true),
  ('e5000001-0000-4000-8000-000000000003', 'Annual Vitality', 'Best value annual plan with priority booking.', 89900, 'annual', false, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO membership_entitlements (membership_id, key, label, value)
SELECT v.membership_id, v.key, v.label, v.value::jsonb
FROM (VALUES
  ('e5000001-0000-4000-8000-000000000001'::uuid, 'consultations', 'Virtual consultations', '"1/month"'),
  ('e5000001-0000-4000-8000-000000000002'::uuid, 'consultations', 'Virtual consultations', '"2/month"'),
  ('e5000001-0000-4000-8000-000000000002'::uuid, 'events', 'Member events', '"Unlimited"'),
  ('e5000001-0000-4000-8000-000000000003'::uuid, 'consultations', 'Virtual consultations', '"12/year"')
) AS v(membership_id, key, label, value)
WHERE NOT EXISTS (
  SELECT 1 FROM membership_entitlements me
  WHERE me.membership_id = v.membership_id AND me.key = v.key
);
