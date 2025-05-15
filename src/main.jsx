import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import  Loader  from './components/Loader.jsx'

createRoot(document.getElementById('root')).render(
    <>
    <App />
    <Loader/>
    <Toaster position='top-right' richColors/>

    </>
)
