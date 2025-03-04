'use client'
import { useEffect, useState } from "react";
import HomeComponent from "@/components/home/home";
import { ProtectedRoute } from "@/components/protected/protected";
import KofiWidget from "@/components/kofi/kofi";
import { useAuth } from "react-oidc-context";
import NoteComponent from "@/components/notebook/notebook";

export default function Home() {
    const [isSplit, setIsSplit] = useState(false);
    const auth = useAuth();


    useEffect(() => {
        if(!auth.isAuthenticated) {
            setIsSplit(false);
        }
    }, [auth])

    const toggleNotebook = () => {

        setIsSplit(!isSplit);
    };

    return (
        <>
            <div className="h-screen overflow-hidden">
                <div
                    className={`flex ${isSplit ? "flex-col md:flex-row" : "flex-col"} h-full`}
                >
                    <div className={`${isSplit ? "md:w-2/5" : "w-full"} h-full`}>
                        <HomeComponent toggleSplit={toggleNotebook} />
                    </div>

                    {isSplit && (
                        <ProtectedRoute>
                            <div className={`${isSplit ? "md:w-3/5" : "w-full"} h-full p-5 overflow-y-auto my-16`}>
                                <NoteComponent></NoteComponent>
                            </div>
                        </ProtectedRoute>
                    )}
                </div>
            </div>
            <KofiWidget></KofiWidget>

        </>
    )
}