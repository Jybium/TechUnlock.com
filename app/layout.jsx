import { Sora } from 'next/font/google'
import './globals.css'

const inter = Sora({ subsets: ['latin'], weights: [400, 500, 600, 700]})

export const metadata = {
  title: 'TechUnlock | Seamless learning for everyone',
  description: 'Unlock your seamless learning experience.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
