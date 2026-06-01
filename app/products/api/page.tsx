'use client';

import { useEffect, useState } from 'react';
import { gql } from 'graphql-request';
import client from '../../../lib/graphqlClient';
import '../../../styles/default.css';
import ResponsiveAppBar from '../../appbar';
import Footer from '../../../footer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// 1. Updated query to include 'species'
const GET_RICKNMORTY = gql`
query {
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      status
      species
      gender
      origin {
        name
      }
    }
  }
}
`;

// 2. Flattened fields & utilized valueGetter for nested properties like 'origin.name'
const columns: GridColDef[] = [

  { field: 'id', headerName: 'ID', width: 70, headerClassName: 'bold-header' },
  { field: 'name', headerName: 'Name', width: 150, headerClassName: 'bold-header' },
  { field: 'status', headerName: 'Status', width: 120, headerClassName: 'bold-header' },
  { field: 'species', headerName: 'Species', width: 120, headerClassName: 'bold-header' },
  { field: 'gender', headerName: 'Gender', width: 120, headerClassName: 'bold-header' },
  {
    field: 'origin',
    headerClassName: 'bold-header',
    headerName: 'Origin',
    width: 180,
    valueGetter: (value, row) => row.origin?.name || 'Unknown',
  },
  {
    field: 'fullName',
    headerName: 'Full Info Summary',
    headerClassName: 'bold-header',
    sortable: false,
    width: 250,
    valueGetter: (value, row) => `${row.name || ''} from ${row.origin?.name || 'Unknown'}`,
  },
];


const paginationModel = { page: 0, pageSize: 5 };

export default function Home() {
  const [ricknmorty, setRicknMorty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .request(GET_RICKNMORTY)
      .then((data) => {
        setRicknMorty(data.characters.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (error) return <p className="p-8 text-center text-red-500">Error: {error}</p>;
  if (!ricknmorty.length) return <p className="p-8 text-center">No data available</p>;

  return (
    <>
      <ResponsiveAppBar />

      <div className="max-w-7xl mx-auto px-4 my-8">
        <div className='maincontent'>
          <h1 className="text-4xl font-semibold mb-2">Apis</h1>
          <h3 className="text-4xl font-semibold mb-2">Rick and Morty Characters</h3>
          <h5 className="text-2xl font-condensed-light text-gray-600 mb-6">
            A sample listing of characters from the show (connected via GraphQL API and using Material UI DataGrid).
          </h5>

          {/* 3. Integrated DataGrid using the API state */}
          <Paper sx={{ height: 600, width: '100%', padding: 2 }}>
            <DataGrid
              rows={ricknmorty}
              columns={columns}

              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
              pageSizeOptions={[5, 10, 20]}
              sx={{
                border: 1,
                borderColor: '#ededed',
                // Target your custom class name inside MUI's DOM structure
                '& .bold-header': {
                  fontWeight: 'bold', // or 'bold'
                },
              }}
            />
          </Paper>
        </div>
      </div>

      <Footer />
    </>
  );
}