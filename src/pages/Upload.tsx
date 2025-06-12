import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Textarea,
  VStack,
  useToast,
  Input,
} from '@chakra-ui/react';
import { supabase } from '../lib/supabase';

const Upload: React.FC = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: _data, error } = await supabase
        .from('documents')
        .insert([
          {
            title,
            content,
            user_id: user.id,
            category: 'meeting_notes', // 기본값으로 설정
            tags: [], // 기본값으로 설정
          },
        ])
        .select();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your document has been uploaded successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setContent('');
      setTitle('');
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload document. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="800px" py={10}>
      <VStack spacing={8}>
        <Heading>Upload Document</Heading>
        <Box w="100%" as="form" onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title..."
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Meeting Notes or Reflection</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your meeting notes or reflection here..."
              size="lg"
              minH="300px"
              required
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={loading}
            isDisabled={!content.trim() || !title.trim()}
          >
            Upload
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Upload; 