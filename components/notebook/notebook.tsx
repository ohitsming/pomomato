// components/NoteComponent.tsx
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { FaTrash } from 'react-icons/fa'; // Import the trash can icon


const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false, // Disable server-side rendering for this component
})


type Note = {
    id: number;
    content: string;
};

const NoteComponent = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState<string>('');

    // Rich text editor modules and formats
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'bullet',
        'link',
        'image',
    ];

    const handleAddNote = () => {
        if (newNote.trim() !== '') {
            setNotes([...notes, { id: Date.now(), content: newNote }]);
            setNewNote('');
        }
    };

    const handleDeleteNote = (id: number) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    return (
        <div className="flex justify-center items-center h-[calc(100vh-110px)] bg-green-100 p-3">
            {/* Fixed-size container */}
            <div className="bg-white rounded-lg shadow-lg w-[800px] h-full flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-2xl font-bold text-gray-800">Notes</h1>
                    <button
                        onClick={handleAddNote}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Add Note
                    </button>
                </div>
                {/* Scrollable notes container */}
                <div className="flex-1 overflow-y-auto p-4">
                    {notes.map((note) => (
                        <div key={note.id} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm relative">
                            {/* Trash can button in the top-right corner */}
                            <button
                                onClick={() => handleDeleteNote(note.id)}
                                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                            >
                                <FaTrash className="w-5 h-5" />
                            </button>
                            {/* Note content */}
                            <div
                                className="text-gray-700"
                                dangerouslySetInnerHTML={{ __html: note.content }}
                            />
                        </div>
                    ))}
                </div>
                {/* Rich text editor */}
                <div className="p-4 border-t">
                    <ReactQuill
                        value={newNote}
                        onChange={setNewNote}
                        modules={modules}
                        formats={formats}
                        placeholder="Start typing your note here..."
                        className="bg-white rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteComponent;