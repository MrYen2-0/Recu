import './styles/globals.css';
import Footer from "./components/componentes-cliente/Footer";


export const metadata = {
  title: 'Garcia & Caceres Gonzales',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
{children}
<Footer />

      </body>
    </html>
  )
}
