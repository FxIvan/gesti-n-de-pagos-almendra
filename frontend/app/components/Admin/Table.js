import { CSVLink } from "react-csv";

import { useTable } from "react-table";
export default function Table({ csvData, columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <div className="my-4">
        <CSVLink
          className="bg-black hover:bg-black/40 text-white font-bold py-2 px-4 rounded-full"
          filename="my-file.csv"
          data={csvData}
        >
          Export to CSV
        </CSVLink>
      </div>
      <div>
        <div className="App">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      key={index}
                      {...column.getHeaderProps()}
                      className="text-xs md:text-base"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr key={row.id} {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        className="text-xs md:text-base"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
