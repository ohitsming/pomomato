import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Pomomato AI - Study Smarter with AI-Powered Focus Sessions",
    description: "Get in touch with Pomomato for inquiries, support, or feedback.",
};

const ContactPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="container mx-auto p-8 max-w-3xl text-left text-green-900 space-y-8">
                <h1 className="text-4xl font-bold mb-6 border-b pb-2">Contact Us</h1>
                <p className="text-lg">We'd love to hear from you! Reach out using the details below.</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Email</h2>
                    <p>You can email us at: <strong>info@pomomato.com</strong></p>
                </section>

            </div>
        </div>
    );
};

export default ContactPage;
