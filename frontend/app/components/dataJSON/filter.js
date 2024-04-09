export const dataInputFilter = {
  date: [
    {
      name: "Mas nuevo",
      filterName: "date",
      subfilterName: "moreNow",
    },
    {
      name: "Mas viejo",
      filterName: "date",
      subfilterName: "lessNow",
    },
  ],
  amount: [
    {
      name: "Menor a mayor",
      filterName: "amount",
      subfilterName: "less",
    },
    {
      name: "Mayor a menor",
      filterName: "amount",
      subfilterName: "more",
    },
  ],
  typePayment: [
    {
      name: "Debito",
      filterName: "typePayment",
      subfilterName: "debit",
    },
    {
      name: "Credito",
      filterName: "typePayment",
      subfilterName: "credit",
    },
    {
      name: "Efectivo",
      filterName: "typePayment",
      subfilterName: "cash",
    },
  ],
};
