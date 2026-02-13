import React from 'react';
import { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { FileText, DollarSign, User, Briefcase, MapPin, FileQuestion } from 'lucide-react';





const AllLoanApplicationsAdmin = () => {
  const [loanApplication, setLoanApplication ] = useState([])
  const [loanData, setLoanData] = useState([])
  const axiosInstance = useAxios()
  const viewModal= useRef(null)

   const {data: loans = [], refetch} = useQuery({
    queryKey : ['all-loans'],
    queryFn: async () => {
      const res = await axiosInstance.get("all-loans-admin")
      return res.data
    }
  })



  useEffect(() =>{
    axiosInstance.get("all-loans-application-admin")
      .then( data => {
        
        setLoanApplication(data.data)
      })
      .catch(error => {
        console.log('can not find user', error)
    })
}, [axiosInstance])
console.log(loanData)

const handleReject = (id) =>{

  
const newStatus = {status: "Reject"} ;
     axiosInstance.patch(`loan-reject/${id}`, newStatus)
    .then((req) =>{
      refetch()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Loan Application has Reject!",
        showConfirmButton: false,
        timer: 1500
      });

    })
    .catch((error)=>{
      console.log('Add to home error', error)
    })
}


const handleViewMore = (loan)=>{
viewModal.current.showModal() 
setLoanData(loan)
}




    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>
          No
        </th>
        <th>Loan Id</th>
        <th>User</th>
        <th>Loan Category</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

        {loanApplication.map((loan, index) => (

      <tr>
        <th>
          {index + 1}
        </th>
        <td>
            {loan.loanId}
        </td>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">Name: {`${loan.first_name} ${loan.last_name}`}</div>
              <div className="text-sm opacity-50">email: {loan.email}</div>
            </div>
          </div>
        </td>

        <td>
              <div className="text-sm opacity-50">{loan.category}</div>
        </td>
        <td>
              <div className="text-sm opacity-50">{loan.loan_amount}</div>
        </td>

        <td>
            {loan.status}
        </td>

        <th>
          <button className="mr-3 btn btn-xs  btn-success" onClick={()=> handleViewMore(loan)} >View More</button>
          <button disabled={loan.status === 'Reject'} className="btn btn-xs btn-warning" onClick={()=>handleReject(loan._id)}>Rejected</button>
        </th>
      </tr>))}

    </tbody>

  </table>
</div>

{/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_5" ref={viewModal} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box w-8/12 max-w-5xl">
    
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Top Summary Card */}
        <div className="p-8 pb-0">
          <div className="bg-blue-50/80 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-blue-100/50">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">User Email</p>
              <p className="text-sm font-semibold text-gray-800">{loanData.email}</p>
            </div>
            
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Loan Title</p>
              <p className="text-sm font-semibold text-gray-800">{loanData.loanTitle}</p>
            </div>
            
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Interest Rate</p>
              <p className="text-sm font-bold text-blue-600">{loanData.interestRate}%</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-10">
          
          {/* Section 1: Personal Information */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="First Name" 
                value={loanData.first_name} 
              />
              <InputField 
                label="Last Name" 
                value={loanData.last_name} 
              />
              <InputField 
                label="Contact Number" 
                value={loanData.contract_number
} 
              />
              <InputField 
                label="National ID / Passport" 
                value={loanData.NID_number} 
                placeholder="ID Number"
              />
            </div>
          </section>

          {/* Section 2: Financial Details */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-800">Financial Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Income Source</label>
                <div className="relative">
                  <select 
                    disabled
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 appearance-none focus:outline-none cursor-not-allowed opacity-100"
                    defaultValue={loanData.income_source}
                  >
                    <option>Full-time Employment</option>
                    <option>Part-time</option>
                    <option>Business Owner</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <CurrencyField 
                label="Monthly Income" 
                value={loanData.monthly_income} 
              />
              
              <CurrencyField 
                label="Loan Amount" 
                value={loanData.loan_amount} 
              />

              <InputField 
                label="Reason for Loan" 
                value={loanData.loan_reason}
                placeholder="e.g. Home Improvement"
              />

              <div className="md:col-span-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">Address</label>
                  <input 
                    readOnly
                    type="text"
                    value={loanData.address}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all placeholder-gray-300"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">Extra Notes (Optional)</label>
                  <textarea 
                    readOnly
                    rows="3"
                    placeholder="Anything else we should know?"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all placeholder-gray-300 resize-none"
                    defaultValue={loanData.extra_note}
                  ></textarea>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons (Optional addition for a real view page) */}
          {/* <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
             <button className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
               Back
             </button>
             <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
               Edit Application
             </button>
          </div>
           */}
        </div>
      </div>
    </div>

    <div className="modal-action">
      <form method="dialog ">
                {/* if there is a button in form, it will close the modal */}
        <button className="btn ">Close</button>
      </form>
    </div>
  </div>
</dialog>
        </div>
    );
};




const InputField = ({ label, value, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-600">{label}</label>
    <input 
      readOnly
      type={type}
      value={value}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all placeholder-gray-300"
    />
  </div>
);

const CurrencyField = ({ label, value }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-600">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="text-gray-400 font-medium">$</span>
      </div>
      <input 
        readOnly
        type="text"
        value={value}
        className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
      />
    </div>
  </div>
);


export default AllLoanApplicationsAdmin;


