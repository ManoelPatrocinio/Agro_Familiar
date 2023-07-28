export function HelpModal() {
  return (
    <div
      className="modal fade fixed top-0 left-0  hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="modalHelp"
      tabIndex={-1}
      aria-labelledby="modalHelp"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg relative w-auto ">
        <div
          className="modal-content bg-white  border-none shadow-lg relative  
                    w-full h-auto md:h-[24rem] px-6  rounded "
        >
          <header className="w-full flex justify-center items-center">
            <svg
              width="84"
              height="84"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z"
                stroke="#789B3D"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M32 48C33.6569 48 35 46.6569 35 45C35 43.3431 33.6569 42 32 42C30.3431 42 29 43.3431 29 45C29 46.6569 30.3431 48 32 48Z"
                fill="#789B3D"
              />
              <path
                d="M32 36V34C33.3845 34 34.7378 33.5895 35.889 32.8203C37.0401 32.0511 37.9373 30.9579 38.4672 29.6788C38.997 28.3997 39.1356 26.9922 38.8655 25.6344C38.5954 24.2765 37.9287 23.0292 36.9497 22.0503C35.9708 21.0713 34.7235 20.4046 33.3656 20.1345C32.0078 19.8644 30.6003 20.003 29.3212 20.5328C28.0421 21.0627 26.9489 21.9599 26.1797 23.111C25.4105 24.2622 25 25.6155 25 27"
                stroke="#789B3D"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <button
              type="button"
              className="btn-close box-content w-4 h-4 absolute top-2 right-2 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-palm-700 hover:opacity-75 hover:no-underline cursor-pointer"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </header>
          <div className="w-full pt-6">
            <p className=" w-full text-center text-gray-600 mb-8">
              Caso tenha alguma dúvida ou dificuldade para preencher os
              formulários ou na utilização de qualquer outra parte da
              plataforma, entre em contato com nosso suporte pelo WhatsApp ou
              E-mail do Portal Agro Familiar.
            </p>
            <div className="w-full flex flex-col md:flex-row justify-evenly items-center">
              <div className=" flex justify-start items-center mb-4 md-mb-0 ">
                <svg
                  className="w-[3rem] h-[3rem] mr-3"
                  viewBox="0 0 35 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_998_67)">
                    <path
                      d="M9.25085 30.4762L9.82301 30.759C12.2074 32.1729 14.8776 32.8328 17.548 32.8328C25.9405 32.8328 32.8071 26.0458 32.8071 17.7505C32.8071 13.7915 31.1857 9.92659 28.3248 7.09862C25.4636 4.27064 21.6488 2.66821 17.548 2.66821C9.15555 2.66821 2.28885 9.45524 2.38428 17.8448C2.38428 20.6727 3.2426 23.4065 4.67309 25.7629L5.05454 26.3286L3.52876 31.8902L9.25085 30.4762Z"
                      fill="#00E676"
                    />
                    <path
                      d="M29.9459 5.59027C26.7034 2.29108 22.221 0.5 17.6433 0.5C7.91574 0.5 0.0954297 8.32392 0.190723 17.8446C0.190723 20.8611 1.04904 23.7834 2.47967 26.4227L0 35.3778L9.2508 33.0212C11.8258 34.4353 14.6867 35.0951 17.548 35.0951C27.1802 35.0951 35.0005 27.2711 35.0005 17.7505C35.0005 13.1315 33.1885 8.79527 29.9461 5.59027H29.9459ZM17.6433 32.173C15.0683 32.173 12.4934 31.5132 10.2998 30.1935L9.72768 29.9107L4.19631 31.3246L5.6268 25.9516L5.24535 25.3859C1.04904 18.6932 3.05184 9.83216 9.9184 5.68446C16.785 1.53689 25.6543 3.51649 29.8506 10.3035C34.0468 17.0905 32.044 25.8572 25.1776 30.0049C22.9839 31.4188 20.3137 32.1728 17.6433 32.1728V32.173ZM26.0358 21.7097L24.9867 21.2384C24.9867 21.2384 23.4609 20.5785 22.5072 20.1072C22.4118 20.1072 22.3165 20.0128 22.221 20.0128C21.9349 20.0128 21.7442 20.1072 21.5534 20.2015C21.5534 20.2015 21.4581 20.2957 20.1229 21.8039C20.0275 21.9924 19.8368 22.0868 19.6461 22.0868H19.5506C19.4554 22.0868 19.2646 21.9924 19.1692 21.8982L18.6923 21.7097C17.6433 21.2384 16.6897 20.6727 15.9266 19.9186C15.7359 19.7301 15.4498 19.5416 15.259 19.3531C14.5914 18.6932 13.9238 17.9391 13.4471 17.0907L13.3517 16.9022C13.2564 16.8078 13.2564 16.7136 13.161 16.5251C13.161 16.3366 13.161 16.1481 13.2564 16.0538C13.2564 16.0538 13.6378 15.5824 13.9238 15.2997C14.1147 15.1111 14.21 14.8284 14.4007 14.6399C14.5914 14.357 14.6869 13.98 14.5914 13.6972C14.4962 13.2258 13.3517 10.6807 13.0657 10.1151C12.8748 9.8323 12.6842 9.73811 12.3981 9.64378H11.349C11.1582 9.64378 10.9676 9.73811 10.7767 9.73811L10.6813 9.8323C10.4906 9.92662 10.2998 10.1151 10.1091 10.2093C9.9184 10.398 9.82297 10.5864 9.63225 10.775C8.96465 11.6234 8.5832 12.6603 8.5832 13.6972C8.5832 14.4512 8.77393 15.2054 9.06008 15.8653L9.15551 16.1481C10.0138 17.9391 11.1582 19.5416 12.6842 20.9555L13.0657 21.3326C13.3517 21.6154 13.6378 21.8039 13.8286 22.0866C15.8313 23.7835 18.1202 25.0089 20.6951 25.6688C20.9813 25.763 21.3627 25.763 21.6489 25.8573H22.6025C23.0794 25.8573 23.6515 25.6688 24.0331 25.4803C24.3191 25.2918 24.5098 25.2918 24.7006 25.1032L24.8914 24.9146C25.0821 24.7261 25.2729 24.6319 25.4636 24.4434C25.6543 24.2549 25.845 24.0663 25.9405 23.8777C26.1312 23.5007 26.2265 23.0293 26.3219 22.5581V21.8982C26.3219 21.8982 26.2265 21.8039 26.0358 21.7097Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_998_67">
                      <rect
                        width="35"
                        height="35"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div className="w-4/5 text-left">
                  <p className="w-full text-md text-gray-700">WhatsApp</p>
                  <span className="text-sm text-gray-600">(74) 98819-3405</span>
                </div>
              </div>
              <div className=" flex justify-start items-center">
                <svg
                  className="w-[3rem] h-[3rem] mr-3"
                
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="45" height="45" fill="url(#pattern0)" />
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_169_40"
                        transform="scale(0.0104167)"
                      />
                    </pattern>
                    <image
                      id="image0_169_40"
                      width="96"
                      height="96"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
                <div className="w-4/5 text-left">
                  <p className="w-full text-md text-gray-700">E-Mail</p>
                  <span className="text-sm text-gray-600">portalagrofamiliar@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
