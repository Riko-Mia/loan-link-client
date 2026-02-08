import React from 'react';
import useAxios from '../../Hooks/useAxios';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import { BadgePercent, Check, ChevronRight, Link, Star, Wallet } from 'lucide-react';

const LoanDetails = () => {

    const [user, setUser] = useState([])
      const axiosInstance = useAxios()
      const navigate = useNavigate()
  const {id} = useParams()
  const {photo, loanTitle, category, interestRate, maxLoanLimit, description, _id, emiPlans}= user

  
  useEffect(() =>{
    axiosInstance.get(`/details/${id}`)
      .then( data => {
        setUser(data.data)
      })
      .catch(error => {
        console.log('can not find user', error)
    })
}, [axiosInstance])


    const handleLoanButton = (id)=>{
        console.log(id)
        return navigate(`/loanApplication/${id}`)
    }




return (
        <div>
            
            <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-10 lg:pt-30">
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Product Image & Quick Stats */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img 
                src={photo} 
                alt={loanTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                <span className="text-indigo-600 font-bold text-sm flex items-center gap-1">
                  <BadgePercent size={16} /> Best Seller
                </span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Interest Rate</p>
                <p className="text-2xl font-black text-indigo-600">{interestRate}% <span className="text-sm font-medium text-slate-400">p.a</span></p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Max Limit</p>
                <p className="text-2xl font-black text-slate-900">${maxLoanLimit}</p>
              </div>
            </div>
          </div>

          {/* Right: Loan Details & Calculator */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase mb-3">
                {category}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900">{loanTitle}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <span className="text-slate-400 text-sm">4.9/5 Based on 2.4k borrowers</span>
              </div>
              <p className="text-slate-600 leading-relaxed mb-8">
                {description}
              </p>
            </div>

            {/* Loan Amount Slider */}
            <div className="mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Desired Loan Amount</h3>
                {/* <span className="text-xl font-black text-indigo-600">${loanAmount.toLocaleString()}</span> */}
                <span className="text-xl font-black text-indigo-600">${1000}</span>
              </div>
              {/* <input 
                type="range" 
                min="5000" 
                max={maxLoanLimit} 
                step="1000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              /> */}
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Min: $5k</span>
                <span>Max: ${maxLoanLimit/1000}k</span>
              </div>
            </div>

            {/* EMI Plans Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-tight text-slate-500 mb-4">Select Repayment Plan</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {emiPlans?.map((plan) => (
                  <button
                    key={plan.months}
                    // onClick={() => setSelectedPlan(plan)}
                    className={`p-3 border-2 rounded-xl flex flex-col items-center transition-all ${
                    //   selectedPlan.months === plan.months 
                    //   ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                    //   : 'border-slate-200 bg-white hover:border-slate-400'
                    'border-indigo-600 bg-indigo-50 text-indigo-600'}`}
                  >
                    <span className="text-lg font-bold">{plan.plan}</span>
                    <span className="text-[10px] uppercase opacity-70">Fee: {0.5* plan.index}</span>
                  </button>
                ))}
              </div>
            </div>



                {/* <Link to="loanApplication"></Link> */}
            <button 
                  onClick={() => handleLoanButton(_id)}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-indigo-500/20"
                >
                  {!loanTitle ? (
                    <><Check size={20} /> Application Sent</>
                  ) : (
                    <><Wallet size={20} /> Apply for Loan Now</>
                  )}
                </button>

            
          </div>
        </div>
      </main>


    </div>
            
        </div>
    );
};

export default LoanDetails;