import {createBrowserClient} from '@supabase/ssr'
import {Database} from "@/lib/types";
import { ClientType, SassClient } from './unified';

export function createSPAClient() {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

export async function createSPASassClient() {
    const client = createSPAClient();
    return new SassClient(client, ClientType.SPA);
}