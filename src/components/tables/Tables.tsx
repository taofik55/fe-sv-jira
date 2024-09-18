import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Button } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'UserID', headerName: 'User ID', width: 100 },
  { field: 'JiraUserID', headerName: 'Jira User ID', width: 200 },
  { field: 'DisplayName', headerName: 'Display Name', width: 200 },
  { field: 'Email', headerName: 'Email', width: 200 },
  { field: 'Active', headerName: 'Active', width: 100 },
  { field: 'Created', headerName: 'Created Date', width: 200 },
];

type TableProps = {
    title: string;
};


// const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ title }: TableProps) {
    const [data, setData] = useState<any[]>([]);
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [idField, setIdField] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const url = `https://caring-pheasant-special.ngrok-free.app/${title}`; // Use your actual endpoint
          const response = await axios.get(url, {
            headers: {
              'ngrok-skip-browser-warning': 'true', // Custom header added here
            },
          });
          const firstItem = response.data[0];
          const keys = Object.keys(firstItem);
          const dynamicColumns = Object.keys(firstItem).map(key => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter of the header
            flex: 1,
          }));
    
          setColumns(dynamicColumns);
          const idField = keys[0]; 
          setIdField(idField);

    
          setData(response.data);
        } catch (error: any) {
        //   console.error('Error fetching data:', error);
          setError('Failed to fetch data');
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDownload = async (filename: string, endpoint: string) => {
        try {
            let urls = `https://caring-pheasant-special.ngrok-free.app/download/${endpoint}`
            // console.log(urls)
            const response = await axios.get(urls, {
                responseType: 'blob', // Important for handling file downloads  
                headers: {
                    'ngrok-skip-browser-warning': 'true', // Custom header added here
                },
            });
            // console.log(response.data)
            // Create a link element to trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Set the filename for the downloaded file
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link)
            window.URL.revokeObjectURL(url)
            // link.remove();
        } catch (error) {
            // console.error('Error downloading file:', error);
        }
      };

    return (
        <>
            <Paper sx={{ marginBottom: 2.5, width: '100%' }}>
            {error && <div>Error: {error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{ height: 400, width: '100%', overflowX: 'auto' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    // pageSizeOptions={[5, 10]}
                    // checkboxSelection
                    // disableSelectionOnClick
                    getRowId={(row) => row[idField as string]} // Use the dynamic ID field
                    sx={{ border: 0 }}
                />
                </div>
            )}
            </Paper>
            {loading?
            <Button
                variant="contained"
                disabled
                // onClick={() => handleDownload(title + '.csv', title)}
            >Download</Button>
            :<Button
                variant="contained"
                color="primary"
                onClick={() => handleDownload(title + '.csv', title)}
            >Download</Button>}
        </>
  );
}
