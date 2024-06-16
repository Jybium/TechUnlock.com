import Footer from '@/components/reusables/Footer'
import Navbar from '@/components/reusables/Navbar'
import React from 'react'

const layout = ({children}) => {
  return (
    <main className=''>
        <Navbar/>
        <section className='relative h-full w-full'>
            {children}
        </section>
        <Footer/>
    </main>
  )
}

export default layout