import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

type Props = {
  children: ReactNode;
};
export const Layout = ({ children }: Props) => {
  return (
    <Box mx="auto" p={4}>
      <main>
        <Sidebar/>
        {children}
      </main>
    </Box>
  );
};
