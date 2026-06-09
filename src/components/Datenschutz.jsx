import LegalDocumentLayout from './LegalDocumentLayout'
import SeoHead from './SeoHead'

const block = 'rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8'

export default function Datenschutz() {
  return (
    <>
      <SeoHead
        title="Datenschutz | Webenox"
        description="Privacy policy for Webenox: how we process personal data on webenox.de in accordance with GDPR."
        path="/datenschutz"
      />
      <LegalDocumentLayout
        title="Datenschutzerklärung"
        subtitle="Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13 DSGVO"
      >
      <section className={block} aria-labelledby="ds-controller">
        <h2 id="ds-controller" className="text-lg font-semibold text-text mb-4">
          Verantwortlicher
        </h2>
        <p className="text-secondary mb-4">Verantwortlicher für die Datenverarbeitung auf dieser Website ist:</p>
        <p className="whitespace-pre-line text-secondary">
          {`Dzan Halilovic
Webenox
Beunestraße 20
65934 Frankfurt am Main
Deutschland`}
        </p>
        <p className="mt-4">
          <strong className="text-text">E-Mail:</strong>{' '}
          <a href="mailto:info@webenox.de">info@webenox.de</a>
        </p>
        <p className="mt-2">
          <strong className="text-text">Website:</strong>{' '}
          <a href="https://webenox.de" target="_blank" rel="noopener noreferrer">
            https://webenox.de
          </a>
        </p>
      </section>

      <section className={block} aria-labelledby="ds-general">
        <h2 id="ds-general" className="text-lg font-semibold text-text mb-4">
          Allgemeine Hinweise zur Datenverarbeitung
        </h2>
        <p className="text-secondary">
          Personenbezogene Daten werden nur verarbeitet, soweit dies zur Bereitstellung dieser Website, zur Bearbeitung
          Ihrer Anfragen sowie zur technisch sicheren und effizienten Nutzung unseres Onlineangebots erforderlich ist.
          Eine darüber hinausgehende Verarbeitung erfolgt nicht, es sei denn, wir weisen Sie gesondert darauf hin oder
          Sie erteilen uns eine ausdrückliche Einwilligung.
        </p>
      </section>

      <section className={block} aria-labelledby="ds-logs">
        <h2 id="ds-logs" className="text-lg font-semibold text-text mb-4">
          Server-Logfiles
        </h2>
        <p className="text-secondary">
          Beim Aufruf dieser Website werden durch den Hosting-Provider bzw. den Server automatisch Informationen in
          sogenannten Server-Logfiles erhoben und kurzfristig gespeichert. Dies betrifft insbesondere technische Daten
          (z.&nbsp;B. IP-Adresse, Datum und Uhrzeit der Anfrage, abgerufene Datei, übertragene Datenmenge, Meldung über
          erfolgreichen Abruf, Browsertyp nebst Version, Betriebssystem, Referrer-URL). Die Verarbeitung erfolgt zur
          Gewährleistung der Funktionsfähigkeit und Sicherheit des Webservers sowie zur Fehleranalyse. Rechtsgrundlage
          ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und stabilen Bereitstellung der
          Website).
        </p>
      </section>

      <section className={block} aria-labelledby="ds-contact">
        <h2 id="ds-contact" className="text-lg font-semibold text-text mb-4">
          Kontaktaufnahme per E-Mail oder Kontaktformular
        </h2>
        <p className="text-secondary">
          Wenn Sie uns per E-Mail oder – sofern angeboten – über ein Kontaktformular kontaktieren, verarbeiten wir die
          von Ihnen übermittelten Angaben ausschließlich zur Bearbeitung Ihrer Anfrage und für die damit verbundene
          technische Administration. Hierzu können insbesondere folgende Daten anfallen:
        </p>
        <ul className="mt-4 list-disc pl-5 space-y-2 text-secondary">
          <li>Name</li>
          <li>E-Mail-Adresse</li>
          <li>Telefonnummer, sofern angegeben</li>
          <li>Inhalt der Nachricht</li>
          <li>Zeitpunkt der Anfrage</li>
        </ul>
        <p className="mt-4 text-secondary">
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen bzw. Vertragserfüllung), soweit Ihre
          Anfrage der Anbahnung oder Durchführung eines Vertrags dient, sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an der Bearbeitung von Anfragen).
        </p>
      </section>

      <section className={block} aria-labelledby="ds-cookies">
        <h2 id="ds-cookies" className="text-lg font-semibold text-text mb-4">
          Cookies
        </h2>
        <p className="text-secondary">
          Diese Website verwendet keine nicht notwendigen Cookies zu Marketing-, Tracking- oder Analysezwecken. Es
          werden keine Analyse-Tools (z.&nbsp;B. Google Analytics) eingesetzt.
        </p>
        <p className="mt-4 text-secondary">
          Diese Website verwendet nur technisch notwendige Cookies, sofern solche für den Betrieb der Website
          erforderlich sind (z.&nbsp;B. für geschützte Bereiche oder Sitzungssteuerung).
        </p>
        <p className="mt-4 text-secondary">
          Zur Speicherung Ihrer Spracheinstellung kann im Browser <strong className="text-text">LocalStorage</strong>{' '}
          verwendet werden. Hierbei handelt es sich nicht um ein Cookie im engeren Sinne, sondern um eine lokale
          Speicherung in Ihrem Endgerät.
        </p>
      </section>

      <section className={block} aria-labelledby="ds-ssl">
        <h2 id="ds-ssl" className="text-lg font-semibold text-text mb-4">
          SSL-/TLS-Verschlüsselung
        </h2>
        <p className="text-secondary">
          Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine
          SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
          von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
        </p>
      </section>

      <section className={block} aria-labelledby="ds-rights">
        <h2 id="ds-rights" className="text-lg font-semibold text-text mb-4">
          Rechte der betroffenen Personen
        </h2>
        <p className="text-secondary mb-4">
          Sie haben im Rahmen der geltenden gesetzlichen Vorgaben folgende Rechte gegenüber uns hinsichtlich der Sie
          betreffenden personenbezogenen Daten:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-secondary">
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
        </ul>
        <p className="mt-4 text-secondary">
          Zuständige Aufsichtsbehörde in Hessen ist der{' '}
          <strong className="text-text">Hessische Beauftragte für Datenschutz und Informationsfreiheit (HBDI)</strong>.
          Weitere Informationen finden Sie unter:{' '}
          <a href="https://www.datenschutz.hessen.de" target="_blank" rel="noopener noreferrer">
            https://www.datenschutz.hessen.de
          </a>
        </p>
        <p className="mt-4 text-secondary">
          Zur Ausübung Ihrer Rechte genügt eine Nachricht an die oben genannte E-Mail-Adresse.
        </p>
      </section>

      <section className={block} aria-labelledby="ds-retention">
        <h2 id="ds-retention" className="text-lg font-semibold text-text mb-4">
          Speicherdauer
        </h2>
        <p className="text-secondary">
          Personenbezogene Daten werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt. Darüber
          hinaus kann eine Speicherung erfolgen, wenn dies durch den europäischen oder nationalen Gesetzgeber in
          unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften vorgesehen wurde. Eine Sperrung oder
          Löschung der Daten erfolgt auch dann, wenn eine durch die genannten Normen vorgeschriebene Speicherfrist
          abläuft, es sei denn, dass eine weitergehende Speicherung der Daten für einen Vertragsabschluss oder eine
          Vertragserfüllung erforderlich ist.
        </p>
      </section>

      <section className={block} aria-labelledby="ds-changes">
        <h2 id="ds-changes" className="text-lg font-semibold text-text mb-4">
          Änderungen dieser Datenschutzerklärung
        </h2>
        <p className="text-secondary">
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen
          Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für
          Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
        </p>
      </section>
    </LegalDocumentLayout>
    </>
  )
}
