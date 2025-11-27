// serverAdminClient.ts

import { createServerClient } from '@supabase/ssr'
import { Database } from '../types_geodata';

export async function getGeodataClient() {
  return createServerClient<Database, "geodata">(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.PRIVATE_SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      db: {
        schema: 'geodata',
      },
    }
  );
}