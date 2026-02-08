import React from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';
import useRole from '../../Hooks/useRole';
import useAuth from '../../Hooks/useAuth';


const BorrowerMyLoans = () => {
  
  const axiosInstance = useAxios()
  const {role} = useRole()
  const {user} = useAuth()
  
  const {data: loans = [], refetch} = useQuery({
      queryKey : ['all-loans'],
      queryFn: async () => {
          const res = await axiosInstance.get(`my-loan/${user.email}`)
          return res.data
        }
    })
    console.log(loans)
    
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
        console.log(res.data)
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
        <th>Loan Info</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

        {loans.map((loan, index) => (


      <tr>
        {/* {console.log(loan.length, loan )} */}
        <th>
          {index + 1}
        </th>
            <th>
                {loan.loanId}
            </th>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">Title: {loan.loanTitle}</div>
              <div className="text-sm opacity-50">Category: {loan.category}</div>
            </div>
          </div>
        </td>
        <td>
              <div className="text-sm opacity-50">{loan.loan_amount}</div>
          
        </td>

        <td>
          
          <div className="text-sm opacity-50">{loan.status}</div>
        </td>


        <th>
          <button className="mr-3 btn btn-xs  btn-success"> View </button>
          <button className="mr-3 btn btn-xs  btn-warning" onClick={() => handleDeleteLoan(loan._id)}>Cancel</button>
          <button className="btn btn-xs  btn-secondary">Pay</button>
        </th>
      </tr>))}

    </tbody>

  </table>
</div>
        </div>
    );
};

export default BorrowerMyLoans;



