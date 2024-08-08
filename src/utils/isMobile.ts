import { useEffect, useState } from 'react';
import { useMediaQuery } from '@chakra-ui/react';

export const useIsMobile = () => {
  const [isClient, setIsClient] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return false;
  }

  return isMobile;
};
