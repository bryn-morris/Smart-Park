import React from 'react'
import Logging from './Logging/Logging'
import { AuthProvider } from '../context/AuthContext'
import { DogProvider } from '../context/DogContext'

function App() {
  
  return (

    <AuthProvider>
      <DogProvider>
        <div>
          <Logging />
        </div>
      </DogProvider>
    </AuthProvider>
  )}

export default App