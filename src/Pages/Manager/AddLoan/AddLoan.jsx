
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxios from '../../../Hooks/useAxios';
import axios from 'axios';


const AddLoan = ({loan}) => {
    
    const {user} = useAuth()
    

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  // Default values
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
  } = useForm({
    defaultValues
  });

  // Required Documents Field Array
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



  const removePreview = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const axiosInstance = useAxios()
  const onSubmit = async (data) => {

    setIsSubmitting(true);
   
    // const finalData = { ...data, images: previewImages, user:user, loanStates: 'pending' };
    
    const finalData = { ...data, loanStates: 'pending', createdEmail:user.email, createdName:user.displayName };
    let loanImage = finalData.photo[0]
          const formData = new FormData();
    formData.append("image", loanImage)
    const image_Api_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`
    
    // Simulate API Call
    // await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSuccess(true);
    // setTimeout(() => setSuccess(false), 1000);

    await axios.post(image_Api_URL, formData)
    .then(res => {
      // console.log('Image upload ', res.data.data.url)
      finalData.photo = res.data.data.url
      axiosInstance.post('/addLoans', finalData)
       .then(data => console.log('Submit success', data.data))
       console.log(finalData)

    })
    .catch(error => console.log('Update profile Error', error))

  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Main Information Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 border-b pb-3 text-blue-700">
              <Info className="w-5 h-5" /> ADD LOAN
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Loan Title</label>
                <input 
                  {...register("loanTitle", { required: "Title is required" })}
                  className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${errors.loanTitle ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:ring-2 focus:ring-blue-500'}`}
                  placeholder="e.g., Prime Home Loan"
                />
                {errors.loanTitle && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.loanTitle.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  {...register("description", { required: "Description is required" })}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${errors.description ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:ring-2 focus:ring-blue-500'}`}
                  placeholder="Details about the scheme..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select 
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
                    {...register("interestRate", { required: true })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="9.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">System Date</label>
                  <div className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {defaultValues.date}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Max Loan Limit</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                  <input 
                    type="number"
                    {...register("maxLoanLimit", { required: "Limit is required" })}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="100000"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" {...register("showOnHome")} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-slate-600">Show on Home</span>
                </label>
              </div>
            </div>
          </div>

          {/* Dynamic Field Arrays */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Documents Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-semibold flex items-center gap-2 text-slate-700">
                  <FileText className="w-4 h-4 text-blue-500" /> Required Documents
                </h3>
                <button 
                  type="button" 
                  onClick={() => appendDoc({ name: '' })}
                  className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {docFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input 
                      {...register(`requiredDocuments.${index}.name`, { required: true })}
                      placeholder="e.g., ID Card"
                      className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-blue-500 outline-none"
                    />
                    {docFields.length > 1 && (
                      <button type="button" onClick={() => removeDoc(index)} className="text-slate-300 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* EMI Plans Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-semibold flex items-center gap-2 text-slate-700">
                  <DollarSign className="w-4 h-4 text-emerald-500" /> EMI Plans
                </h3>
                <button 
                  type="button" 
                  onClick={() => appendEmi({ plan: '' })}
                  className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {emiFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input 
                      {...register(`emiPlans.${index}.plan`, { required: true })}
                      placeholder="e.g., 24 Months"
                      className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-emerald-500 outline-none"
                    />
                    {emiFields.length > 1 && (
                      <button type="button" onClick={() => removeEmi(index)} className="text-slate-300 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-blue-700 border-b pb-3">
              <Layers className="w-5 h-5" /> Media Assets
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {previewImages.map((src, idx) => (
                <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border bg-slate-50">
                  <img src={src} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removePreview(idx)} className="p-2 bg-red-500 text-white rounded-full">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                <Upload className="w-6 h-6 text-slate-400" />
                <span className="text-[10px] mt-2 font-medium text-slate-500 uppercase">Upload Images</span>
                <input  type="file" name="file" {...register("photo", {required:true})} id="file" placeholder accept="image/*"  className="hidden" />
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => { reset(); setPreviewImages([]); }}
              className="px-6 py-2 text-slate-500 font-medium hover:text-slate-700 transition-colors"
            >
              Reset
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`min-w-[160px] px-8 py-2.5 rounded-lg font-bold text-white shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 ${
                success ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : success ? (
                <><CheckCircle2 className="w-5 h-5" /> Done!</>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddLoan;