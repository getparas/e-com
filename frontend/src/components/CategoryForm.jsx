const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3 ">
        <input
          type="text"
          className="w-full px-4 py-3 text-xl border-2 rounded-lg"
          placeholder="Write Category Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-between">
          <button className="px-5 py-3 text-xl text-black bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none">
            {buttonText}
          </button>
          {handleDelete && (
            <button
              className="px-5 py-3 text-xl text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
