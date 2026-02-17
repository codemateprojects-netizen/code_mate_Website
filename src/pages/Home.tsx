import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import CaseStudies from '../components/CaseStudies'
import Security from '../components/Security'
import FAQ from '../components/FAQ'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />

      <Services />
      <CaseStudies />

      <Security />
      <FAQ />
      <Contact />
      <Footer />

    </>
  )
}

export default Home
