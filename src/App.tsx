import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Settings from './components/shared/Settings'
import TxtBlock from './components/shared/TxtBlock'

function App() {
    return (
        <>
            <Header />
            <div className="main">
                <Settings />
                <TxtBlock />
            </div>
            <Footer />
        </>
    )
}

export default App
