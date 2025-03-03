'use client'
import { useState } from "react";
import HomeComponent from "@/components/home/home";
import RichTextEditor from "@/components/notes/notes";

export default function Home() {
    const [isSplit, setIsSplit] = useState(false);

    const toggleNotebook = () => {
        setIsSplit(!isSplit);
    };

    return (
        <>
            <div className="h-screen overflow-hidden">
                <div
                    className={`flex ${isSplit ? "flex-col md:flex-row" : "flex-col"
                        } h-full`}
                >
                    <HomeComponent toggleSplit={toggleNotebook}></HomeComponent>
                    
                    {/* Split Content */}
                    {isSplit && (
                        <div className="flex-1 p-5 my-16 overflow-y-auto">
                            <RichTextEditor></RichTextEditor>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}