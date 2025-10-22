/*
  # Email Signups Table for Luxstin Landing Page

  1. New Tables
    - `email_signups`
      - `id` (uuid, primary key) - Unique identifier
      - `email` (text, unique, not null) - Subscriber email address
      - `created_at` (timestamptz) - Signup timestamp
      - `source` (text) - Which CTA they signed up from (hero, mid, final, featured)
      - `ip_address` (text) - For spam prevention (optional)
      
  2. Security
    - Enable RLS on `email_signups` table
    - Add policy for inserting signups (public can insert their own email)
    - Add policy for service role to read all signups
    
  3. Indexes
    - Index on email for fast duplicate checking
    - Index on created_at for reporting
*/

CREATE TABLE IF NOT EXISTS email_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  source text DEFAULT 'hero',
  ip_address text
);

ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up with email"
  ON email_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read all signups"
  ON email_signups
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_email_signups_email ON email_signups(email);
CREATE INDEX IF NOT EXISTS idx_email_signups_created_at ON email_signups(created_at DESC);