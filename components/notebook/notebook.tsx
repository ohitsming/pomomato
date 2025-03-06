import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FaTrash } from 'react-icons/fa';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});

type Note = {
    id: number;
    content: string;
    createdAt: string;
};

const NoteComponent = () => {
    const [notes, setNotes] = useState<Note[]>(() => {
        if (typeof window !== 'undefined') {
            const savedNotes = localStorage.getItem('notes');
            return savedNotes ? JSON.parse(savedNotes) : [];
        }
        return [];
    });

    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
    const [editorContent, setEditorContent] = useState<string>(''); // Track editor content separately

    // Save notes to localStorage whenever the notes array changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('notes', JSON.stringify(notes));
            console.log(notes); // Debugging
        }
    }, [notes]);

    // Find the selected note based on selectedNoteId
    const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;
    
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
        
        const newNote: Note = {
            id: Date.now(),
            content: '',
            createdAt: new Date().toISOString(),
        };

        // Save the content of the currently selected note before creating
        if (selectedNoteId !== null) {
            setNotes((prevNotes) => {
                prevNotes.map((note) =>
                    note.id === selectedNoteId ? { ...note, content: editorContent } : note
                )
                return [newNote, ...prevNotes]
                }
            );
        } else {
            console.log("HERE")
            setNotes((prevNotes) => { 
                return [newNote, ...prevNotes]
            }); // Add the new note to the top of the list
        }

        setSelectedNoteId(newNote.id); // Select the new note
        setEditorContent(''); // Reset the editor content for the new note
    };

    const handleDeleteNote = (id: number) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); // Remove the note
        if (selectedNoteId === id) {
            setSelectedNoteId(null); // Clear the selected note if it's deleted
            setEditorContent(''); // Clear the editor content
        }
    };

    const handleUpdateNote = (content: string) => {
        console.log(content)
        if(content == "<p><br></p>")
            return;
        setEditorContent(content); // Update the editor content
        if (selectedNoteId !== null) {
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === selectedNoteId ? { ...note, content } : note
                )
            );
        }
    };

    const handleSelectNote = (id: number) => {
        // Save the content of the currently selected note before switching
        if (selectedNoteId !== null) {
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === selectedNoteId ? { ...note, content: editorContent } : note
                )
            );
        }

        // Switch to the new note
        const newSelectedNote = notes.find((note) => note.id === id);
        setSelectedNoteId(id);
        setEditorContent(newSelectedNote ? newSelectedNote.content : ''); // Update editor content
    };

    const groupNotesByDate = () => {
        const groupedNotes: { [key: string]: Note[] } = {};

        notes.forEach((note) => {
            const date = new Date(note.createdAt).toLocaleDateString();
            if (!groupedNotes[date]) {
                groupedNotes[date] = [];
            }
            groupedNotes[date].push(note);
        });

        return groupedNotes;
    };

    const groupedNotes = groupNotesByDate();

    return (
        <div className="flex h-[calc(100vh-110px)] bg-green-100 p-3">
            <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-gray-800">Notes</h1>
                    <button
                        onClick={handleAddNote}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 w-full"
                    >
                        Add Note
                    </button>
                </div>
                <div className="p-4">
                    {Object.entries(groupedNotes).map(([date, notesForDate]) => (
                        <div key={date} className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">{date}</h2>
                            {notesForDate.map((note) => (
                                <div
                                    key={note.id}
                                    onClick={() => handleSelectNote(note.id)}
                                    className={`p-2 mb-2 rounded-lg cursor-pointer ${
                                        selectedNoteId === note.id
                                            ? 'bg-blue-100'
                                            : 'bg-gray-50 hover:bg-gray-100'
                                    }`}
                                    style={{ height: '40px' }}
                                >
                                    <div
                                        className="text-gray-700 line-clamp-2"
                                        dangerouslySetInnerHTML={{ __html: note.content }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-6">
                    {selectedNote ? (
                        <>
                            <div className="mb-4">
                                <ReactQuill
                                    value={editorContent}
                                    onChange={(value) => handleUpdateNote(value)}
                                    modules={modules}
                                    formats={formats}
                                    placeholder="Start typing your note here..."
                                    className="bg-white rounded-lg"
                                />
                            </div>
                            <button
                                onClick={() => handleDeleteNote(selectedNote.id)}
                                className="bg-red-200 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition duration-200"
                            >
                                <FaTrash></FaTrash>
                            </button>
                        </>
                    ) : (
                        <p className="text-gray-500">Select a note to edit or create a new one.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoteComponent;