"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import "./App.css";

import myToast from "../../components/custom/MyToast";
import SearchInput from "./SearchInput";
import { dataInputFilter } from "../dataJSON/filter";
import Table from "./Table";
import Form from "./Form";

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
  const [inputSelect, setInputSelect] = useState("");
  const data = useMemo(() => dataTableReset, [dataTableReset]);
  const [form, setForm] = useState({
    destination: "",
    typePayment: "debit",
    amount: 0,
  });

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
    <div className="mx-2 md:container md:mx-auto">
      <div className="hidden md:flex">
        <SearchInput
          searchFilter={searchFilter}
          filterChangeInput={filterChangeInput}
          addClassname=""
        />
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="my-8 mx-2 md:mx-0 md:w-4/6">
          <div className=" my-8 block md:hidden">
            <SearchInput
              searchFilter={searchFilter}
              filterChangeInput={filterChangeInput}
              addClassname="w-full"
            />
          </div>
          <div>
            <div>
              <ul className="my-4">
                <li>Reset</li>
                <li
                  className="cursor-pointer text-xs md:text-sm mt-2"
                  onClick={() => {
                    setInputSelect("");
                    setDataTableReset(dataTable);
                  }}
                >
                  Resetear tabla
                </li>
              </ul>
            </div>
            <div className="flex flex-row w-full justify-between">
              <div>
                <span className="text-sm md:text-base">Filtrar por fecha</span>
                <div className="flex flex-col">
                  {dataInputFilter.date.map((data, index) => (
                    <span
                      key={index}
                      className={`cursor-pointer text-xs my-2 md:text-sm ${
                        data.subfilterName === inputSelect &&
                        "text-black font-semibold"
                      } `}
                      onClick={() => {
                        setInputSelect(data.subfilterName);
                        filterSubmit(data.subfilterName, data.filterName);
                      }}
                    >
                      {data.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm md:text-base">Filtrar por monto</span>
                <div className="flex flex-col">
                  {dataInputFilter.amount.map((data, index) => (
                    <span
                      key={index}
                      className={`cursor-pointer text-xs my-2 md:text-sm ${
                        data.subfilterName === inputSelect &&
                        "text-black font-semibold"
                      } `}
                      onClick={() => {
                        setInputSelect(data.subfilterName);
                        filterSubmit(data.subfilterName, data.filterName);
                      }}
                    >
                      {data.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm md:text-base">
                  Filtrar por tipo de pago
                </span>
                <div className="flex flex-col">
                  {dataInputFilter.typePayment.map((data, index) => (
                    <span
                      key={index}
                      className={`cursor-pointer text-xs my-2  md:text-sm ${
                        data.subfilterName === inputSelect &&
                        "text-black font-semibold"
                      } `}
                      onClick={() => {
                        setInputSelect(data.subfilterName);
                        filterSubmit(data.subfilterName, data.filterName);
                      }}
                    >
                      {data.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-scroll md:overflow-auto">
            <Table csvData={csvData} columns={columns} data={data} />
          </div>
        </div>
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          form={form}
        />
      </div>
    </div>
  );
}
