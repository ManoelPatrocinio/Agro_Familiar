
type Props ={
    w: string,
    h: string,
    color: string,
    className?: string
}
export function IconAddList({w,h,color,className}:Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 30 30"
      className={className}
    >
      <path
        fill={color}
        d="M3.75 7.813A4.062 4.062 0 017.813 3.75h14.375a4.062 4.062 0 014.062 4.063v7.215A8.126 8.126 0 0015.027 26.25H7.813a4.062 4.062 0 01-4.063-4.063V7.813zm11.875 3.75c0 .517.42.937.938.937h4.375a.938.938 0 000-1.875h-4.375a.938.938 0 00-.938.938zm-2.15-.588A.937.937 0 1012.15 9.65l-1.838 1.838-.587-.588A.937.937 0 008.4 12.225l1.25 1.25a.937.937 0 001.325 0l2.5-2.5zm0 5.55a.937.937 0 00-1.325 0l-1.838 1.838-.587-.588A.937.937 0 008.4 19.1l1.25 1.25a.937.937 0 001.325 0l2.5-2.5a.937.937 0 000-1.325zm15.275 5.35a6.875 6.875 0 10-13.75 0 6.875 6.875 0 0013.75 0zm-6.25.625l.001 3.129a.625.625 0 11-1.25 0V22.5H18.12a.624.624 0 110-1.25h3.13v-3.125a.624.624 0 111.25 0v3.125h3.121a.625.625 0 110 1.25H22.5z"
      ></path>
    </svg>
  );
}

 