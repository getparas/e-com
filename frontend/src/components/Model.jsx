const Model = ({ isOpen, onClose, children }) => {
  return (
    <div>
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-white opacity-50"></div>
            <div className="absolute top-[40%] right-[50%] bg-black p-4 rounded-lg z-10 text-right">
              <button
                className="mr-2 text-xl font-bold text-white hover:text-zinc-300 focus:outline-none"
                onClick={onClose}
              >
                X
              </button>
              {children}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Model;
