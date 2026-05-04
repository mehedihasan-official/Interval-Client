import React, { useContext } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

const Content = () => {
     const {user} = useContext(AuthContext)
     return (
          <div className='pt-10'>
               
               <Link to="login">
               <div className='border-t py-2 px-3 hover:bg-slate-300 flex justify-between'> <p>Login</p>
               <IoIosArrowForward className='font-bold text-xl text-orange-500' />
               </div>
               </Link>

               <Link to="resort-directory">
               <div className='border-t py-2 px-3 hover:bg-slate-300 flex justify-between'> <p>Resort Directory</p>
               <IoIosArrowForward className='font-bold text-xl text-orange-500' />
               </div>
               </Link>

               <Link>
               <div className='border-t py-2 px-3 hover:bg-slate-300 flex justify-between'> <p>Interval HD</p>
               <IoIosArrowForward className='font-bold text-xl text-orange-500' />
               </div>
               </Link>

               <Link to="create-profile">
               <div className='border-t py-2 px-3 hover:bg-slate-300 flex justify-between'> <p>Create a Profile</p>
               <IoIosArrowForward className='font-bold text-xl text-orange-500' />
               </div>
               </Link>

               <Link>
               <div className='border-y py-2 px-3 hover:bg-slate-300 flex justify-between'> <p>Join Today</p>
               <IoIosArrowForward className='font-bold text-xl text-orange-500' />
               </div>
               </Link>

          </div>
     );
};

export default Content;