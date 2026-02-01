import { useRef, useEffect } from 'react';
import { FaBold, FaItalic, FaListUl, FaListOl, FaHeading } from 'react-icons/fa';


const RichTextEditor = ({ value, onChange, placeholder }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    const handleInput = () => {
        if (onChange && editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        handleInput();
    };

    return (
        <div className="border-2 border-slate-200 rounded-lg overflow-hidden bg-white">
            <div className="flex gap-1 p-2 bg-slate-50 border-b border-slate-200 flex-wrap">
                <button
                    type="button"
                    onClick={() => execCommand('bold')}
                    className="p-2 px-3 border border-slate-200 bg-white rounded cursor-pointer flex items-center justify-center text-slate-700 transition-all duration-200 text-sm hover:bg-[#667eea] hover:text-white hover:border-[#667eea] active:scale-95"
                    title="Bold"
                >
                    <FaBold />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('italic')}
                    className="p-2 px-3 border border-slate-200 bg-white rounded cursor-pointer flex items-center justify-center text-slate-700 transition-all duration-200 text-sm hover:bg-[#667eea] hover:text-white hover:border-[#667eea] active:scale-95"
                    title="Italic"
                >
                    <FaItalic />
                </button>
                <div className="w-px bg-slate-200 mx-1"></div>
                <button
                    type="button"
                    onClick={() => execCommand('formatBlock', '<h3>')}
                    className="p-2 px-3 border border-slate-200 bg-white rounded cursor-pointer flex items-center justify-center text-slate-700 transition-all duration-200 text-sm hover:bg-[#667eea] hover:text-white hover:border-[#667eea] active:scale-95"
                    title="Heading"
                >
                    <FaHeading />
                </button>
                <div className="w-px bg-slate-200 mx-1"></div>
                <button
                    type="button"
                    onClick={() => execCommand('insertUnorderedList')}
                    className="p-2 px-3 border border-slate-200 bg-white rounded cursor-pointer flex items-center justify-center text-slate-700 transition-all duration-200 text-sm hover:bg-[#667eea] hover:text-white hover:border-[#667eea] active:scale-95"
                    title="Bullet List"
                >
                    <FaListUl />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('insertOrderedList')}
                    className="p-2 px-3 border border-slate-200 bg-white rounded cursor-pointer flex items-center justify-center text-slate-700 transition-all duration-200 text-sm hover:bg-[#667eea] hover:text-white hover:border-[#667eea] active:scale-95"
                    title="Numbered List"
                >
                    <FaListOl />
                </button>
            </div>
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="min-h-[200px] max-h-[400px] overflow-y-auto p-4 text-[15px] leading-relaxed text-slate-700 outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 [&_h3]:text-[1.3rem] [&_h3]:font-semibold [&_h3]:my-2 [&_h3]:text-slate-700 [&_ul]:my-2 [&_ul]:pl-6 [&_ol]:my-2 [&_ol]:pl-6 [&_li]:my-1 [&_strong]:font-semibold [&_em]:italic [&_p]:my-2"
                data-placeholder={placeholder}
            />
        </div>
    );
};

export default RichTextEditor;
