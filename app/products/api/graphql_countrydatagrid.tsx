'use client';

import { useEffect, useState } from 'react';
import { gql } from 'graphql-request';
import client from '../../../lib/graphqlClient';
import '../../../styles/default.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// 1. Updated query to include code, name, currency, and languages
/* const GET_COUNTRIES = gql`
  query ListCountriesThatUseUSD {
    countries(filter: { currency: { eq: "USD" } }) {
      code
      name
      currency
      languages {
        name
      }
    }
  }
`; */

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
// 2. Updated columns with proper formatting for nested array data
/* const columns: GridColDef[] = [
  { field: 'code', headerName: 'Code', width: 100, headerClassName: 'bold-header' },
  { field: 'name', headerName: 'Name', width: 200, headerClassName: 'bold-header' },
  { field: 'currency', headerName: 'Currency', width: 120, headerClassName: 'bold-header' },
  {
    field: 'languages',
    headerName: 'Languages',
    width: 250,
    headerClassName: 'bold-header',
    valueGetter: (value, row) => {
      const langs = row?.languages || [];
      return langs.map((l: { name: string }) => l.name).join(', ');
    },
  },
];
 */

export default function Countries() {
  const [countries, setCountries] = useState<any[]>([]);
  const [showUSDOnly, setShowUSDOnly] = useState(false);
    //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState<string | null>(null);

  // Filter rows directly in render state
  const displayedRows = showUSDOnly
    ? countries.filter((c) => c.currency?.includes('USD'))
    : countries;
  useEffect(() => {
    client
      .request<{ countries: any[] }>(GET_COUNTRIES)
      .then((data) => {
        // Fix: Trevor Blades API returns array directly on `data.countries`
        setCountries(data.countries || []);
        //setLoading(false);
      })
     /*  .catch((err) => {
        setError(err.message);
        setLoading(false);
      }); */
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

/* export default function Countries() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client
      .request<{ countries: any[] }>(GET_COUNTRIES)
      .then((data) => {
        // Fix: Trevor Blades API returns array directly on `data.countries`
        setCountries(data.countries || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (error) return <p className="p-8 text-center text-red-500">Error: {error}</p>;
  if (!countries?.length) return <p className="p-8 text-center">No data available</p>;

  return (
    <DataGrid
      rows={countries}
      columns={columns}
      getRowId={(row) => row.code} // Fix: Uses country 'code' as unique ID key
      initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
      pageSizeOptions={[5, 10, 20]}
      sx={{
        '& .bold-header': {
          fontWeight: 'bold',
        },
      }}
    />
  );
} */