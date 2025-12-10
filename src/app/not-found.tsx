import Header from '@/components/common/Header'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/utils'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <Header />
      <div className="max-w-md w-full text-center">
        <div className="mb-1">
          <h1 className="text-9xl font-semibold text-gray-200 mb-1">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Seite nicht gefunden
          </h2>
          <p className="text-gray-600 ">
            Die gesuchte Seite konnte leider nicht gefunden werden.
          </p>
        </div>

        <div className="space-y-1">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "primary", size: "md" }))}

          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  )
}