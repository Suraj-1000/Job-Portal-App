const PasswordInput = ({ name, value, onChange, placeholder, required, minLength, disabled, className, showToggle = true }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`relative w-full ${className || ''}`}>
      <input
        type={showToggle && showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        disabled={disabled}
        className="w-full py-3 pl-3 pr-10 border border-slate-200 rounded-md text-sm transition-colors duration-200 box-border font-inherit focus:outline-none focus:border-blue-500 disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
        style={!showToggle ? { paddingRight: '0.75rem' } : {}}
      />
      {showToggle && (
        <button
          type="button"
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer p-1.5 flex items-center justify-center text-gray-500 transition-all duration-200 z-10 rounded hover:text-blue-500 hover:bg-[#667eea0d] active:scale-95 focus:outline-none focus:bg-[#667eea1a] ${showPassword ? 'text-blue-500' : ''}`}
          onClick={togglePasswordVisibility}
          tabIndex="-1"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <svg className="w-5 h-5 block cursor-pointer transition-all duration-200 text-blue-500 stroke-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="w-5 h-5 block cursor-pointer transition-all duration-200 text-blue-500 stroke-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1751 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default PasswordInput;

