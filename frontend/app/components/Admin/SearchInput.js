export default function SearchInput({
  filterChangeInput,
  searchFilter,
  addClassname,
}) {
  return (
    <input
      type="text"
      placeholder="Buscar por destino"
      value={searchFilter}
      onChange={(e) => filterChangeInput(e)}
      className={`border border-gray-300 rounded-md w-1/2 mt-4 px-4 ${addClassname}`}
    />
  );
}
