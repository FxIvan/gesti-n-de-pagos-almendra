"use client";
import { useMemo, useState } from "react";
import { useTable } from "react-table";
import { useRouter } from "next/navigation";

import "./App.css";
import { CSVLink } from "react-csv";

import myToast from "../../components/custom/MyToast";

const columns = [
  { id: 1, Header: "ID", accessor: "id" },
  { id: 2, Header: "Destino", accessor: "destination" },
  { id: 3, Header: "Tipo de pago", accessor: "typePayment" },
  { id: 4, Header: "Monto", accessor: "amount" },
  { id: 5, Header: "Creado", accessor: "date" },
];

export default function PanelAdmin({ session, dataTable }) {
  const router = useRouter();

  const [dataTableReset, setDataTableReset] = useState(dataTable);
  const [searchFilter, setSearchFilter] = useState("");
  const data = useMemo(() => dataTableReset, [dataTableReset]);
  const [form, setForm] = useState({
    destination: "",
    typePayment: "debit",
    amount: 0,
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
        console.log("data", data);
        if (data.dataStatus === 400 || !data.status) {
          myToast({
            variant: "danger",
            children: data.message,
          });
          return;
        }
        setDataTableReset([...dataTableReset, data.payment]);
        myToast({
          variant: "success",
          children: "Registro de pago creado exitosamente",
        });
        setForm({
          destination: "",
          typePayment: "debit",
          amount: 0,
        });
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        myToast({
          variant: "danger",
          children: error.message,
        });
      });
  };

  const filterSubmit = async (dataFilter, type) => {
    let paramFilter = "";

    switch (type) {
      case "date":
        paramFilter += `?dateFilter=${dataFilter}`;
        break;
      case "amount":
        paramFilter += `?amount=${dataFilter}`;
        break;
      case "typePayment":
        paramFilter += `?typePayment=${dataFilter}`;
        break;
      default:
        break;
    }

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/filter${paramFilter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setDataTableReset(data);
      });
  };

  const filterChangeInput = async (e) => {
    setSearchFilter(e.target.value);
    setDataTableReset(
      dataTable.filter((data) =>
        data.destination.toLowerCase().includes(searchFilter.toLowerCase())
      )
    );
  };

  return (
    <div className="container mx-auto">
      <div className="hidden md:flex">
        <input
          type="text"
          placeholder="Buscar por destino"
          value={searchFilter}
          onChange={(e) => filterChangeInput(e)}
          className="border border-gray-300 rounded-md w-1/2 mt-4 px-4"
        />
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="my-8 mx-2 md:mx-0 md:w-4/6">
          <div className="flex my-8 justify-center md:hidden">
            <input
              type="text"
              placeholder="Buscar por destino"
              value={searchFilter}
              onChange={(e) => filterChangeInput(e)}
              className="border border-gray-300 rounded-md w-1/2 mt-4 px-4"
            />
          </div>
          <div>
            <div>
              <ul className="my-4">
                <li>Reset</li>
                <li
                  className="cursor-pointer text-xs md:text-sm mt-2"
                  onClick={() => setDataTableReset(dataTable)}
                >
                  Resetear tabla
                </li>
              </ul>
            </div>
            <div className="flex flex-row w-full justify-between">
              <ul>
                <li>Filtrar por fecha</li>
                <li
                  className="cursor-pointer text-xs md:text-sm mt-2"
                  onClick={() => {
                    filterSubmit("moreNow", "date");
                  }}
                >
                  Mas nuevo
                </li>
                <li
                  className="cursor-pointer text-xs md:text-sm mt-2"
                  onClick={() => {
                    filterSubmit("lessNow", "date");
                  }}
                >
                  Mas viejo
                </li>
              </ul>
              <ul>
                <li>Filtrar por monto</li>
                <li
                  className="cursor-pointer text-xs md:text-sm mt-2"
                  onClick={() => {
                    filterSubmit("less", "amount");
                  }}
                >
                  Menor a mayor
                </li>
                <li
                  className="cursor-pointer text-xs md:text-sm mt-2"
                  onClick={() => {
                    filterSubmit("more", "amount");
                  }}
                >
                  Mayor a menor
                </li>
              </ul>
              <ul>
                <li>Filtrar por tipo de pago</li>
                <li
                  className="cursor-pointer text-xs md:text-sm mt-2"
                  onClick={() => {
                    filterSubmit("debit", "typePayment");
                  }}
                >
                  Debito
                </li>
                <li
                  className="cursor-pointer text-xs md:text-sm mt-2"
                  onClick={() => {
                    filterSubmit("credit", "typePayment");
                  }}
                >
                  Credito
                </li>
                <li
                  className="cursor-pointer text-xs md:text-sm mt-2"
                  onClick={() => {
                    filterSubmit("cash", "typePayment");
                  }}
                >
                  Efectivo
                </li>
              </ul>
            </div>
            <div></div>
            <div></div>
          </div>
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
                      <tr
                        key={headerGroup.id}
                        {...headerGroup.getHeaderGroupProps()}
                      >
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
        </div>
        <div className="my-8 md:w-2/6 ml-4 flex justify-center">
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
                className="mt-4 border border-gray-300 rounded-md"
              >
                <option value="debit">Debito</option>
                <option value="credit">Credito</option>
                <option value="cash">Efectivo</option>
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
