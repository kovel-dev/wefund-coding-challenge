import React, { useEffect, useState } from 'react'

// API
import { api } from "../api/axios" 

// MUI components
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeItem, TreeView } from '@mui/lab';
import { Box } from '@mui/system';

// Icons Component
import { Folder, FolderOpen, Description } from '@mui/icons-material';

// Custom Component
import { FileInfo } from '../Components/FileInfo';
import { Typography } from '@mui/material';

// Utils
import { getTotalSize, calcFileSize, getTotalCount } from '../Utils';

export default function Home() {
  const [dirData, setDirData] = useState([])

  useEffect(() => {
    api
      .get("/coding-challenges/dirs")
      .then((res) => {
        setDirData(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const makeItems = (item, selfId) => {
    if (item.type === "file")
      return (<TreeItem nodeId={selfId} label={<FileInfo labelName={item.name} fileSize={item.size} />} icon={<Description />} />)
    
    return (
      <TreeItem nodeId={selfId} label={item.name} collapseIcon={<FolderOpen />} expandIcon={<Folder />}>
        {item.children.map((cItem, index) => makeItems(cItem, selfId + index.toString()))}
      </TreeItem>
    )
  }

  return (
    <Box sx={{ maxWidth: 700, margin: 'auto', marginTop: 10 }}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ChevronRightIcon />}
        defaultExpandIcon={<ExpandMoreIcon />}
        sx={{ flexGrow: 1}}
      >
        {
          dirData.map((item, index) => makeItems(item, index.toString()))
        }
      </TreeView>
      <Typography variant="body1" sx={{ marginTop: 4 }} >Total Files { dirData.reduce((sum, item) => sum + getTotalCount(item), 0) }</Typography>
      <Typography variant="body1" >Total Filesize { calcFileSize(dirData.reduce((sum, item) => sum + getTotalSize(item), 0)) }</Typography>
    </Box>
  )
}