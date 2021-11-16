import React from 'react'

// MUI Components
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { calcFileSize } from '../Utils'

export const FileInfo = ({labelName, fileSize}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '300px', justifyContent: 'space-between' }}>
      <Typography variant="subtitle1" >{ labelName }</Typography>
      <Typography variant="subtitle2" >{ calcFileSize(fileSize) }</Typography>
    </Box>
  )
}