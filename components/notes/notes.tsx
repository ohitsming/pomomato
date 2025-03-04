import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("react-draft-wysiwyg").then(mod => mod.Editor), {
  ssr: false,
});

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichTextEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newEditorState: any) => {
        setEditorState(newEditorState);
    };

    return (
        <div className='border border-green-500'>
            <Editor 
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="p-5 h-[75vh]"
            />
        </div>
    );
};

export default RichTextEditor;