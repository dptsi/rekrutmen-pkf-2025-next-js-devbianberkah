import React from 'react'
import { Box,Text ,Heading,Flex,Link} from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <Box
    position="fixed"
    left="0"
    top="0"
    bottom="0"
    width="250px"
    borderRight="1px solid"
    p={4}
  >
    <Flex direction="column" gap={4}>
      <Link href='articlepage'><Text fontSize="sm">Article</Text></Link>
      <Link href='todolist'><Text fontSize="sm">Todo List</Text></Link>
    </Flex>
  </Box>    
  )
}

export default Sidebar;
