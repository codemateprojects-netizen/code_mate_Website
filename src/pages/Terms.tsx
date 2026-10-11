import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { LegalPage } from '../components/ui/LegalPage'
import { Seo } from '../components/ui/Seo'

export default function Terms() {
  const mail = <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
  return (
    <>
      <Seo title="Terms and Conditions" description={`Terms governing the use of the ${site.name} website.`} />
      <LegalPage title="Terms and Conditions" updated="October 2026">
        <p>These terms govern your use of this website. By using the site, you agree to them.</p>

        <h2>Website content</h2>
        <p>
          Content on this website — including text, graphics, the {site.name} name and logo, product names, and case study descriptions — belongs to
          {` ${site.name}`} and is provided for general information. Case studies describe representative work at a level of detail consistent with
          client confidentiality; additional detail or live demos are available on request.
        </p>

        <h2>Demonstrations and sample data</h2>
        <p>
          Interactive demonstrations on this site (including AI, RAG, agent, dashboard, and product interfaces) use pre-written sample data. They
          illustrate how solutions can work and are not live AI responses, real client data, or performance results.
        </p>

        <h2>No guarantee of outcomes</h2>
        <p>
          Descriptions of services, products, and past work are provided in good faith but are not a guarantee of results for any future project. We
          do not guarantee revenue, customers, search rankings, leads, advertising returns, or market success. Scope, deliverables, cost, timelines,
          and support for any engagement are agreed separately with each client in writing.
        </p>

        <h2>Products</h2>
        <p>
          Product pages describe product capability areas. Feature availability may change and is confirmed during demos or in a written agreement.
        </p>

        <h2>Inquiries are not contracts</h2>
        <p>
          Submitting a form on this site is an inquiry, not a binding agreement. Any engagement is formalised separately, in writing, between
          {` ${site.name}`} and the client. See our <Link to="/privacy-policy">Privacy Policy</Link> for how form information is handled.
        </p>

        <h2>Acceptable use</h2>
        <p>Please don’t misuse the site — for example by attempting to disrupt it, submitting spam, or probing for vulnerabilities without permission.</p>

        <h2>Changes</h2>
        <p>
          We may update these terms as the business evolves. Continued use of the site after changes are posted means you accept the updated terms.
        </p>

        <h2>Contact</h2>
        <p>Questions about these terms can be sent to {mail}.</p>
      </LegalPage>
    </>
  )
}
