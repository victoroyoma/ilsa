import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { Speakers } from './pages/Speakers'
import { Tickets } from './pages/Tickets'
import { About } from './pages/About'
import { Background } from './components/Background'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Checkout } from './pages/Checkout';
import { Registration } from './pages/Registration';
import { PaymentSelection } from './pages/PaymentSelection';
import { PaymentVerification } from './pages/PaymentVerification';
import { BankTransfer } from './pages/BankTransfer';
import { Confirmation } from './pages/Confirmation';
import { EFTInstructions } from './pages/EFTInstructions';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { Logistics } from './pages/Logistics'
import { ContactUs } from './pages/ContactUs'
import { PaystackInstructions } from './pages/PaystackInstructions';

export function App() {
  const [activePage, setActivePage] = useState('home')
  const logoUrl = "https://res.cloudinary.com/dmqjqn6x3/image/upload/ILSA-NEW-LOGO-W_cuh2vh.png"
  
  return (
    <Router>
      <div className="relative w-full min-h-screen font-sans text-white overflow-hidden">
        <Background />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar
            activePage={activePage}
            setActivePage={setActivePage}
            logoUrl={logoUrl}
          />
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/speakers" element={<Speakers />} />
              <Route path="/logistics" element={<Logistics />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/registration/:ticketType/:price" element={<Registration />} />
              
              <Route path="/payment-selection/:ticketType/:price/:recordId" element={<PaymentSelection />} />
              <Route path="/checkout/:method?/:ticketType/:price" element={<Checkout />} />
              <Route path="/payment/verify" element={<PaymentVerification />} />
              <Route path="/checkout/bank/:ticketType/:price" element={<BankTransfer />} />
              <Route path="/eft-instructions/:ticketType/:price" element={<EFTInstructions />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/paystack-instructions/:ticketType/:reference" element={<PaystackInstructions />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

