const options = ["low-pricing", "high", "A-Z", "Z-A"];

export default function ListBox({ sort, setSort }) {
  const handleSortChange = (option) => {
    setSort(option);
    let sortedItem = [...filter];

    switch (option) {
      case "A-Z":
        sortedItem.sort((a, b) => a.name.localCompare(b.name));
        break;
      case "Z-A":
        sortedItem.sort((a, b) => b.name.localCompare(a.name));
        break;
      case "low-high":
        sortedItem.sort((a, b) => a.price.localCompare(b.price));
        break;
      case "high-low":
        sortedItem.sort((a, b) => b.price.localCompare(a.price));
        break;
      default:
        //break
        break;
    }

    setFilteredItem(sortedItem);
  };

  return (
    <div className="w-[10rem] md:w-[10rem] ">
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="form-control  relative w-full cursor-default rounded-lg 
            bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
            focus-visible:ring-offset-orange-300 sm:text-sm"
        name=""
        id=""
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
