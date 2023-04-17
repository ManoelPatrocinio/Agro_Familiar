//logic used on video Vinicius Dacal: https://www.youtube.com/watch?v=v91BLoapVDw&t=1372s
//logic used on video rocketseat: https://www.youtube.com/watch?v=6-VDE3H9-WU&t=2652s
import classNames from "classnames";

const MAX_BTN_ITEMS = 9; //maximum number of items shown on the page
const MAX_LEFT = (MAX_BTN_ITEMS - 1) / 2; //maximum number of items shown on left
interface IProp {
  total: number;
  offSet: number;
  limit: number;
  setOffSet: (offset: number) => void;
}
export function Pagination({ limit, total, offSet, setOffSet }: IProp) {
  const current = offSet ? offSet / limit + 1 : 1;
  const totalPage = Math.ceil(total / limit); //total page
  const firstPage = Math.max(current - MAX_LEFT, 1);

  function onPageChange(page: number) {
    setOffSet((page - 1) * limit);
  }

  return (
    <nav
      className="w-full flex justify-center  items-center "
      aria-label="PageNavigation "
    >
      <ul className="list-style-none flex">
        <li>
          <button
            className="cursor-pointer relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-palm-700 transition-all duration-300 dark:text-palm-500"
            onClick={() => onPageChange(current - 1)}
            disabled={current === 1}
          >
            Anterior
          </button>
        </li>
        {/* 1º map => transform a array underfined in a array of the page number, using MAX_Items */}
        {Array.from({ length: Math.min(MAX_BTN_ITEMS, totalPage) })
          .map((_, index) => index + firstPage)
          .map((page) => {
            if (page <= limit) {
              return (
                <li key={page}>
                  <button
                    onClick={() => onPageChange(page)}
                    className={classNames(
                      "relative block rounded-full bg-transparent px-3 py-1.5 text-sm  transition-all duration-300 hover:bg-palm-900 hover:text-white mx-2",
                      {
                        "bg-palm-900 text-white": page === current,
                        "text-gray-500": page !== current,
                      }
                    )}
                  >
                    {page}
                  </button>
                </li>
              );
            }
          })}

        <li>
          <button
            className="cursor-pointer relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-palm-700 transition-all duration-300 dark:text-palm-500"
            onClick={() => onPageChange(current + 1)}
            disabled={current === totalPage}
          >
            Proxíma
          </button>
        </li>
      </ul>
    </nav>
  );
}
