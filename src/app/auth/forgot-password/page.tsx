'use client';

import { useState } from 'react';
import { createSPASassClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import AuthLayout from '@/components/common/AuthLayout';
import FormControl from '@/components/forms/form_components/FormControl';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const supabase = await createSPASassClient();
            const { error } = await supabase
                .getSupabaseClient()
                .auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/auth/reset-password`,
                });

            if (error) throw error;

            setSuccess(true);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Es ist ein unbekannter Fehler aufgetreten.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <AuthLayout rightImageSrc="/images/auth/immo1.webp">

                <div className="bg-white ">
                    <div className="text-center">
                        <div className="flex justify-center mb-1">
                            <CheckCircle className="h-4 w-4 text-success-500" />
                        </div>

                        <h2 className="text-2xl font-semibold text-black mb-1">
                            Überprüfe deine E-Mails
                        </h2>

                        <p className="text-black mb-2">
                            Wir haben dir einen Link zum Zurücksetzen deines Passworts per E-Mail gesendet.
                            Bitte überprüfe dein Postfach und folge den Anweisungen, um dein Passwort zurückzusetzen.
                        </p>

                        <div className="text-center text-base">
                            <Link
                                href="/auth/login"
                                className="font-semibold text-primary-600 hover:text-primary-500"
                            >
                                Zurück zur Anmeldung
                            </Link>
                        </div>
                    </div>
                </div> </AuthLayout>
        );

    }

    return (
        <AuthLayout rightImageSrc="/images/auth/immo1.webp">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Passwort zurücksetzen
                </h2>

                <form onSubmit={handleSubmit} className="space-y-1">
                    <FormControl
                        name="email"
                        type="email"
                        label="E-Mail"
                        autoComplete="email"
                        error={error}
                        placeholder="Gib deine E-Mail-Adresse ein"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button type="submit" disabled={loading} size='full' variant="primary">
                        {loading
                            ? 'Sende Zurücksetzungslink...'
                            : 'Zurücksetzungslink senden'}
                    </Button>
                </form>

                <div className="mt-2 text-center text-base">
                    <span className="text-black">Wissen Sie Ihr Passwort noch?</span>{' '}
                    <Link
                        href="/auth/login"
                        className="font-medium text-primary-600 hover:text-primary-500"
                    >
                        Anmelden
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
