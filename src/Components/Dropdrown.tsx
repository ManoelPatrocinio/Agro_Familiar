import { FunnelSimple  } from "phosphor-react";

export function Dropdrown() {
  return (
    <div className="flex justify-center">
      <div>
        <div className="dropdown relative">
          <a
            className="
          dropdown-toggle
          px-0
          md:px-6
          py-2.5
          text-gray-800
          font-medium
          text-xs
          leading-tight
          
          rounded          
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
            href="#"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FunnelSimple  size={20}  className="mr-2"/>

            Ordenar Por:
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="caret-down"
              className="w-2 ml-2"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
              ></path>
            </svg>
          </a>
          <ul
            className="
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          m-0
          bg-clip-padding
          border-none
        "
            aria-labelledby="dropdownMenuButton2"
          >
            <li>
              <a
                className="
              dropdown-item
              md:text-sm
              text-xs
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                href="#"
              >
                Menor Preço
              </a>
            </li>
            <li>
              <a
                className="
              dropdown-item
              md:text-sm
              text-xs
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                href="#"
              >
                Maior Preço
              </a>
            </li>
            <li>
              <a
                className="
              dropdown-item
              md:text-sm
              text-xs
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                href="#"
              >
                De A - Z
              </a>
            </li>
            <li>
              <a
                className="
              dropdown-item
              md:text-sm
              text-xs
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                href="#"
              >
                De Z - A
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}