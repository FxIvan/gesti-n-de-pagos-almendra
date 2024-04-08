"use client";
import { useMemo, useState } from "react";
import { useTable } from "react-table";

import "./App.css";
import { CSVLink } from "react-csv";

const columns = [
  { Header: "ID", accessor: "id" },
  { Header: "Destino", accessor: "destination" },
  { Header: "Tipo de pago", accessor: "typePayment" },
  { Header: "Monto", accessor: "amount" },
  { Header: "Creado", accessor: "date" },
];

export default function PanelAdmin({ session, dataTable }) {
  const [dataTableReset, setDataTableReset] = useState(dataTable);
  const data = useMemo(() => dataTableReset, []);
  const [form, setForm] = useState({
    destination: "",
    typePayment: "",
    amount: "",
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const csvData = [
    ["ID", "Destino", "Tipo de pago", "Monto", "Creado"],
    ...data.map(({ id, destination, typePayment, amount, date }) => [
      id,
      destination,
      typePayment,
      amount,
      date,
    ]),
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        setDataTableReset([...dataTableReset, data]);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row">
        <div className="my-8 w-1/2">
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
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>
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
        <div className="my-8 w-1/2 ml-4 flex justify-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col my-4">
              <label htmlFor="destination">Destino</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                className="mt-4 w-3/4 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="typePayment">Tipo de pago</label>
              <select
                name="typePayment"
                id="typePayment"
                value={form.typePayment}
                onChange={handleChange}
                className="mt-4"
              >
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="amount">Monto</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="mt-4 w-1/2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-black/40 text-white font-bold py-2 px-4 rounded-full mt-8"
            >
              Crear Registro de pago
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
