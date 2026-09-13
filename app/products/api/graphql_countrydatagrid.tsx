'use client';

import { useEffect, useState } from 'react';
import { gql } from 'graphql-request';
import client from '../../../lib/graphqlClient';
import '../../../styles/default.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


// 1. Omit the filter and empty parentheses entirely to fetch all countries
const GET_COUNTRIES = gql`
  query ListAllCountries {
    countries {
      code
      name
      capital
      currency
      emoji
      languages {
        name
      }
    }
  }
`;

// 2. DataGrid Columns
const columns: GridColDef[] = [
  { field: 'code', headerName: 'Code', width: 90, headerClassName: 'bold-header' },
  { field: 'emoji', headerName: 'Flag', width: 80, headerClassName: 'bold-header' },
  { field: 'name', headerName: 'Name', width: 180, headerClassName: 'bold-header' },
  { field: 'capital', headerName: 'Capital', width: 150, headerClassName: 'bold-header' },
  { field: 'currency', headerName: 'Currency', width: 120, headerClassName: 'bold-header' },
  {
    field: 'languages',
    headerName: 'Languages',
    width: 200,
    headerClassName: 'bold-header',
    valueGetter: (value, row) => {
      const langs = row?.languages || [];
      return langs.map((l: { name: string }) => l.name).join(', ');
    },
  },
];


type Country = {
  code: string;
  name: string;
  capital?: string;
  currency?: string;
  emoji?: string;
  languages?: { name: string }[];
};

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [showUSDOnly, setShowUSDOnly] = useState(false);

  // Filter rows directly in render state
  const displayedRows = showUSDOnly
    ? countries.filter((c: Country) => c.currency?.includes('USD'))
    : countries;

  useEffect(() => {
    client
      .request<{ countries: Country[] }>(GET_COUNTRIES)
      .then((data) => {
        setCountries(data.countries || []);
      })
      .catch((error) => {
        console.error('Failed to load countries:', error);
      });
  }, []);
  return (
    <div>
    
<button
        onClick={() => setShowUSDOnly(!showUSDOnly)}
        style={{ marginLeft: '0', marginTop:'1rem', marginBottom:'1rem',cursor: 'pointer' }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showUSDOnly ? 'Show All Countries' : 'Show USD Countries Only'}
        
      </button>
      <DataGrid
        rows={displayedRows}
        columns={columns}
        getRowId={(row) => row.code}
           initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
      pageSizeOptions={[5, 10, 20]}
      sx={{
        '& .bold-header': {
          fontWeight: 'bold',
          cursor: 'pointer',
        },
        '& .MuiDataGrid-columnHeader:focus': {
          outline: 'none',
        },
      }}
      />
        
    </div>
  );
}
