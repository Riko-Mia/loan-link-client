import { ArrowRight, DollarSign, FileText } from 'lucide-react';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxios from '../../Hooks/useAxios';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
// import useAxios from './../../Hooks/useAxios';


const LoanApplication = () => {
  const [loan, setLoan] = useState([])
  const {register, handleSubmit} = useForm()
  const {user} = useAuth()
  const {id} = useParams()
  const axiosInstance = useAxios()
  const {photo, loanTitle, category, interestRate, maxLoanLimit, description, _id, emiPlans}= loan
  

  useEffect(() =>{
      axiosInstance.get(`/details/${id}`)
        .then( data => {
          setLoan(data.data)
        })
        .catch(error => {
          console.log('can not find user', error)
      })
  }, [axiosInstance])



  

  const submitLoanApplication = (data) =>{


        const updateData = {...data, "status": "Pending", "payment":"Unpaid", "loanId": _id, "email": user.email, "loanTitle":loanTitle, "interestRate":interestRate, "category":category }

        axiosInstance.post('/loanApply', updateData)
            .then(data => console.log('Submit success loan application', data.data))
            .catch(error => console.log('Update profile Error loan application', error))
        // console.log(updateData)
        console.log(data)
        
    }








    return (
        <div>
            {/* Form Area */}
            <div className="md:w-2/3 p-8 md:p-12 justify-center mx-auto">
              <form className="space-y-8" onSubmit={handleSubmit(submitLoanApplication)}>
                
                {/* Auto-filled Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">User Email</label>
                    <p className="text-sm font-semibold text-slate-700 truncate">{user?.email}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Loan Title</label>
                    <p className="text-sm font-semibold text-slate-700 truncate">{loanTitle}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Interest Rate</label>
                    <p className="text-sm font-semibold text-indigo-600">{interestRate}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <h3 className="font-bold text-slate-900">Personal Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">First Name</label>
                      <input required type="text" {...register('first_name')} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Last Name</label>
                      <input required type="text" {...register('last_name')} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Contact Number</label>
                      <input required type="tel" {...register('contract_number')} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="+88 1992100000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">National ID / Passport</label>
                      <input required type="text" {...register('NID_number')} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="ID Number" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2 pt-4">
                    <DollarSign className="w-4 h-4 text-indigo-500" />
                    <h3 className="font-bold text-slate-900">Financial Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Income Source</label>
                      <select  {...register('income_source')} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white">
                        <option>Full-time Employment</option>
                        <option>Self-Employed</option>
                        <option>Freelance / Contract</option>
                        <option>Investment / Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Monthly Income</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                        <input required type="number" {...register('monthly_income')} className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="5,000" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Loan Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                        <input required type="number" {...register('loan_amount')} className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="25,000" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Reason for Loan</label>
                      <input required type="text" {...register('loan_reason')} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Home Improvement" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Address</label>
                    <textarea required rows="2"  {...register('address')} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" placeholder="123 Financial Way, Suite 100..."></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Extra Notes (Optional)</label>
                    <textarea rows="2" {...register('extra_note')} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" placeholder="Anything else we should know?"></textarea>
                  </div>
                </div>

                <div className="pt-6">
                  <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
                    Submit Loan Application
                    <ArrowRight className="w-5 h-5" />
                  </button>

                </div>
              </form>
            </div>
        </div>
    );
};

export default LoanApplication;