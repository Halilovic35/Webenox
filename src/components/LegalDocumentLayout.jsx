import { Link } from 'react-router-dom'

/**
 * Shared shell for legal pages: dark theme, readable width, minimal chrome.
 */
export default function LegalDocumentLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-background text-text pt-24 pb-16">
      <div className="container-custom mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-white/10 pb-8">
          <Link
            to="/"
            className="inline-flex text-sm font-medium text-secondary transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            ← Zur Startseite
          </Link>
          <h1 className="mt-6 text-3xl sm:text-[2rem] font-bold tracking-tight text-text">{title}</h1>
          {subtitle ? <p className="mt-2 text-sm sm:text-base text-secondary">{subtitle}</p> : null}
        </header>

        <div className="space-y-8 text-[0.9375rem] sm:text-[15px] leading-[1.7] text-secondary [&_strong]:font-semibold [&_strong]:text-text [&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline">
          {children}
        </div>
      </div>
    </div>
  )
}
