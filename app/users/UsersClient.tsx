'use client';

import ResponsiveAppBar from '../components/appbar';
import Footer from '../components/footer';
import '../../styles/default.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, headerClassName: 'bold-header' },
  { field: 'name', headerName: 'Name', width: 150, headerClassName: 'bold-header' },
  { field: 'email', headerName: 'Email', width: 120, headerClassName: 'bold-header' },
  { field: 'company', headerName: 'Company', width: 120, headerClassName: 'bold-header' },
  { field: 'website', headerName: 'Website', width: 120, headerClassName: 'bold-header' },
  { field: 'addressText', headerName: 'Address', width: 350, headerClassName: 'bold-header' },
];



type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  website: string;
  address: {
    street: string;
    city: string;
    suite: string;
    zipcode: string;
  };
};

interface UsersClientProps {
  data: User[];
}

export default function UsersClient({ data }: UsersClientProps) {
  return (
    <>
      <ResponsiveAppBar />
   <article>
      <div className="max-w-7xl mx-auto">
        <div className="maincontent">
          <h1 className="max-w-m text-4xl font-semibold">List of Happy Customers</h1>
          <h5 className="max-w-m text-2xl font-condensed-light leading-relaxed" style={{ marginBottom: '20px' }}>
            A sample listing of customers around the world via our platform. (connected by a Rest API).
          </h5>

          <Paper sx={{width: '100%', height: '600', padding: 2 }}>
            <DataGrid
              rows={data.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                company: user.company.name,
                website: user.website,
                addressText: user.address
                  ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
                  : '',
              }))}
              columns={columns}
              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
              pageSizeOptions={[5, 10, 20]}
              sx={{
                /*border: 1,
                borderColor: '#ededed',*/
                '& .bold-header': {
                  fontWeight: 'bold',
                },
              }}
            />
          </Paper>
        </div>
      </div>
      </article>

      <Footer />
    </>
  );
}
