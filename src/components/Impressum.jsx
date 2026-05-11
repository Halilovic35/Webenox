import LegalDocumentLayout from './LegalDocumentLayout'

const block = 'rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8'

export default function Impressum() {
  return (
    <LegalDocumentLayout title="Impressum" subtitle="Angaben gemäß § 5 DDG">
      <section className={block} aria-labelledby="impressum-provider">
        <h2 id="impressum-provider" className="text-lg font-semibold text-text mb-4">
          Angaben gemäß § 5 DDG
        </h2>
        <p className="whitespace-pre-line text-secondary">
          {`Dzan Halilovic
Webenox
Beunestraße 20
65934 Frankfurt am Main
Deutschland`}
        </p>
        <p className="mt-4 text-secondary">
          <strong className="text-text">Tätigkeit:</strong> Webentwicklung, Webdesign, Online Marketing und IT-Dienstleistungen
        </p>
      </section>

      <section className={block} aria-labelledby="impressum-contact">
        <h2 id="impressum-contact" className="text-lg font-semibold text-text mb-4">
          Kontakt
        </h2>
        <p>
          <strong className="text-text">E-Mail:</strong>{' '}
          <a href="mailto:info@webenox.de">info@webenox.de</a>
        </p>
        <p className="mt-2">
          <strong className="text-text">Website:</strong>{' '}
          <a href="https://www.webenox.de" target="_blank" rel="noopener noreferrer">
            https://www.webenox.de
          </a>
        </p>
      </section>

      <section className={block} aria-labelledby="impressum-legal">
        <h2 id="impressum-legal" className="text-lg font-semibold text-text mb-4">
          Rechtsform
        </h2>
        <p className="text-secondary">Einzelunternehmen</p>
      </section>

      <section className={block} aria-labelledby="impressum-content">
        <h2 id="impressum-content" className="text-lg font-semibold text-text mb-4">
          Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
        </h2>
        <p className="whitespace-pre-line text-secondary">
          {`Dzan Halilovic
Beunestraße 20
65934 Frankfurt am Main
Deutschland`}
        </p>
      </section>

      <section className={block} aria-labelledby="impressum-vat">
        <h2 id="impressum-vat" className="text-lg font-semibold text-text mb-4">
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG
        </h2>
        <p className="text-secondary">Nicht vorhanden.</p>
      </section>
    </LegalDocumentLayout>
  )
}
