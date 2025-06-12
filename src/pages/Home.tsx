import React from 'react';
import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="1200px" py={10}>
      <VStack spacing={8} align="center">
        <Heading size="2xl">Welcome to Portfolio Generator</Heading>
        <Text fontSize="xl" textAlign="center">
          Upload your meeting notes and reflections to automatically generate a professional portfolio.
        </Text>
        <Box>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => navigate('/upload')}
            mr={4}
          >
            Upload Documents
          </Button>
          <Button
            colorScheme="green"
            size="lg"
            onClick={() => navigate('/portfolio')}
          >
            View Portfolio
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Home; 