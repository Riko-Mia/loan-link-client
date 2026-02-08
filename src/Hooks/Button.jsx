import React from 'react';

const Button = ({children}) => {
    return (
        <div>
            <button 
              
              className="group flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95"
            >
              {children}
            </button>
        </div>
    );
};

export default Button;