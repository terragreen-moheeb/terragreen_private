import "../styles/global.css";
import { GlobalProvider } from "@/lib/context/GlobalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-DE" dir="ltr">
      <body
        className=" font-body bg-white  selection:bg-primary-200  "
      >
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
