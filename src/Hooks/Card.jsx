import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const Card = ({loanItem}) => {
  const navigate = useNavigate()
  const {user} = useAuth()
    const{photo, loanTitle, category, interestRate, maxLoanLimit, description, _id}=loanItem

    const handelViewDetails = (loanItem) =>{
      if(user === null) {
        console.log(`Can't find user. Thank You!`)
        // return <Navigate state={location.pathname} to="/login"></Navigate>
        return navigate(`/login`)
      }
      if(loanItem){
        console.log(loanItem._id, '==================')
        // return <Navigate state={location.pathname} to={`/details/${loanItem._id}`} ></Navigate>
        return navigate(`/loanDetails/${loanItem._id}`)
      }
    }





const randomShorten = (text, min = 150, max = 300) => {
  // Generate a random limit
  const randomLimit = Math.floor(Math.random() * (max - min + 1)) + min;
  
  if (text.length <= randomLimit) return text;
  
  return text.slice(0, randomLimit).trim() + "...";
};

    return (
        <div>
            <div className="card bg-base-100 w-90 shadow-sm mx-auto">
  <figure>
    <img
      src={photo}
      alt={loanTitle} />
      <div className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm border `}>
           {category}
     </div>
  </figure>
  <div className="card-body">
    <h3 className="text-xl font-bold text-slate-900 mb-1">{loanTitle}</h3>
    <p className="text-sm text-slate-500 mb-6 leading-relaxed justify-between">
        {randomShorten(description)}
    </p>
    <div className="grid grid-cols-2 gap-4 mb-8 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">interestRate</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-slate-900">{interestRate}</span>
              <span className="text-sm font-semibold text-slate-600 ml-0.5">%</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Max Limit</span>
            <div className="flex items-baseline text-slate-900">
              <span className="text-sm font-bold mr-1">$</span>
              <span className="text-2xl font-bold">{maxLoanLimit}</span>
            </div>
          </div>
        </div>
    <div className="card-actions justify-center">
      <button className=" w-full btn btn-primary" onClick={()=> {handelViewDetails(loanItem)}}>View Details</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default Card;