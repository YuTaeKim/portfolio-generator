import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  SimpleGrid,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { supabase } from '../lib/supabase';

interface PortfolioItem {
  id: string;
  title: string;
  content: string;
  created_at: string;
  category?: string;
  tags?: string[];
}

const Portfolio: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not authenticated');
        }

        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setItems(data || []);
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch portfolio items. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, [toast]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Container maxW="1200px" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading>Your Portfolio</Heading>
        {items.length === 0 ? (
          <Text textAlign="center" fontSize="lg" color="gray.500">
            No documents found. Start by uploading some meeting notes or reflections!
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {items.map((item) => (
              <Card key={item.id}>
                <CardBody>
                  <Heading size="md" mb={2}>
                    {item.title}
                  </Heading>
                  <Text color="gray.500" mb={2}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </Text>
                  <Text>{item.content}</Text>
                  {item.category && (
                    <Text mt={2} color="blue.500">
                      Category: {item.category}
                    </Text>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <Box mt={2}>
                      {item.tags.map((tag, index) => (
                        <Text
                          key={index}
                          as="span"
                          bg="gray.100"
                          px={2}
                          py={1}
                          borderRadius="md"
                          mr={2}
                          fontSize="sm"
                        >
                          {tag}
                        </Text>
                      ))}
                    </Box>
                  )}
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default Portfolio; 