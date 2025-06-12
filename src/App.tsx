import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Upload from './pages/Upload';
import Auth from './components/Auth';
import theme from './theme';

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh">
          <Navbar session={session} />
          <Box p={4}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/portfolio"
                element={session ? <Portfolio /> : <Navigate to="/auth" />}
              />
              <Route
                path="/upload"
                element={session ? <Upload /> : <Navigate to="/auth" />}
              />
              <Route
                path="/auth"
                element={!session ? <Auth /> : <Navigate to="/portfolio" />}
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
