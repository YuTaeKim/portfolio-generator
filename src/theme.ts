import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blue',
      },
    },
    VStack: {
      baseStyle: {
        spacing: 4,
      },
    },
    SimpleGrid: {
      baseStyle: {
        spacing: 6,
      },
    },
  },
});

export default theme; 