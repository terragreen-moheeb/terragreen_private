import { GlobalProvider } from '@/lib/context/GlobalContext';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <GlobalProvider>
          {children}
        </GlobalProvider>
    );
}
