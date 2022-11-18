type Props = {
  title: string;
  className: string;
};

export function SectionTitle({ title, className }: Props) {
  return (
    <div className={`w-full flex justify-center items-center  ${className}`}>
      <div className="hidden md:block w-1/6 h-[3px] bg-palm-700 "></div>
      <h1 className="md:max-w-[30%] text-center font-display text-sm md:text-[1.75rem] text-palm-700 mx-3">
        {title}
      </h1>
      <div className="hidden md:block w-1/6 h-[3px] bg-palm-700"></div>
    </div>
  );
}
