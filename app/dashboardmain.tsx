
"use client"

import { useEffect, useState } from 'react';
import '../styles/project-home.css';
import '../styles/default.css';
import { Eye } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { ArrowDownToLine } from 'lucide-react';
import ResponsiveAppBar from './appbar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';



const download = () => {
  return (
    <ArrowDownToLine />
  );
};

const create = () => {
  return (
    <CirclePlus />
  );
};
const view = () => {
  return (
    <Eye />
  );
};
const trash = () => {
  return (
    <CircleX />
  );
};

const edit = () => {
  return (
    <SquarePen />
  );
};
const SimplePaper = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={1} />
      <Paper />
      <Paper elevation={3} />
    </Box>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const lucide = (globalThis as any).lucide;
    if (lucide?.createIcons) {
      lucide.createIcons();
    }
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <ResponsiveAppBar />
      <h1 className="max-w-m text-4xl font-semibold leading-10 tracking-tight text-black dark:text-cyan-800" style={{ textAlign: "center" }}>SaaSy Marketing Team</h1> 
      <h1 className="max-w-m text-4xl font-condensed-light leading-10 tracking-tight text-black dark:text-slate-800" style={{ textAlign: "center", marginBottom: '20px' }}>Marketing that works for You!</h1>


          <Paper elevation={3} />


          <article>
            <div className="max-w-6xl mx-auto">

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-" style={{
                backgroundColor: '#ffffff',
                padding: 20,
                borderRadius: 10,
                border: 'thin solid #e5e7eb',
                marginBottom: 20,
              }}>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Operating System Reports</h1>
                  <p className="text-slate-500 text-sm">Manage, edit, and download your generated data.</p>
                </div>


                <button className="bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors flex items-center gap-2" title="Create New">  <CirclePlus /> Create New </button>
              </div>



              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                      <tr className="bg-gray-300 text-gray-900 uppercase text-s font-semibold">
                        <th style={{ width: 163 }} className="px-6 px-6 py-4 border-b border-gray-200">Title</th>
                        <th style={{ width: 361 }} className="px-6 px-6 py-4 border-b border-gray-200">Description</th>
                        <th style={{ width: 86 }} className="px-6 px-6 py-4 border-b border-gray-200">Date</th>
                        <th style={{ width: 66 }} className="px-6 px-6 py-4 border-b border-gray-200 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">

                      <tr className="hover:bg-gray-100 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-800">Change History Report</td>
                        <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">Tracks changes to the OS environment.</td>
                        <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">Feb 02, 2024</td>
                        <td className="px-6 px-6 py-4 text-right"><div className="flex justify-end gap-2">
                          <button title="View" className="p-2 text-gray-600 hover:bg-slate-200 rounded-sm transition-colors">  <Eye /></button>
                          <button title="Edit" className="p-2 text-gray-600 hover:bg-amber-50 rounded-sm transition-colors"> <SquarePen /></button>
                          <button title="Delete" className="p-2 text-gray-600 hover:bg-red-50 rounded-sm transition-colors"> <CircleX /></button>
                          <button title="Download" className="p-2 text-gray-600 hover:bg-red-50 rounded-sm transition-colors"><ArrowDownToLine /></button>
                        </div></td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-800">CVE Compliance</td>
                        <td className="px-6 px-6 py-4 text-slate-900 text-sm max-w-xs truncate">Identifies systems with known security vulnerabilities....</td>
                        <td className="px-6 px-6 py-4 text-gray-600 text-sm">Oct 12, 2023</td>
                        <td className="px-6 px-6 py-4 text-right"><div className="flex justify-end gap-2">
                          <button title="View" onClick={openModal} className="p-2 text-gray-600 hover:bg-slate-200 rounded-sm transition-colors">  <Eye /></button>
                          <button title="Edit" className="p-2 text-gray-600 hover:bg-amber-50 rounded-sm transition-colors"> <SquarePen /></button>
                          <button title="Delete" className="p-2 text-gray-600 hover:bg-red-50 rounded-sm transition-colors"> <CircleX /></button>
                          <button title="Download" className="p-2 text-gray-600 hover:bg-red-50 rounded-sm transition-colors"><ArrowDownToLine /></button>
                        </div></td>
                      </tr>
                      <tr className="hover:bg-slate-100 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-800">System Health Log</td>
                        <td className="px-6 px-6 py-4 text-slate-900 text-sm max-w-xs truncate">Server uptime statistics and database latency records for March.</td>
                        <td className="px-6 px-6 py-4 text-gray-600 text-sm">Mar 05, 2024</td>
                        <td className="px-6 px-6 py-4 text-right"><div className="flex justify-end gap-2">
                          <button title="View" className="p-2 text-gray-600 hover:bg-slate-200 rounded-sm transition-colors">  <Eye /></button>
                          <button title="Edit" className="p-2 text-gray-600 hover:bg-amber-50 rounded-sm transition-colors"> <SquarePen /></button>
                          <button title="Delete" className="p-2 text-gray-600 hover:bg-red-50 rounded-sm transition-colors"> <CircleX /></button>
                          <button title="Download" className="p-2 text-gray-600 hover:bg-red-50 rounded-sm transition-colors"><ArrowDownToLine /></button>
                        </div></td>
                      </tr>
                      <tr className="hover:bg-slate-100 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-800">Machines Performance</td>
                        <td className="px-6 px-6 py-4 text-slate-900 text-sm max-w-xs truncate">Performance stats of machines breakdown ...</td>
                        <td className="px-6 px-6 py-4 text-gray-600 text-sm">Oct 12, 2024</td>
                        <td className="px-6 px-6 py-4 text-right"><div className="flex justify-end gap-2">
                          <button title="View" className="p-2 text-gray-600 hover:bg-slate-200 rounded-sm transition-colors">  <Eye /></button>
                          <button title="Edit" className="p-2 text-gray-600 hover:bg-amber-50 rounded-sm transition-colors"> <SquarePen /></button>
                          <button title="Delete" className="p-2 text-gray-600 hover:bg-red-50 rounded-sm transition-colors"><CircleX /></button>
                          <button title="Download" className="p-2 text-gray-600 hover:bg-red-50 rounded-sm transition-colors"><ArrowDownToLine /></button>
                        </div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                  <p className="text-xs text-slate-500 font-medium">Page 1 of 2</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-semibold text-slate-00 cursor-not-allowed">Previous</button>
                    <button className="px-3 py-1 text-xs font-semibold text-cyan-600 hover:text-green-600">Next</button>
                  </div>
                </div>

                <div
                  id="myModal"
                  className="modal"
                  style={{ display: modalOpen ? 'block' : 'none' }}
                  onClick={(event) => {
                    if (event.target === event.currentTarget) {
                      closeModal();
                    }
                  }}
                >
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className="w-full max-w-6xl mx-auto p-6">

                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-" style={{
                          backgroundColor: '#ffffff',
                          padding: 20,
                          borderRadius: 10,
                          border: 'thin solid #e5e7eb',
                        }}>
                          <div>
                            <h2 className="text-2xl font-bold text-cyan-800">CVE Compliance Report</h2>
                          </div>
                          <div className="flex gap-3">
                            <button className="px-4 py-1.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-sm hover:bg-slate-100 transition-all">Download PDF</button>
                            <button className="bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors flex items-center gap-2">Export CSV</button>
                          </div>
                        </div>
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                          <thead>
                            <tr>
                              <th className="px-6 px-6 py-4 border-b border-gray-200">CVE ID</th>
                              <th className="px-6 px-6 py-4 border-b border-gray-200">Severity</th>
                              <th className="px-6 px-6 py-4 border-b border-gray-200">CVSS Score</th>
                              <th className="px-6 px-6 py-4 border-b border-gray-200">Asset Name/Host</th>
                              <th className="px-6 px-6 py-4 border-b border-gray-200">Package/Software</th>
                              <th className="px-6 px-6 py-4 border-b border-gray-200">Status</th>
                              <th className="px-6 px-6 py-4 border-b border-gray-200">KEV Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-6 py-4">CVE-2023-38831</td>
                              <td className="severity-critical">Critical</td>
                              <td className="px-6 py-4">9.8</td>
                              <td className="px-6 py-4">FIN-SRV-01</td>
                              <td className="px-6 py-4">WinRAR</td>
                              <td className="px-6 py-4">In Progress</td>
                              <td className="px-6 py-4">True</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4">CVE-2021-44228</td>
                              <td className="severity-critical">Critical</td>
                              <td className="px-6 py-4">10.0</td>
                              <td className="px-6 py-4">APP-WEB-04</td>
                              <td className="px-6 py-4">log4j-core</td>
                              <td className="status-fixed">Fixed</td>
                              <td className="px-6 py-4">True</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4">CVE-2023-4863</td>
                              <td className="severity-high">High</td>
                              <td className="px-6 py-4">8.8</td>
                              <td className="px-6 py-4">MKT-LAP-12</td>
                              <td className="px-6 py-4">Google Chrome</td>
                              <td className="status-new">New</td>
                              <td className="px-6 py-4">True</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4">CVE-2024-21626</td>
                              <td className="severity-high">High</td>
                              <td className="px-6 py-4">8.6</td>
                              <td className="px-6 py-4">DKR-NODE-09</td>
                              <td className="px-6 py-4">runc (Container)</td>
                              <td className="px-6 py-4">In Progress</td>
                              <td className="px-6 py-4">False</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4">CVE-2023-22515</td>
                              <td className="severity-high">High</td>
                              <td className="px-6 py-4">8.0</td>
                              <td className="px-6 py-4">WIKI-PROD-01</td>
                              <td className="px-6 py-4">Atlassian Confluence</td>
                              <td className="status-fixed">Fixed</td>
                              <td className="px-6 py-4">True</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4">CVE-2022-40684</td>
                              <td className="severity-medium">Medium</td>
                              <td className="px-6 py-4">6.5</td>
                              <td className="px-6 py-4">FIREWALL-HQ</td>
                              <td className="px-6 py-4">FortiOS</td>
                              <td className="px-6 py-4">Risk Accepted</td>
                              <td className="px-6 py-4">False</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4">CVE-2023-34048</td>
                              <td className="severity-medium">Medium</td>
                              <td className="px-6 py-4">5.3</td>
                              <td className="px-6 py-4">VM-HOST-02</td>
                              <td className="px-6 py-4">vCenter Server</td>
                              <td className="status-new">New</td>
                              <td className="px-6 py-4">False</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

    </>
  );
}