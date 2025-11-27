# Landeigentümer-Verwaltung - Setup Anleitung

## Übersicht

Diese Anwendung ermöglicht die Verwaltung von Landeigentümern und ihren zugehörigen Flurstücken. Die Lösung ist komplett mit Supabase als Backend umgesetzt.

## Architektur

### Datenbankstruktur

- **users_profile**: User-Profile-Tabelle
  - Persönliche Daten (Vorname, Nachname, About Me)
  - User-Typ (Admin/User)
  - Kontaktdaten (Telefon, Email)
  - Firmendaten (Name, Logo, Adresse)
  - Preferences (JSONB)
  - Automatische Erstellung bei User-Registrierung

- **landeigentuemer**: Haupttabelle für Landeigentümer
  - Persönliche Daten (Vorname, Nachname, Kontaktdaten)
  - Adressinformationen
  - Notizen

- **flurstuecke**: Tabelle für Flurstücke
  - Referenz zum Landeigentümer (mit CASCADE DELETE)
  - Flurstücknummer, Gemarkung
  - Fläche und Nutzungsart
  - Bemerkungen

### Komponenten-Struktur

```
src/
├── app/
│   └── landeigentuemer/
│       ├── page.tsx                    # Übersichtsseite
│       └── [id]/
│           └── page.tsx                # Detailseite
├── components/
│   ├── ui/                             # Wiederverwendbare UI-Komponenten
│   │   ├── button.tsx                  # Button-Komponente (bereits vorhanden)
│   │   ├── Input.tsx                   # Input-Komponente
│   │   ├── Textarea.tsx                # Textarea-Komponente
│   │   ├── Card.tsx                    # Card-Komponente
│   │   └── Modal.tsx                   # Modal-Komponente
│   ├── landeigentuemer/
│   │   ├── LandeigentuemerList.tsx     # Liste aller Landeigentümer
│   │   └── LandeigentuemerForm.tsx     # Formular für Erstellen/Bearbeiten
│   └── flurstuecke/
│       ├── FlurstueckList.tsx          # Liste der Flurstücke
│       └── FlurstueckForm.tsx          # Formular für Flurstücke
├── lib/
│   └── supabase/
│       ├── landeigentuemer.ts          # Service für Landeigentümer-Operationen
│       └── flurstuecke.ts              # Service für Flurstück-Operationen
└── types/
    └── landeigentuemer.ts              # TypeScript-Typen
```

## Setup-Schritte

### 1. Supabase-Migration ausführen

```bash
# Migrationen in Supabase ausführen (in der richtigen Reihenfolge!)
supabase db push

# Oder manuell im Supabase Dashboard (SQL Editor):
# 1. Führe zuerst: supabase/migrations/000_create_user_profile.sql aus
# 2. Dann führe aus: supabase/migrations/001_create_landeigentuemer.sql
```

**Wichtig:** Die User-Profile-Migration (000) muss vor der Landeigentümer-Migration (001) ausgeführt werden!

### 2. Supabase Umgebungsvariablen prüfen

Stelle sicher, dass in deiner `.env.local` Datei die Supabase-Credentials vorhanden sind:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Dependencies prüfen

Die folgenden Pakete sollten bereits installiert sein:

```bash
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js
```

### 4. cn() Utility Function

Die `cn()` Funktion aus `@/lib/utils` wird für Tailwind-Klassen verwendet. Falls noch nicht vorhanden, hier die Implementation:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Features

### Landeigentümer-Verwaltung

- ✅ Alle Landeigentümer auflisten
- ✅ Neue Landeigentümer erstellen
- ✅ Landeigentümer bearbeiten
- ✅ Landeigentümer löschen (inkl. aller Flurstücke)
- ✅ Suche nach Name, E-Mail oder Ort
- ✅ Responsive Card-Layout

### Flurstück-Verwaltung

- ✅ Flurstücke pro Landeigentümer anzeigen
- ✅ Neue Flurstücke hinzufügen
- ✅ Flurstücke bearbeiten
- ✅ Flurstücke löschen
- ✅ Detaillierte Informationen (Nummer, Gemarkung, Fläche, Nutzungsart)

### UI/UX Features

- ✅ Moderne, saubere Oberfläche mit Tailwind CSS
- ✅ Modal-Dialoge für Formulare
- ✅ Validierung von Formulareingaben
- ✅ Loading-States
- ✅ Fehlerbehandlung
- ✅ Bestätigungsdialoge beim Löschen

## Navigation

- **Hauptseite**: `/landeigentuemer` - Übersicht aller Landeigentümer
- **Detailseite**: `/landeigentuemer/[id]` - Details eines Landeigentümers mit Flurstücken

## Komponenten-Wiederverwendbarkeit

Alle UI-Komponenten sind DRY (Don't Repeat Yourself) und wiederverwendbar:

- **Input/Textarea**: Mit Label, Fehleranzeige und Helper-Text
- **Button**: Verschiedene Varianten (primary, secondary, danger, outline)
- **Card**: Modularer Aufbau mit Header, Body, Footer
- **Modal**: Anpassbare Größen und Inhalte

## Datenbankzugriff

Die Services (`landeigentuemerService` und `flurstueckeService`) kapseln alle Datenbankzugriffe:

```typescript
// Beispiel: Landeigentümer abrufen
const landeigentuemer = await landeigentuemerService.getAll();

// Beispiel: Neuen Landeigentümer erstellen
const newLandeigentuemer = await landeigentuemerService.create({
  vorname: 'Max',
  nachname: 'Mustermann',
  email: 'max@example.com',
  // ...
});
```

## Sicherheit

- Row Level Security (RLS) ist aktiviert
- Policies erlauben nur authentifizierten Benutzern den Zugriff
- CASCADE DELETE für Flurstücke beim Löschen eines Landeigentümers

## Nächste Schritte

1. Migration in Supabase ausführen
2. Zur Seite `/landeigentuemer` navigieren
3. Ersten Landeigentümer anlegen
4. Flurstücke hinzufügen

## Hinweise

- Die Button-Komponente verwendet die bereits vorhandene Variante aus `src/components/ui/button.tsx`
- Die Farben folgen einem grünen Theme (primary-600, etc.)
- Alle Formulare haben Client-seitige Validierung
- Timestamps werden automatisch von Supabase verwaltet
