'use client';

import { useEffect, useState } from 'react';
import { gql } from 'graphql-request';
import client from '../../../lib/graphqlClient';
import '../../../styles/default.css';
import ResponsiveAppBar from '../../components/appbar';
import Footer from '../../components/footer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';



// 1. Updated query to include 'Currency'
/* const GET_COUNTRIES = gql`
query ListCountriesThatUseUSD {
  countries(filter: { currency: { eq: "USD" } }) {
    code
    name
    languages {
      name
    }
  }
}
`; */
// 2. Updated columns with proper formatting for nested array data
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
// 2. Flattened fields & utilized valueGetter for nested properties like 'Capital.name'
/* const columns: GridColDef[] = [


   { field: 'name', headerName: 'Name', width: 150, headerClassName: 'bold-header' },
     { field: 'code', headerName: 'Code', width: 150, headerClassName: 'bold-header' },
      { field: 'languages', headerName: 'Languages', width: 150, headerClassName: 'bold-header' },
   { field: 'capital', headerName: 'Capital', width: 120, headerClassName: 'bold-header' },
  { field: 'currency', headerName: 'Currency', width: 120, headerClassName: 'bold-header' },
  { field: 'emoji', headerName: 'Emoji', width: 120, headerClassName: 'bold-header' }, 

]; */


export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .request(GET_COUNTRIES)
      .then((data) => {
        setCountries(data.countries);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (error) return <p className="p-8 text-center text-red-500">Error: {error}</p>;
  if (!countries.length) return <p className="p-8 text-center">No data available</p>;

  return (
    <>
      <ResponsiveAppBar />

      <div className="max-w-7xl mx-auto px-4 my-8">
        <div className='maincontent'>
          <h1 className="text-4xl font-semibold mb-2">Apis</h1>
          <h3 className="text-4xl font-semibold mb-2">List of Countries</h3>
          <h5 className="text-2xl font-condensed-light text-gray-600 mb-6">
            A listing of countries listed by Trevor Blades API https://countries.trevorblades.com/ (connected via GraphQL API and using Material UI DataGrid).
          </h5>

          {/* 3. Integrated DataGrid using the API state */}
          <Paper sx={{ height: 600, width: '100%', padding: 10 }}>
            <DataGrid
              rows={countries}
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