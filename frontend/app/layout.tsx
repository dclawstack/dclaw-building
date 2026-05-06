export const metadata = { title: 'DClaw Building', description: 'Smart building management' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
