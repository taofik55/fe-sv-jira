'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Table from '@/components/tables/Tables'
// import { Button } from '@mui/material';
// import axios from 'axios';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const tabData: TabData[] = [
    { label: 'projects', content: 'Projects' },
    { label: 'users', content: 'Users' },
    { label: 'issues', content: 'Issues' },
    { label: 'sprints', content: 'Sprints' },
    { label: 'boards', content: 'Boards' },
    { label: 'attachments', content: 'Attachments' },
    { label: 'comments', content: 'Comments' },
    { label: 'links', content: 'Links' }
];

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabData {
    label: string;
    content: string;
  }

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
//   const [value, setValue] = useState<number>(0);
//   const [data, setData] = React.useState<any>(null);
//   const [loading, setLoading] = React.useState<boolean>(false);
//   const [error, setError] = React.useState<string | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

//   const handleDownload = async (filename: string, endpoint: string) => {
//     try {
//         let urls = `https://caring-pheasant-special.ngrok-free.app/download/${endpoint}`
//         // console.log(urls)
//         const response = await axios.get(urls, {
//             responseType: 'blob', // Important for handling file downloads  
//             headers: {
//                 'ngrok-skip-browser-warning': 'true', // Custom header added here
//             },
//         });
//         console.log(response.data)
//         // Create a link element to trigger the download
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', filename); // Set the filename for the downloaded file
//         document.body.appendChild(link);
//         link.click();
//         link.parentNode?.removeChild(link)
//         window.URL.revokeObjectURL(url)
//         // link.remove();
//     } catch (error) {
//         console.error('Error downloading file:', error);
//     }
//   };

//   const fetchData = async (endpoint: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`https://caring-pheasant-special.ngrok-free.app/${endpoint}`, {
//         headers: {
//           'ngrok-skip-browser-warning': 'true', // Custom header added here
//         },
//       });
//     //   console.log(response.data);
//       setData(response.data);
//     } catch (error: any) {
//       console.error('Error fetching data:', error);
//       setError('Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

 

  return (
    <Box sx={{ width: '150vh' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {tabData.map((tab, index) => (
                    <Tab label={tab.content} {...a11yProps(index)} key={tab.label}/>
                ))}
            </Tabs>
        </Box>
        {tabData.map((tab, index) => (
            <CustomTabPanel value={value} index={index} key={tab.label}>
                {/* <h1 style={{borderBottom: 1}}>{tab.content}</h1> */}
                <Table title={tab.label}/>
                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDownload(tab.content + '.csv', tab.label)}
                >Download</Button> */}
                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fetchData(tab.label)}
                >Fetch</Button> */}
            </CustomTabPanel>
        ))}
    </Box>
  );
}
