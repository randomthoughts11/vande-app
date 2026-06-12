-- Vande Wellness initial schema
-- IMPORTANT: Enable and tighten RLS policies before production. This is NOT HIPAA-compliant as-is.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'practitioner', 'admin')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  dob DATE,
  timezone TEXT DEFAULT 'America/New_York',
  country TEXT DEFAULT 'US',
  emergency_contact TEXT,
  push_token TEXT,
  onboarding_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  dob DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE practitioners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id),
  credentials TEXT NOT NULL,
  specialty TEXT NOT NULL,
  location TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  is_virtual BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  price_cents INTEGER NOT NULL DEFAULT 0,
  service_type TEXT CHECK (service_type IN ('virtual', 'in_person', 'both')),
  category TEXT,
  stripe_price_id TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,
  billing_period TEXT CHECK (billing_period IN ('monthly', 'annual')),
  stripe_price_id TEXT,
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE membership_entitlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  membership_id UUID REFERENCES memberships(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  label TEXT NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  membership_id UUID REFERENCES memberships(id),
  status TEXT DEFAULT 'active',
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE intake_questionnaires (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version TEXT NOT NULL,
  schema_json JSONB NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE intake_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  questionnaire_id UUID REFERENCES intake_questionnaires(id),
  goals TEXT[],
  symptoms TEXT[],
  responses_json JSONB,
  wellness_scores JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE health_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  goal TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE care_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  practitioner_id UUID REFERENCES practitioners(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  title TEXT NOT NULL,
  summary TEXT,
  goal TEXT,
  start_date DATE,
  next_review_date DATE,
  progress_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE care_plan_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  care_plan_id UUID REFERENCES care_plans(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  instructions TEXT,
  schedule_text TEXT,
  schedule_json JSONB,
  rationale TEXT,
  safety_note TEXT,
  media_url TEXT,
  product_url TEXT,
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE care_plan_item_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  care_plan_item_id UUID REFERENCES care_plan_items(id) ON DELETE CASCADE,
  member_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL CHECK (action IN ('completed', 'skipped', 'snoozed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  mood TEXT,
  stress_level INTEGER,
  sleep_quality INTEGER,
  digestion_score INTEGER,
  pain_score INTEGER,
  energy_level INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  practitioner_id UUID REFERENCES practitioners(id),
  service_id UUID REFERENCES services(id),
  location_id UUID REFERENCES locations(id),
  appointment_type TEXT CHECK (appointment_type IN ('virtual', 'in_person')),
  status TEXT DEFAULT 'scheduled',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  meeting_url TEXT,
  payment_status TEXT DEFAULT 'pending',
  reason_for_visit TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE appointment_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id),
  body TEXT NOT NULL,
  visibility TEXT DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE message_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE thread_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES message_threads(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(thread_id, profile_id)
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id),
  body TEXT NOT NULL,
  visibility TEXT DEFAULT 'member' CHECK (visibility IN ('member', 'internal')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

CREATE TABLE message_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL,
  category TEXT,
  duration_minutes INTEGER,
  media_url TEXT,
  thumbnail_url TEXT,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
  modules_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE course_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  progress_percent INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(member_id, course_id)
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  location TEXT,
  is_virtual BOOLEAN DEFAULT TRUE,
  max_spots INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, member_id)
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  suggested_use TEXT,
  safety_note TEXT,
  image_url TEXT,
  sku TEXT UNIQUE,
  product_url TEXT,
  price_cents INTEGER,
  practitioner_recommended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE product_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  care_plan_id UUID REFERENCES care_plans(id),
  status TEXT DEFAULT 'suggested',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders_external (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id),
  external_order_id TEXT,
  product_ids UUID[],
  total_cents INTEGER,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL,
  version TEXT NOT NULL,
  accepted_at TIMESTAMPTZ DEFAULT NOW(),
  ip_hash TEXT
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_profiles_auth_user ON profiles(auth_user_id);
CREATE INDEX idx_care_plans_member ON care_plans(member_id);
CREATE INDEX idx_care_plan_items_plan ON care_plan_items(care_plan_id);
CREATE INDEX idx_checkins_member ON checkins(member_id);
CREATE INDEX idx_appointments_member ON appointments(member_id);
CREATE INDEX idx_appointments_starts ON appointments(starts_at);
CREATE INDEX idx_messages_thread ON messages(thread_id);
CREATE INDEX idx_event_registrations_event ON event_registrations(event_id);

-- RLS: enabled with permissive dev policies — REPLACE before production
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE care_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE care_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;

-- Dev-only permissive policies (authenticated users)
CREATE POLICY "dev_profiles_select" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "dev_profiles_update" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = auth_user_id);

COMMENT ON TABLE profiles IS 'RLS must be scoped to auth.uid() and role before production launch.';
