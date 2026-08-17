import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'

const App = () => {
  const path = window.location.pathname

  if (path === '/privacy') return <PrivacyPolicy />
  if (path === '/terms') return <Terms />

  return <Home />
}

export default App
