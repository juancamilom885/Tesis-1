// src/routes/Login.tsx
import React from 'react';
import Login2 from '../components/Login2'; // Adjusted path

const Login: React.FC = () => {
  return (
    // Example full-screen background for the login page
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-protocol-green via-teal-400 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
        <Login2 /> {/* Render the actual form component */}
    </div>
  );
};

export default Login;