
import Header from '../components/Header'
import InvoiceCards from '../components/InvoiceCards'
import ThemesToggle from '../components/ThemesToggle'

function Home() {

  return (
    <div className='px-20 py-3'>
      <Header/>
      <ThemesToggle/>
      <InvoiceCards/>
    </div>
  )
}

export default Home
