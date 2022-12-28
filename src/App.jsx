import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './functions/ScrollToTop';
import { AnimatedRoutes } from './pages/AnimatedRoutes';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App;
