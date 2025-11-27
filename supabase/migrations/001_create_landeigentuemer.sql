-- Tabelle für Landeigentümer
CREATE TABLE IF NOT EXISTS landeigentuemer (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vorname VARCHAR(100) NOT NULL,
  nachname VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  telefon VARCHAR(50),
  adresse TEXT,
  ort VARCHAR(100),
  plz VARCHAR(10),
  notizen TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabelle für Flurstücke
CREATE TABLE IF NOT EXISTS flurstuecke (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  landeigentuemer_id UUID NOT NULL REFERENCES landeigentuemer(id) ON DELETE CASCADE,
  flurstueck_nummer VARCHAR(100) NOT NULL,
  gemarkung VARCHAR(100),
  flaeche_qm DECIMAL(12, 2),
  nutzungsart VARCHAR(100),
  bemerkungen TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(landeigentuemer_id, flurstueck_nummer)
);

-- Index für bessere Performance
CREATE INDEX IF NOT EXISTS idx_flurstuecke_landeigentuemer ON flurstuecke(landeigentuemer_id);

-- Funktion für automatisches Update von updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger für landeigentuemer
DROP TRIGGER IF EXISTS update_landeigentuemer_updated_at ON landeigentuemer;
CREATE TRIGGER update_landeigentuemer_updated_at
  BEFORE UPDATE ON landeigentuemer
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger für flurstuecke
DROP TRIGGER IF EXISTS update_flurstuecke_updated_at ON flurstuecke;
CREATE TRIGGER update_flurstuecke_updated_at
  BEFORE UPDATE ON flurstuecke
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE landeigentuemer ENABLE ROW LEVEL SECURITY;
ALTER TABLE flurstuecke ENABLE ROW LEVEL SECURITY;

-- Policies (für authenticated users - anpassen nach Bedarf)
CREATE POLICY "Enable read access for authenticated users" ON landeigentuemer
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users" ON landeigentuemer
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users" ON landeigentuemer
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users" ON landeigentuemer
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON flurstuecke
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users" ON flurstuecke
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users" ON flurstuecke
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users" ON flurstuecke
  FOR DELETE USING (auth.role() = 'authenticated');
