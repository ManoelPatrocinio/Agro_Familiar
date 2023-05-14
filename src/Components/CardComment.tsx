import { Comment } from '../Types/comment.type';
import UserProfileExemple from '../assets/images/exemple_user_profile.png';

interface IProp {
  comment: Comment;
}
export function CardComment({ comment }: IProp) {
  function formatDate(data: Date) {
    const dataNoformated = data
      .toString()
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('/');
    return dataNoformated;
  }
  return (
    <div className='border-b border-gray-400 pb-4 mb-6'>
      <div className='flex flex-row justify-start items-start relative mb-6 '>
        <div className='w-20 min-w-[5rem] h-20 rounded-[50%] mr-4'>
          <img
            src={
              !comment.c_user_img_profile
                ? UserProfileExemple
                : comment.c_user_img_profile
            }
            className='relative bg-white  h-full w-full rounded-[50%]'
            alt='Foto perfil'
            loading='lazy'
          />
        </div>
        <div className='flex flex-col pt-3'>
          <p className='w-full text-left text-sm  text-gray-800 font-medium font-display mb-2'>
            {comment.c_customer_name}
          </p>
          <div className=' flex flex-row justify-start items-end mb-4'>
            <div className='flex mr-4 text-xs font-semibold items-end justify-end'>
              {comment.c_raiting}

              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-yellow-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
            </div>
            <span className='text-xs text-gray-400'>
              {formatDate(comment?.createdAt!)}
            </span>
          </div>
        </div>
      </div>
      <p className='w-full text-sm text-justify md:text-left text-gray-600 '>
        {comment.c_comment}
      </p>
    </div>
  );
}
