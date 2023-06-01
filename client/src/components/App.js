import React from 'react'
import LogIn from './Logging/LogIn'
import { AuthProvider } from '../context/AuthContext'
import { DogProvider } from '../context/DogContext'

function App() {
  
  return (

    <AuthProvider>
      <DogProvider>
        <div>
          <LogIn />
        </div>
      </DogProvider>
    </AuthProvider>
  )}

export default App