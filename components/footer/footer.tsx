import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-green-900 text-white py-8 mt-auto">
            <div className="container mx-auto px-6 lg:px-36">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="hover:text-green-300 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-green-300 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-green-300 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-green-300 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://twitter.com/pomomato"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-green-300 transition-colors"
                            >
                                <FaTwitter className="w-6 h-6" />
                            </a>
                            <a
                                href="https://linkedin.com/company/pomomato"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-green-300 transition-colors"
                            >
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                            <a
                                href="https://github.com/pomomato"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-green-300 transition-colors"
                            >
                                <FaGithub className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                        <p className="text-sm">
                            Email: <a href="mailto:info@pomomato.com" className="hover:text-green-300 transition-colors">
                                info@pomomato.com
                            </a>
                        </p>
                    </div>
                </div>

                {/* Copyright Notice */}
                <div className="border-t border-green-800 mt-8 pt-8 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Workcoholic LLC. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}