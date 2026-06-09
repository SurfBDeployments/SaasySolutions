'use client';

import ResponsiveAppBar from '../appbar';
import Footer from '../../footer';
import '../../styles/default.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [

  { field: 'name', headerName: 'Name', width: 150, headerClassName: 'bold-header' },
  { field: 'author', headerName: 'Author', width: 120, headerClassName: 'bold-header' },
  { field: 'description', headerName: 'Description', width: 120, headerClassName: 'bold-header' },
  { field: 'url', headerName: 'Url', width: 120, headerClassName: 'bold-header' },
  { field: 'urlToImage', headerName: 'Image', width: 350, headerClassName: 'bold-header' },
  { field: 'publishedAt', headerName: 'Published At', width: 350, headerClassName: 'bold-header' },
  { field: 'urlToImage', headerName: 'Image', width: 350, headerClassName: 'bold-header' },
  { field: 'content', headerName: 'Content', width: 200, headerClassName: 'bold-header' },
];



const paginationModel = { page: 0, pageSize: 10 };

type NewsItem = {

  name: string;
  author: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;

};


interface NewsClientProps {
  data: NewsItem[];
}

export default function NewsClient({ data }: NewsClientProps) {
  return (
    <>
      <ResponsiveAppBar />
      <article>
        <div className="max-w-7xl mx-auto">
          <div className="maincontent">
            <h1 className="max-w-m text-4xl font-semibold">Latest News</h1>
            <h5 className="max-w-m text-2xl font-condensed-light leading-relaxed" style={{ marginBottom: '20px' }}>
              A sample listing of news from around the world via our platform. (connected by a Rest API).
            </h5>

            <Paper sx={{ width: '100%', padding: 2 }}>
              <DataGrid
                rows={data.map(NewsItem => ({

                  name: NewsItem.name,
                  author: NewsItem.author,
                  description: NewsItem.description,
                  url: NewsItem.url,
                  urlToImage: NewsItem.urlToImage,
                  publishedAt: NewsItem.publishedAt,
                  content: NewsItem.content
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
