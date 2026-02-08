import React from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import useRole from '../../../Hooks/useRole';
import useAuth from '../../../Hooks/useAuth';


const PendingApplications = () => {
  
  const axiosInstance = useAxios()
  // const axiosSecure = useAxiosSecure()
  const {role} = useRole()
  const {user} = useAuth()

  const {data: loans = [], refetch} = useQuery({
    queryKey : ['all-loans'],
    queryFn: async () => {
      const res = await axiosInstance.get(`pending-loans`)
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
        <th>User Info</th>
        <th>Amount</th>
        <th>Date</th>
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
              <div className="font-bold">{loan.first_name} {loan.last_name}</div>
              <div className="text-sm opacity-50">{loan.email}</div>
            </div>
          </div>
        </td>
        

        <td>
          <div className="text-sm opacity-50">{loan.loan_amount}</div>
        </td>
        <td>
          <div className="text-sm opacity-50">{loan.createdAt}</div>
        </td>


        <th>
          <button className="mr-3 btn btn-xs  btn-success">Approve</button>
          <button className="mr-3 btn btn-xs  btn-warning" onClick={() => handleDeleteLoan(loan._id)}>Reject</button>
          <button className="btn btn-xs  btn-secondary" onClick={() => handleDeleteLoan(loan._id)}>View</button>
        </th>
      </tr>))}

    </tbody>

  </table>
</div>
        </div>
    );
};

export default PendingApplications;


