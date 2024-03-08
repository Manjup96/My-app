import React, { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination, useRowSelect, useFilters, useGlobalFilter } from 'react-table';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';

// A simple text input filter for our table columns
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  return (
    <span>
      Search: {' '}
      <input
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
        placeholder={`${preGlobalFilteredRows.length} records...`}
      />
    </span>
  )
};


const MealsTable = ({ mealsData }) => {
  // Columns setup for react-table
  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Breakfast', accessor: 'breakfast' },
    { Header: 'Lunch', accessor: 'lunch' },
    { Header: 'Dinner', accessor: 'dinner' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Comments', accessor: 'comments' },
    {
      Header: 'Actions',
      id: 'actions',
      Cell: ({ row }) => (
        <div>
          {/* Example action buttons */}
          <button onClick={() => alert(`Editing ${row.values.id}`)}>Edit</button>
          <button onClick={() => alert(`Deleting ${row.values.id}`)}>Delete</button>
        </div>
      ),
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state,
    pageIndex,
    pageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: mealsData,
      initialState: { pageIndex: 0, pageSize: 5 }, // Set page size
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect
  );


  // Function to handle export to CSV
  const exportData = (exportType) => {
    const data = selectedFlatRows.map(row => row.original);
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `export-${exportType}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
     <h2 className="mt-5">Meals</h2>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <h2 className="mt-5">Meals</h2>
      <button onClick={() => exportData('selected')}>Export Selected</button>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default MealsTable;
