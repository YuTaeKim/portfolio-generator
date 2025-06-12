import React from 'react';
import { Box, Flex, Link, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface NavbarProps {
  session: any;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <Box bg="blue.500" px={4} py={4}>
      <Flex maxW="1200px" mx="auto" justify="space-between" align="center">
        <Heading size="md" color="white">
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            Portfolio Generator
          </Link>
        </Heading>
        <Flex gap={4} align="center">
          <Link as={RouterLink} to="/" color="white" _hover={{ textDecoration: 'underline' }}>
            Home
          </Link>
          {session ? (
            <>
              <Link as={RouterLink} to="/upload" color="white" _hover={{ textDecoration: 'underline' }}>
                Upload
              </Link>
              <Link as={RouterLink} to="/portfolio" color="white" _hover={{ textDecoration: 'underline' }}>
                Portfolio
              </Link>
              <Button
                colorScheme="whiteAlpha"
                size="sm"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link as={RouterLink} to="/auth" color="white" _hover={{ textDecoration: 'underline' }}>
              Sign In
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar; 