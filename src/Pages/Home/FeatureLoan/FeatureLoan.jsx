import React from 'react';
import Card from '../../../Hooks/Card';
import { useState } from 'react';
import { useEffect } from 'react';
import useAxios from './../../../Hooks/useAxios';



const FeatureLoan = () => {
  const [availableLoans, setAvailableLoans ] = useState([])
  const axiosInstance = useAxios()
  
  useEffect(() =>{
    axiosInstance.get("max-loans-six")
      .then( data => {
        
        setAvailableLoans(data.data)
      })
      .catch(error => {
        console.log('can not find user', error)
      })
    }, [axiosInstance])
    




    return (
        <div className='max-w-[1440px]  mx-auto'>
            <div  className="my-20 text-center" >
                <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Featured Loan Products</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">Transparent rates, flexible terms, and fast approvals tailored to your financial goals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mx-auto">

                {availableLoans.map((loan) => (
            <Card key={loan.id} loanItem={loan} />
          ))}
            </div>
            



        </div>
    );
};

export default FeatureLoan;

