
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FaTrash, FaChevronLeft, FaChevronRight, FaSave } from 'react-icons/fa';
import { useAuth } from 'react-oidc-context';
import { extractTextFromHtml } from '@/lib/utils';
import "@/components/css/editor.css"
import { useUser } from '../user-context/userContext';
import { useRouter } from 'next/navigation';
import { Note as API_NOTE } from '@/app/api/notes/route';
import FeatureLimitModal from '../feature-limit/feature-limit';
import { MAX_NOTES } from '@/lib/constant';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});

type Note = {
    id: number;
    content: string;
    createdAt: string;
};

const OneNoteComponent = () => {
    const [notes, setNotes] = useState<Note[]>(() => {
        if (typeof window !== 'undefined') {
            const savedNotes = localStorage.getItem('notes');
            return savedNotes ? JSON.parse(savedNotes) : [];
        }
        return [];
    });

    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
    const [editorContent, setEditorContent] = useState<string>('');
    const [isNotesCollapsed, setIsNotesCollapsed] = useState(false); // State for collapsing
    const [showLimitModal, setShowLimitModal] = useState(false);

    const auth = useAuth();
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }, [notes]);

    const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
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
        'indent',
        'link',
        'image',
    ];

    const handleCloseModal = () => {
        setShowLimitModal(false); // Close the modal
    };

    const handleAddNote = () => {

        if(!user && !notes) {
            return;
        }

        if(user?.subscription_status === "free" && notes.length >= MAX_NOTES) {
            setShowLimitModal(true);
        } else {

            const newNote: Note = {
                id: Date.now(),
                content: '',
                createdAt: new Date().toISOString(),
            };

            if (selectedNoteId !== null) {
                setNotes((prevNotes) => {
                    prevNotes.map((note) =>
                        note.id === selectedNoteId ? { ...note, content: editorContent } : note
                    );
                    return [newNote, ...prevNotes];
                });
            } else {
                setNotes((prevNotes) => [newNote, ...prevNotes]);
            }

            setSelectedNoteId(newNote.id);
            setEditorContent('');
        }
    };

    const handleDeleteNote = (id: number) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        if (selectedNoteId === id) {
            setSelectedNoteId(null);
            setEditorContent('');
        }
    };

    const handleSaveNote = async(note: Note) => {
        console.log('save note', note)
        // const token = auth.user?.access_token;
        // if (note?.content && note?.content.trim() !== '' && token) {
            
        //     try {
        //         const response = await fetch('/api/notes', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: `Bearer ${token}`,
        //             },
        //             body: JSON.stringify({ content: note.content }),
        //         });

        //         if (!response.ok) {
        //             throw new Error('Failed to save note');
        //         }

        //     } catch (error) {
        //         console.error(error);
        //     } 

        // }
    }

    const handleUpdateNote = (content: string) => {
        if (content === "<p><br></p>") return;

        // auto save function for premium user?

        setEditorContent(content);
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
        setEditorContent(newSelectedNote ? newSelectedNote.content : '');
    };

    const groupNotesByDate = () => {
        const groupedNotes: { [key: string]: Note[] } = {};

        notes.forEach((note) => {
            if (!note?.createdAt) {
                if (!groupedNotes[""]) {
                    groupedNotes[""] = [];
                }
                groupedNotes[""].push(note)
            }
            else {
                const date = new Date(note.createdAt).toLocaleDateString();
                if (!groupedNotes[date]) {
                    groupedNotes[date] = [];
                }
                groupedNotes[date].push(note);
            }
        });

        return groupedNotes;
    };

    const groupedNotes = groupNotesByDate();

    async function fetchNotes() {
        try {
            const token = auth.user?.access_token;

            if (token) {
                const response = await fetch('/api/notes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (data?.data && data.data.length > 0) {
                    const transformedNotes: Note[] = data.data.sort((a: API_NOTE, b: API_NOTE) => {
                        return a.created_at.localeCompare(b.created_at);
                    }).map((note: API_NOTE) => ({
                        id: note.note_id,
                        content: note.content,
                    }));

                    setNotes(transformedNotes);
                }

            }

        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    useEffect(() => {

        fetchNotes();

    }, [auth]);

    function handleUpgrade(): void {
        setShowLimitModal(false); // Close the modal
        router.push("/pricing")
    }

    return (
        <>
            <div className="flex h-[calc(100vh-110px)] bg-green-100 p-3 relative">
                {/* Editor Section */}
                <div className={`flex-1 flex flex-col pr-3`}>
                    <div className="flex-1 px-2 py-6">
                        {selectedNote ? (
                            <>
                                <div className="mb-4 h-full flex flex-col">
                                    <ReactQuill
                                        theme="snow"
                                        value={editorContent}
                                        onChange={(value) => handleUpdateNote(value)}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Start typing your note here..."
                                        className="bg-white rounded-lg flex-1 overflow-y-auto"
                                    />
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-500">Select a note to edit or create a new one.</p>
                        )}
                    </div>
                </div>

                {/* Floating Notes Section */}
                <div
                    className={`absolute top-3 right-3 w-72 bg-white border rounded-lg border-gray-200 overflow-y-auto shadow-lg transition-all duration-300 ${isNotesCollapsed ? 'translate-x-80' : 'translate-x-0'}`}
                >
                    {!isNotesCollapsed && (
                        <>
                            <div className="p-4 border-b flex justify-between items-center">
                                <h1 className="text-xl font-bold text-gray-800">Notes</h1>
                                <button
                                    onClick={() => setIsNotesCollapsed(!isNotesCollapsed)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition duration-200"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                            <div className="p-4">
                                <button
                                    onClick={handleAddNote}
                                    className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 w-full"
                                >
                                    Add Note
                                </button>
                                {Object.entries(groupedNotes).map(([date, notesForDate]) => (
                                    <div key={date} className="mb-6">
                                        <h2 className="text-lg font-semibold text-gray-700 mb-2">{date}</h2>
                                        {notesForDate.map((note) => (
                                            <div
                                                key={note.id}
                                                onClick={() => handleSelectNote(note.id)}
                                                className={`group p-2 mb-2 rounded-lg cursor-pointer ${selectedNoteId === note.id
                                                    ? 'bg-blue-100'
                                                    : 'bg-gray-50 hover:bg-gray-100'
                                                    }`}
                                                style={{ height: '40px', overflow: 'hidden' }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div
                                                        className="text-gray-700 line-clamp-1 overflow-hidden text-ellipsis flex-1"
                                                    >
                                                        {extractTextFromHtml(note.content)}
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleSaveNote(note);
                                                        }}
                                                        className="p-1 text-blue-600 opacity-0 group-hover:opacity-100 transition duration-200"
                                                    >
                                                        <FaSave />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteNote(note.id);
                                                        }}
                                                        className="p-1 text-red-300 opacity-0 group-hover:opacity-100 transition duration-200"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Toggle Button (Always Visible) */}
                <button
                    onClick={() => setIsNotesCollapsed(!isNotesCollapsed)}
                    className={`absolute top-3 right-3 p-2 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 transition duration-200 ${isNotesCollapsed ? '' : 'hidden'}`}
                >
                    {isNotesCollapsed ? <FaChevronLeft /> : <FaChevronRight />}
                </button>
            </div>
            <FeatureLimitModal
                isOpen={showLimitModal}
                onClose={handleCloseModal}
                onUpgrade={handleUpgrade}
            ></FeatureLimitModal>
        </>

    );
};

export default OneNoteComponent;