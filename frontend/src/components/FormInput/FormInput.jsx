const FormInput = forwardRef(({ label, error, containerClassName, ...props }, ref) => {
    return (
        <div className={`mb-6 relative w-full ${containerClassName || ''}`}>
            {label && (
                <label
                    htmlFor={props.id || props.name}
                    className="block mb-2 text-gray-700 text-sm font-medium transition-colors duration-200 group-focus-within:text-[#6c5ce7]"
                >
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={`w-full px-4 py-3.5 border-2 border-slate-200 rounded-[10px] text-base text-gray-800 bg-slate-50 transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:border-[#6c5ce7] focus:bg-white focus:ring-4 focus:ring-[#6c5ce7]/10 disabled:bg-slate-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-gray-400 ${error ? 'border-red-500 bg-red-50 focus:ring-red-500/10' : ''
                    }`}
                {...props}
            />
            {error && (
                <div className="text-red-500 text-sm font-medium mt-2 flex items-center gap-2 animate-[slideDown_0.2s_ease]">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-red-500 text-white rounded-full text-[0.7rem] font-bold">!</span>
                    {error.message}
                </div>
            )}
        </div>
    );
});

FormInput.displayName = 'FormInput';

export default FormInput;
