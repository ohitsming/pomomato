import React from "react";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Contact Us | Pomomato AI - Study Smarter with AI-Powered Focus Sessions",
    description: "Get in touch with Pomomato for inquiries, support, or feedback.",
};

const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Contact Us | Pomomato AI - Study Smarter with AI-Powered Focus Sessions",
    "description": "Get in touch with Pomomato for inquiries, support, or feedback.",
    "url": "https://pomomato.com/contact",
};

export default function ContactPage() {
    return (
        <>
            <Script
                id="contact-us-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <section className="bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 py-24 sm:py-32">
                <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
                            Contact Us
                        </h1>
                        <p className="text-lg text-gray-600 text-center mb-8">
                            We’d love to hear from you! Reach out to us using the form below or
                            through our contact information.
                        </p>

                        {/* Contact Form */}
                        <form className="bg-white p-8 rounded-lg shadow-md">
                            <div className="mb-6">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Send Message
                            </button>
                        </form>

                    </div>
                </div>
            </section>
        </>
    );
}
