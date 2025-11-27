'use client';

import { useState, useEffect } from 'react';
import { createSPASassClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle } from 'lucide-react';
import AuthLayout from '@/components/common/AuthLayout';
import FormControl from '@/components/forms/form_components/FormControl';
import { Button } from '@/components/ui/button';
import QLucideIcon from '@/components/ui/LucideIcon';

type PageState = 'loading' | 'valid' | 'invalid' | 'success';

export default function ResetPasswordPage() {
    const [pageState, setPageState] = useState<PageState>('loading');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Session validieren
    useEffect(() => {
        const checkSession = async () => {
            try {
                const supabase = await createSPASassClient();
                const { data: { user }, error } = await supabase.getSupabaseClient().auth.getUser();

                if (error || !user) {
                    setPageState('invalid');
                } else {
                    setPageState('valid');
                }
            } catch {
                setPageState('invalid');
            }
        };

        checkSession();
    }, [router]);

    const validateForm = (): boolean => {
        const newErrors = { password: '', confirmPassword: '' };

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Die Passwörter stimmen nicht überein.';
        }

        setErrors(newErrors);
        return !newErrors.password && !newErrors.confirmPassword;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const supabase = await createSPASassClient();
            const { error } = await supabase.getSupabaseClient().auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            setPageState('success');
            setTimeout(() => router.push('/user'), 3000);
        } catch (err) {
            const errorMessage = err instanceof Error 
                ? err.message 
                : 'Passwort konnte nicht zurückgesetzt werden.';
            setErrors(prev => ({ ...prev, password: errorMessage }));
        } finally {
            setLoading(false);
        }
    };

    // Invalider Link State
    if (pageState === 'invalid') {
        return (
            <AuthLayout rightImageSrc="/images/auth/immo1.webp">
                <div className="text-center">
                    <div className="flex justify-center mb-1">
                        <XCircle className="h-4 w-4 text-error-500" />
                    </div>

                    <h2 className="text-2xl font-semibold text-black mb-1">
                        Link ungültig oder abgelaufen
                    </h2>

                    <p className="text-black mb-2">
                        Dieser Passwort-Zurücksetzungslink ist ungültig oder abgelaufen.
                        Du wirst gleich zur Login-Seite weitergeleitet.
                    </p>

                    <Button
                        variant="primary"
                        size="full"
                        onClick={() => router.push('/auth/forgot-password')}
                    >
                        Neuen Link anfordern
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    // Success State
    if (pageState === 'success') {
        return (
            <AuthLayout rightImageSrc="/images/auth/immo1.webp">
                <div className="text-center">
                    <div className="flex justify-center mb-1">
                        <CheckCircle className="h-4 w-4 text-success-500" />
                    </div>

                    <h2 className="text-2xl font-semibold text-black mb-1">
                        Passwort erfolgreich zurückgesetzt
                    </h2>

                    <p className="text-black mb-2">
                        Dein Passwort wurde erfolgreich geändert.
                        Du wirst in Kürze zur App weitergeleitet.
                    </p>
                </div>
            </AuthLayout>
        );
    }

    // Loading State
    if (pageState === 'loading') {
        return (
            <AuthLayout rightImageSrc="/images/auth/immo1.webp">
                <div className="text-center">
                    <p className="text-black">Überprüfe Sitzung...</p>
                </div>
            </AuthLayout>
        );
    }

    // Valid State - Zeige Formular
    return (
        <AuthLayout rightImageSrc="/images/auth/immo1.webp">
            <div>
                <div className="flex justify-center mb-2">
                    <QLucideIcon icon="Key" className="h-3 w-3 text-primary-600" />
                </div>
                <h2 className="text-2xl font-semibold text-black mb-2 text-center">
                    Neues Passwort erstellen
                </h2>

                <form onSubmit={handleSubmit} noValidate className="space-y-1.5">
                    <FormControl
                        type="password"
                        label="Neues Passwort"
                        name="password"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                        }}
                        error={errors.password}
                        required
                    />


                    <FormControl
                        type="password"
                        label="Passwort bestätigen"
                        name="confirm-password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                        }}
                        error={errors.confirmPassword}
                        required
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        variant={loading ? 'disabled' : 'primary'}
                        size="full"
                    >
                        {loading ? 'Passwort wird zurückgesetzt...' : 'Passwort zurücksetzen'}
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
