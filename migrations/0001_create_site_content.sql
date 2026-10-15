CREATE TABLE IF NOT EXISTS site_content (
  content_key TEXT PRIMARY KEY,
  content_json TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_login_attempts (
  ip_hash TEXT PRIMARY KEY,
  window_started INTEGER NOT NULL,
  attempt_count INTEGER NOT NULL
);
