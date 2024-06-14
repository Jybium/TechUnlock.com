import Footer from '@/components/reusables/Footer'
import Header from '@/components/reusables/landingPage/Header'
import React from 'react'

const layout = ({children}) => {
  return (
    <main className=''>
        <Header/>
        <section className='relative h-full w-full'>
            {children}
        </section>
        <Footer/>
    </main>
  )
}

export default layout