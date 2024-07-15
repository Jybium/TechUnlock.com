import Footer from '@/components/reusables/Footer'
import Modal from '@/components/reusables/Modal'
import Navbar from '@/components/reusables/Navbar'
import { ModalProvider } from '@/Context/modal'
import React from 'react'

const layout = ({ children }) => {
  return (
    <ModalProvider>
      <main className=''>
        <Navbar />
        <section className='relative h-full w-full'>
          {children}
        </section>
        <Footer />
        <Modal>
          <div>Modal </div>
        </Modal>
      </main>
    </ModalProvider>
  )
}

export default layout