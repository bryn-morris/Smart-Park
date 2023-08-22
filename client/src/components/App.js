import React from 'react'
import Logging from './Logging/Logging'
import { AuthProvider } from '../context/AuthContext'
import { DogProvider } from '../context/DogContext'
import { DogParkProvider } from '../context/DogParkContext'
import { ReviewProvider
 } from '../context/ReviewContext'
import { FriendsProvider } from '../context/FriendsContext'
function App() {
  
  return (

    <AuthProvider>
      <DogProvider>
        <DogParkProvider>
          <ReviewProvider>
            <FriendsProvider>
              <Logging />
            </FriendsProvider> 
          </ReviewProvider>
        </DogParkProvider>
      </DogProvider>
    </AuthProvider>
  );
}

export default App