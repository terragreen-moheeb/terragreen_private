'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createSPASassClient } from '@/lib/supabase/client';
import Header from '@/components/common/Header';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

type StatusType = 'already_verified' | 'verified' | 'error';

interface StatusMessage {
    text: string;
    isError: boolean;
    checkSession?: boolean;
}

const STATUS_MESSAGES: Record<StatusType, StatusMessage> = {
    already_verified: {
        text: 'E-Mail-Adresse bereits bestätigt!',
        isError: false,
    },
    verified: {
        text: 'E-Mail erfolgreich bestätigt!',
        isError: false,
        checkSession: true,
    },
    error: {
        text: 'Der Link ist ungültig oder abgelaufen.',
        isError: true,
    },
};

function ConfirmContent() {
    const router = useRouter();
    const params = useSearchParams();
    const [message, setMessage] = useState('Verifizierung wird durchgeführt...');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleConfirmation = async () => {
      const status = params.get('status') as StatusType;
      const customMessage = params.get('message');
      
      const statusConfig = STATUS_MESSAGES[status];
      
      if (!statusConfig) {
        // Ungültiger Status → zurück zu Login
        router.push('/auth/login');
        return;
      }

      const displayMessage = customMessage || statusConfig.text;
      setMessage(displayMessage);
      setIsError(statusConfig.isError);
      setIsLoading(false);

      // Bei erfolgreicher Verifizierung Session prüfen
      if (statusConfig.checkSession) {
        try {
          const supabase = await createSPASassClient();
          const { data: { session } } = await supabase.getSupabaseClient().auth.getSession();
          
          if (session) {
            setMessage('Sie werden zum Dashboard weitergeleitet...');
            setTimeout(() => router.push('/user'), 1500);
          } else {
            setMessage('Sie können sich jetzt anmelden.');
            setTimeout(() => router.push('/auth/login?message=E-Mail bestätigt&type=success'), 2500);
          }
        } catch (error) {
          console.error('[Confirm] Session check failed:', error);
          setTimeout(() => router.push('/auth/login?message=E-Mail bestätigt&type=success'), 2500);
        }
      } else {
        // Bei Fehler oder bereits bestätigt → zurück zu Login
        setTimeout(() => {
          const message = statusConfig.isError ? 'Bitte versuchen Sie es erneut' : 'Sie können sich jetzt anmelden';
          router.push(`/auth/login?message=${encodeURIComponent(message)}&type=${statusConfig.isError ? 'error' : 'success'}`);
        }, 2000);
      }
    };

    handleConfirmation();
  }, [params, router]);

    return (
        <>
            <Header />

            <div className="flex items-center justify-center min-h-screen ">
                <div className="max-w-md w-full mx-auto p-1.5">
                    <div >
                        {isLoading && (
                            <LoadingSpinner size='md' message={message} />
                        )}

                        {!isLoading && (
                            <>
                                <p className={`text-lg mb-1.5 ${isError ? 'text-red-600' : 'text-gray-700'}`}>
                                    {message}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Sie werden automatisch weitergeleitet...
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
}

export default function ConfirmPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <ConfirmContent />
        </Suspense>
    );
}
