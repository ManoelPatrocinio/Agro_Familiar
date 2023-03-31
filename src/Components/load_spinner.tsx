interface IProp {
  adicionalClass?: string;
  message: string;
}
export function Load_spinner({ adicionalClass, message }: IProp) {
  return (
    <div
      className={
        adicionalClass
          ? `flex flex-col justify-center items-center ${adicionalClass}`
          : "w-full h-full flex flex-col justify-center items-center"
      }
    >
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-20 w-20 animate-spin rounded-full text-palm-700 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-8"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-palm-700">{message}</h3>
    </div>
  );
}
