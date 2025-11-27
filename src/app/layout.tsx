import { GlobalProvider } from "@/utils/supabase/context/GlobalContext";
import "@/styles/global.css";

export const metadata = {
  title: "TerraGreen - Landeigentümer Verwaltung",
  description: "Verwaltung von Landeigentümern und Flurstücken",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-DE" dir="ltr">
      <body className="font-body bg-white selection:bg-primary-200">
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
