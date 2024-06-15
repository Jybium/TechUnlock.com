"use client"

import React from 'react'
import { Toaster } from 'react-hot-toast'

const ToastProvider = ({children}) => {
  return (
    <div >
        {children}
        <Toaster/>
    </div>
  )
}

export default ToastProvider