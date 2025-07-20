import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './frontpage/homepagr';
import { RequestPickup } from './frontpage/requestpickup';
import { AboutUs } from './frontpage/aboutus';
import SignIn  from './frontpage/signin';
import ProfilePage from './frontpage/profile';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/requestpickup" element={<RequestPickup />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
    </main>
    
    <footer className="text-center text-sm text-gray-500 mt-9.5 py-3 border-t">
  ⚠️ This is a demo project created for educational purposes only. No real waste pickups are scheduled. Please do not submit sensitive information.

</footer>
</div>
  )
}

export default App;

