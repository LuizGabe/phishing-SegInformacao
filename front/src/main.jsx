import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './Router'
import { UserProvider } from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <UserProvider>
      <Router />
    </UserProvider>
  </>
)
