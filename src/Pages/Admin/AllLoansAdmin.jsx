import React, { useRef } from 'react';
import { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import { 
  Plus, 
  Trash2, 
  Upload, 
  Info, 
  CheckCircle2, 
  ArrowLeft,
  LayoutDashboard,
  FileText,
  DollarSign,
  Calendar,
  Layers,
  AlertCircle
} from 'lucide-react';

const AllLoansAdmin = () => {
  
  const viewModal= useRef(null)
  const axiosInstance = useAxios()
    const [loanData, setLoanData] = useState([])
  // const axiosSecure = useAxiosSecure()

  const {data: loans = [], refetch} = useQuery({
    queryKey : ['all-loans'],
    queryFn: async () => {
      const res = await axiosInstance.get("all-loans-admin")
      return res.data
    }
  })
  
  
  const handleDeleteLoan = (id)=>{

    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    

    
  axiosInstance.delete(`loan-delete/${id}`)
      .then(res => {
        // console.log(res.data)
        if(res.data.deletedCount){
          refetch()
          Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
        }
       
      })
      .catch(error =>{
        console.log(error)
      })
  }
});
  }


  
  
  const handleShowOnHome =  (id, currentStatus) => {
    
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Switch it!"
}).then((result) => {
  if (result.isConfirmed) {
   const newStatus = {showOnHome: !currentStatus} ;
     axiosInstance.patch(`toggle-home/${id}`, newStatus)
    .then((req) =>{
      refetch()
      // console.log(newStatus, req)
       Swal.fire({
        title: `Show ${currentStatus? "Off":"On"} Home Page!`,
        text: `Your file has been Show ${currentStatus? "Off":"On"} Home Page.`,
        icon: "success"
      });

    })
    .catch((error)=>{
      console.log('Add to home error', error)
    })

  }
});
}


const defaultValues = {
    loanTitle: '',
    description: '',
    category: '',
    interestRate: '',
    maxLoanLimit: '',
    requiredDocuments: [{ name: '' }],
    emiPlans: [{ plan: '' }],
    showOnHome: false,
    date: new Date().toLocaleDateString('en-GB'),
    // createdAt: new Date()
  };

  const { 
    register, 
    control, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm({});



const handleUpdateLoan = (loan)=>{
viewModal.current.showModal() 
setLoanData(loan)
}


 const { 
    fields: docFields, 
    append: appendDoc, 
    remove: removeDoc 
  } = useFieldArray({
    control,
    name: "requiredDocuments"
  });

  // EMI Plans Field Array
  const { 
    fields: emiFields, 
    append: appendEmi, 
    remove: removeEmi 
  } = useFieldArray({
    control,
    name: "emiPlans"
  });

  const categories = [
    "Personal Loan", "Home Loan", "Education Loan", 
    "Business Loan", "Vehicle Loan", "Gold Loan"
  ];




const reOnSubmit = ()=>{

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
        <th>Photo</th>
        <th>Interest</th>
        <th>Created By</th>
        <th>Show on Home</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

        {loans.map((loan, index) => (

      <tr>
        <th>
          {index + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={loan.photo}
                  alt={loan.name} />
              </div>
            </div>
            <div>
              <div className="font-bold">Title: {loan.loanTitle}</div>
              <div className="text-sm opacity-50">Category: {loan.category}</div>
            </div>
          </div>
        </td>
        <td>
              <div className="text-sm opacity-50">{loan.interestRate}%</div>
          {/* Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
        </td>

        <td>
          {loan.createdName? loan.createdName : `Can't find Name`}
          <br />
          {loan.createdEmail? <span className="badge badge-ghost badge-sm">{loan.createdEmail}</span>: `Can't find Email`}
          
        </td>

        <td>
          <input type="checkbox" checked={loan.showOnHome} onClick={() => handleShowOnHome(loan._id, loan.showOnHome)} className="toggle toggle-sm" />
          {/* <input type="checkbox" defaultChecked {...loan.showOnHome} className="toggle toggle-sm" /> */}
        </td>


        <th>
          <button className="mr-3 btn btn-xs  btn-success" onClick={() => handleUpdateLoan(loan)}>Update Loan</button>
          <button className="btn btn-xs  btn-warning" onClick={() => handleDeleteLoan(loan._id)}>Delete</button>
        </th>
      </tr>))}

    </tbody>

  </table>


<dialog id="my_modal_5" ref={viewModal} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box w-8/12 max-w-5xl">

 <form onSubmit={handleSubmit(reOnSubmit)} className="space-y-6">
          
          {/* Main Information Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 border-b pb-3 text-blue-700">
              <Info className="w-5 h-5" /> Update Loan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Loan Title</label>
                <input 
                value={loanData.loanTitle}
                  {...register("loanTitle", { required: "Title is required" })}

                  className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${errors.loanTitle ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:ring-2 focus:ring-blue-500'}`}
                  placeholder="e.g., Prime Home Loan"
                />
                {errors.loanTitle && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.loanTitle.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                value={loanData.description}
                  {...register("description", { required: "Description is required" })}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${errors.description ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:ring-2 focus:ring-blue-500'}`}
                  placeholder="Details about the scheme..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                value={loanData.category} 
                  {...register("category", { required: "Please select a category" })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rate (%)</label>
                  <input 
                    type="number" step="0.01"
                    value={loanData.interestRate}
                    {...register("interestRate", { required: true })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="9.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">System Date</label>
                  <div className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" value={loanData.date} /> {new Date().toLocaleDateString('en-GB')}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Max Loan Limit</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                  <input 
                    type="number"
                    value={loanData.maxLoanLimit}
                    {...register("maxLoanLimit", { required: "Limit is required" })}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="100000"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={loanData.showOnHome} value={loanData.showOnHome} {...register("showOnHome")} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-slate-600">Show on Home</span>
                </label>
              </div>
            </div>
          </div>



          {/* Image Upload Area */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-blue-700 border-b pb-3">
              <Layers className="w-5 h-5" /> Media Assets
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">

              <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                <Upload className="w-6 h-6 text-slate-400" />
                <span className="text-[10px] mt-2 font-medium text-slate-500 uppercase">Upload Images</span>
                <input  type="file" name="file" {...register("photo", {required:true})} id="file" placeholder accept="image/*"  className="hidden" />
              </label>
            </div>
          </div>



        </form>



    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>



</div>
        </div>
    );
};

export default AllLoansAdmin;


