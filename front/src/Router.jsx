import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from "./pages/Home/Home"
import { PassPage } from "./pages/Password/Pass"
import { NotFound } from "./pages/NotFound/NotFound"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<PassPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}
