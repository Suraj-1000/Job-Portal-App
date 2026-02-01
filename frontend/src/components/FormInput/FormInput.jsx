import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const FormInput = forwardRef(({ label, error, containerClassName, ...props }, ref) => {
    return (
        <div className={cn("mb-6 relative w-full", containerClassName)}>
            {label && (
                <Label
                    htmlFor={props.id || props.name}
                    className="block mb-2 text-sm font-medium transition-colors duration-200 group-focus-within:text-[#6c5ce7]"
                >
                    {label}
                </Label>
            )}
            <Input
                ref={ref}
                className={cn(
                    "w-full px-4 py-3.5 h-auto text-base transition-all duration-200 focus-visible:ring-[#6c5ce7]/10 focus-visible:border-[#6c5ce7] focus-visible:ring-4 placeholder:text-gray-400 bg-slate-50 border-slate-200",
                    error && "border-red-500 bg-red-50 focus-visible:ring-red-500/10"
                )}
                {...props}
            />
            {error && (
                <div className="text-red-500 text-sm font-medium mt-2 flex items-center gap-2 animate-in slide-in-from-top-1 fade-in duration-200">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-red-500 text-white rounded-full text-[0.7rem] font-bold">!</span>
                    {error.message}
                </div>
            )}
        </div>
    );
});

FormInput.displayName = 'FormInput';

export default FormInput;
