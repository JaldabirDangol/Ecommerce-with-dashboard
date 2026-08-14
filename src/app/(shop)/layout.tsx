export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1 p-4 overflow-y-auto">
      {children}
    </main>
  );
}
