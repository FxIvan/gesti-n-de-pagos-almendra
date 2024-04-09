export default function Form({ handleSubmit, handleChange, form }) {
  return (
    <div className="my-8 md:w-2/6 ml-4 md:flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col my-4">
          <label htmlFor="destination">Destino</label>
          <input
            type="text"
            id="destination"
            placeholder="Ingrese el nombre del destino"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className="mt-4 border border-gray-300 rounded-md w-72 p-1"
          />
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="typePayment">Tipo de pago</label>
          <select
            name="typePayment"
            id="typePayment"
            value={form.typePayment}
            onChange={handleChange}
            className="mt-4 border border-gray-300 rounded-md w-52 p-1"
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
            placeholder="Ingrese monto en $ARS"
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="mt-4 border border-gray-300 rounded-md w-52 p-1"
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
