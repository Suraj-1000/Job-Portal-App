import { useRef, useEffect } from 'react';
import { FaBold, FaItalic, FaListUl, FaListOl, FaHeading } from 'react-icons/fa';
import './RichTextEditor.css';

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
        <div className="rich-text-editor">
            <div className="editor-toolbar">
                <button
                    type="button"
                    onClick={() => execCommand('bold')}
                    className="toolbar-btn"
                    title="Bold"
                >
                    <FaBold />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('italic')}
                    className="toolbar-btn"
                    title="Italic"
                >
                    <FaItalic />
                </button>
                <div className="toolbar-divider"></div>
                <button
                    type="button"
                    onClick={() => execCommand('formatBlock', '<h3>')}
                    className="toolbar-btn"
                    title="Heading"
                >
                    <FaHeading />
                </button>
                <div className="toolbar-divider"></div>
                <button
                    type="button"
                    onClick={() => execCommand('insertUnorderedList')}
                    className="toolbar-btn"
                    title="Bullet List"
                >
                    <FaListUl />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('insertOrderedList')}
                    className="toolbar-btn"
                    title="Numbered List"
                >
                    <FaListOl />
                </button>
            </div>
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="editor-content"
                data-placeholder={placeholder}
            />
        </div>
    );
};

export default RichTextEditor;
