import React from 'react'
import Logging from './Logging/Logging'
import { AuthProvider } from '../context/AuthContext'
import { DogProvider } from '../context/DogContext'
import { DogParkProvider } from '../context/DogParkContext'

function App() {
  
  return (

    <AuthProvider>
      <DogProvider>
        <DogParkProvider>
          <Logging />
        </DogParkProvider>
      </DogProvider>
    </AuthProvider>
  )}

export default App