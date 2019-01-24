import React from 'react';
import { Box, Heading } from 'grommet';

const Header = () => (
  <Box tag="header"
       background="brand"
       pad="small"
       elevation="small"
       direction="row"
       align="center"
       flex={true}
     >
       <Heading level={3} margin="none" color="white">
         Brainwaves
       </Heading>
     </Box>
)

export default Header
