import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DClaw Building",
  description: "DClaw Building Management — monitor building health, maintenance, systems, and tenants",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <header className="border-b bg-card">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-14 items-center justify-between">
                <div className="flex items-center gap-6">
                  <Link href="/" className="font-bold text-lg text-primary">
                    DClaw Building
                  </Link>
                  <nav className="flex items-center gap-4 text-sm">
                    <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/buildings" className="text-muted-foreground hover:text-foreground transition-colors">
                      Buildings
                    </Link>
                    <Link href="/maintenance" className="text-muted-foreground hover:text-foreground transition-colors">
                      Maintenance
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
