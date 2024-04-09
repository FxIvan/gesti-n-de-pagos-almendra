export default function Form({ handleSubmit, handleChange, form }) {
  return (
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
  );
}
