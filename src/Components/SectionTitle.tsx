import { Link } from 'react-router-dom';

type Props = {
  title: string;
  className?: string;
  entityLink?: string;
};

export function SectionTitle({ title, className, entityLink }: Props) {
  return (
    <div className={`w-full flex justify-center items-center  ${className}`}>
      <div className='hidden md:block w-1/6 h-[3px] bg-palm-700 '></div>
      {entityLink ? (
        <Link
          to={entityLink}
          className='md:max-w-[30%] text-center font-display text-lg md:text-[1.75rem] text-palm-700 mx-3 hover:text-palm-900'
        >
          {title}
        </Link>
      ) : (
        <h1 className='md:max-w-[30%] text-center font-display text-lg md:text-[1.75rem] text-palm-700 mx-3'>
          {title}
        </h1>
      )}

      <div className='hidden md:block w-1/6 h-[3px] bg-palm-700'></div>
    </div>
  );
}
