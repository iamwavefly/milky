import OnlyHeader from '@/components/cards/onlyHeader'
import Breadcrumb from '@/components/headers/breadcrumb'
import Dashboard from '@/layouts/dashboard'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const RefundDetails = () => {
  return (
            <Dashboard title="Refunds">
          
          <Breadcrumb title='Refunds details'/>
     
     <Box>
        <OnlyHeader width="489px" height="444px" marginInline="auto" header={"File upload requirements" } alignHeader={"left"} marginTop="38px"> 
            <Box sx={{display:"flex", flexDirection:"column", height:"100%", marginTop:"-1rem", gap:"24px"}}>
            
                <Typography 
                variant='body1' 
                fontSize={"14px"}
                color="#262B40"
                fontFamily={"Poppins"}
                fontWeight={500}
                component="h3"
                
                >  File must be CSV</Typography>
                <Typography variant='body2'fontFamily={"Poppins"} fontSize="14px">
                CSV file should contain transaction reference, and amount columns.
                </Typography>
                <Typography variant='body2'>
                The order of the columns should be the same as the order in which they are listed above with the first row header.
                </Typography>

                <hr />
            </Box>
          
         

        </OnlyHeader>
     </Box>


        </Dashboard>
  )
}

export default RefundDetails