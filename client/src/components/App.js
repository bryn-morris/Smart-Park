import React from 'react'

import Logging from './Logging/Logging'
import { AuthProvider } from '../context/AuthContext'
import { DogProvider } from '../context/DogContext'
import { DogParkProvider } from '../context/DogParkContext'
import { ReviewProvider } from '../context/ReviewContext'
import { FriendsProvider } from '../context/FriendsContext'
import { WebSocketProvider } from '../context/WebSocketContext'
import { CheckInProvider } from '../context/CheckInContext'
import LocalStorageHandlers from './LocalStorageHandlers'

function App() {

  return (
      <AuthProvider>
        <DogProvider>
          <DogParkProvider>
            <CheckInProvider>
              <LocalStorageHandlers />
              <ReviewProvider>
                <FriendsProvider>
                  <WebSocketProvider>
                      <Logging />
                  </WebSocketProvider>
                </FriendsProvider> 
              </ReviewProvider>
            </CheckInProvider>
          </DogParkProvider>
        </DogProvider>
      </AuthProvider>
  );
}

export default App