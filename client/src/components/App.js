import React from 'react'

import Logging from './Logging/Logging'
import { AuthProvider } from '../context/AuthContext'
import { DogProvider } from '../context/DogContext'
import { DogParkProvider } from '../context/DogParkContext'
import { ReviewProvider } from '../context/ReviewContext'
import { FriendsProvider } from '../context/FriendsContext'
import { WebSocketProvider } from '../context/WebSocketContext'
import { CheckInProvider } from '../context/CheckInContext'

function App() {

  return (
    <AuthProvider>
      <DogProvider>
        <DogParkProvider>
          <ReviewProvider>
            <FriendsProvider>
              <WebSocketProvider>
                <CheckInProvider>
                  <Logging />
                </CheckInProvider>
              </WebSocketProvider>
            </FriendsProvider> 
          </ReviewProvider>
        </DogParkProvider>
      </DogProvider>
    </AuthProvider>
  );
}

export default App