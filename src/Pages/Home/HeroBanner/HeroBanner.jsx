import { ArrowRight, PieChart, ShieldCheck, Zap } from 'lucide-react';
import React from 'react';
import Button from '../../../Hooks/Button';
import { Link } from 'react-router';

const HeroBanner = () => {
    return (
        <div className='min-h-screen w-full lg:flex lg:flex-row-reverse items-center justify-between mx-auto p-5 lg:p-20 max-w-[1440px]  mx-auto'>

 <div className='w-full lg:w-1/3 my-10 lg:my-0'>
            <div className="relative  lg:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">

                <img 
                    src= "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000" 
                    className="w-full h-full object-cover"
                    alt="Modern Office"
                />

    
            </div>
            </div>


            <div className='w-full lg:w-1/2'>
                <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3 h-3" />
            Instant Approval Decisions
          </div>
                <h1 className="py-7 text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
            Financial freedom, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              within your reach.
            </span>
          </h1>

          <p className="text-lg py-7 text-slate-600 max-w-lg leading-relaxed">
            Get competitive rates and flexible repayment plans tailored to your goals. 
            Whether it's a new home or growing your business, we're here to fuel your future.
          </p>

        <Link to="allLoans">
          <Button>
            Apply for Loan
              <ArrowRight className=" group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>

          <div className="my-6 grid grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-700">Secured & Encrypted</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                <PieChart className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-700">Fixed Low Rates</span>
            </div>
          </div>
            </div>


           
        </div>
    );
};

export default HeroBanner;