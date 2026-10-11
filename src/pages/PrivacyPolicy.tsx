import { site } from '../config/site'
import { LegalPage } from '../components/ui/LegalPage'
import { Seo } from '../components/ui/Seo'

export default function PrivacyPolicy() {
  const mail = <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
  return (
    <>
      <Seo title="Privacy Policy" description={`How ${site.name} collects, uses, and protects information submitted through this website.`} />
      <LegalPage title="Privacy Policy" updated="October 2026">
        <p>
          {site.name} (“we”, “us”, “our”) respects your privacy. This policy explains what information we collect through this website, how we use
          it, and the choices you have.
        </p>

        <h2>Information we collect</h2>
        <p>We only collect information you choose to give us through the forms on this site. Depending on the form, this may include:</p>
        <ul>
          <li>Your name, email address, and company name</li>
          <li>Your website or a portfolio / LinkedIn URL</li>
          <li>Details about your project, the service or product you are interested in, budget range, and timeline</li>
          <li>Anything you write in the message field</li>
        </ul>
        <p>
          We also record the page the form was submitted from and the time of submission. We do not ask for, and ask you not to send, sensitive
          personal data through these forms.
        </p>

        <h2>How we use your information</h2>
        <p>
          We use the information only to respond to your inquiry, prepare proposals or demos you request, consider you for opportunities if you
          submitted a careers form, and keep a record of our correspondence. We do not sell your information.
        </p>

        <h2>How it is stored and shared</h2>
        <p>
          Form submissions are sent to our server, where they are stored and may be forwarded to our business email or internal tools so our team
          can respond. We use service providers (such as hosting and email delivery services) only to operate these functions. Access is limited to
          people who need it to respond to you.
        </p>

        <h2>Retention</h2>
        <p>
          We keep inquiry records for as long as needed to respond and to maintain reasonable business records. You can ask us to delete your
          information at any time.
        </p>

        <h2>Cookies and tracking</h2>
        <p>
          This website does not set advertising or analytics cookies. Fonts are loaded from Google Fonts, which means your browser connects to
          Google’s servers to download them. If we add analytics in future, we will update this policy.
        </p>

        <h2>Your choices</h2>
        <p>
          You can request access to, correction of, or deletion of the information you have sent us by emailing {mail}. Depending on where you live,
          you may have additional rights under local data protection law.
        </p>

        <h2>Changes</h2>
        <p>We may update this policy as our website and services change. The date at the top shows when it was last updated.</p>

        <h2>Contact</h2>
        <p>Questions about this policy can be sent to {mail}.</p>
      </LegalPage>
    </>
  )
}
