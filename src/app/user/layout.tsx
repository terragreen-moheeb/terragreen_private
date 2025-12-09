import AppLayout from "@/components/common/AppLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}
