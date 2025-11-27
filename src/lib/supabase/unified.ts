import { createSPAClient } from "./client";
import { Database } from "@/lib/types";

export enum ClientType {
    SERVER = 'server',
    SPA = 'spa'
}
export type TypedSPAClient = ReturnType<typeof createSPAClient>;

export class SassClient {
    private client: TypedSPAClient;
    private clientType: ClientType;

    constructor(client: TypedSPAClient, clientType: ClientType) {
        this.client = client;
        this.clientType = clientType;
    }

    async loginEmail(email: string, password: string) {
        return this.client.auth.signInWithPassword({ email, password });
    }
    async registerEmail(
        email: string,
        password: string,
        metadata?: { first_name?: string; last_name?: string; newsletter?: boolean }
    ) {
        const result = await this.client.auth.signUp({
            email,
            password,
            options: {
                data: metadata || {},
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${'/api/auth/callback'}` ,
            },
        });
        return result;
    }

  
    async updateUser(data: Record<string, unknown>) {
        return this.client.auth.updateUser(data);
    }

    async exchangeCodeForSession(code: string) {
        return this.client.auth.exchangeCodeForSession(code);
    }

    async resendVerificationEmail(email: string) {
        return this.client.auth.resend({ email, type: 'signup' });
    }

    async logout() {
        const { error } = await this.client.auth.signOut({ scope: 'local' });
        if (error) throw error;
        
        if (this.clientType === ClientType.SPA) {
            window.location.href = '/auth/login';
        }
    }

    getSupabaseClient() {
        return this.client;
    }
}
