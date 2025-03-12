'use client'
import LoginModal from "@/components/login/login";
import { useUser } from "@/components/user-context/userContext";
import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { MAX_NOTES } from "@/lib/constant";
import Script from "next/script";
import { useRouter } from "next/navigation";


const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pricing | Pomomato AI - Study Smarter with AI-Powered Focus Sessions",
    "description": "Learn more about Pomomato pricing, advance features with pomodoro timer combines timed focus sessions, integrated note-taking, and AI-powered summaries to help you study effectively and achieve your goals.",
    "url": "https://pomomato.com/pricing",
};

export default function PricingPage() {
    const auth = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useUser();
    const router = useRouter();
    
    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    const getSubscription = (tier: string) => {
        return (() => {
            if(!auth.isAuthenticated) {
                setIsModalOpen(true);
                return;
            } else {
                if(tier === 'free' && user?.subscription_status != 'free') {
                    // downgrade plan
                } else if (tier === 'pro' && user?.subscription_status != 'pro') {
                    // upgrade plan
                    
                } 
            }
        })
    }

    const getSubscriptionEndDate = () => {
        const date = new Date(new Date().setMonth(new Date().getMonth() + 1));
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    const getPlanText = (tier: string) => {
        if(tier === 'free') {
            if(auth.isAuthenticated) {
                if(user?.subscription_status == "free") {
                    return "Current plan";
                } else {
                    return "Downgrade to Free";
                }
            } 

            return 'Get Started for Free';
        } 
        else {
            if(auth.isAuthenticated) {
                if(user?.subscription_status == "pro") {
                    return "Current plan";
                } else {
                    return "Coming Soon";
                }
            } 

            return 'Coming Soon';
        }
    }
      
    const plans = [
        {
            name: 'Free',
            price: '$0',
            features: [
                'Light, unobtrusive ads',
                'Pomodoro Timer to stay focused',
                `Create up to ${MAX_NOTES} notes`,
                'Basic text formatting (bold, italics, etc.)',
                `AI-generated note summaries up to ${MAX_NOTES} notes`,
                'Join the community for support',
            ],
            cta: getPlanText('free'),
            subtext: "",
            ctaFunction: getSubscription('free'),
        },
        {
            name: 'Pro',
            price: '$2.99',
            features: [
                'Completely ad-free',
                'Fully customizable Pomodoro Timer',
                'Create unlimited notes',
                'Advanced formatting (tables, code blocks, and more)',
                'AI-powered note summaries',
                'Early access to new features'
            ],
            cta: getPlanText('pro'),
            subtext: `This is a subscription service that renews automatically every month. 
                Cancel anytime before the renewal date in your account settings.`,
            ctaFunction: getSubscription('pro'),
        }
    ];

    return (
        <>
            <Script
                id="pricing-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <section className="bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 py-24 sm:py-32">
                <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
                            Pricing Plans
                        </h1>
                        <p className="text-lg text-gray-600 text-center mb-12">
                            Choose the plan that fits your needs. Start for free, upgrade as you grow.
                        </p>

                        {/* Pricing Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {plans.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`bg-white p-8 rounded-lg shadow-md ${plan.name === 'Pro' ? 'border-2 border-indigo-600 transform scale-105' : ''
                                        }`}
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h2>
                                    <p className="text-4xl font-bold text-gray-900 mb-6">
                                        {plan.price}
                                        {plan.name === 'Pro' && (
                                            <span className="text-lg text-gray-500">/month</span>
                                        )}
                                    </p>
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-gray-600">
                                                <svg
                                                    className="w-5 h-5 mr-2 text-indigo-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 13l4 4L19 7"
                                                    ></path>
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={plan.ctaFunction}
                                        className={`w-full block text-center py-3 px-6 rounded-md font-semibold ${plan.name === 'Pro'
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                            : 'bg-gray-900 text-white hover:bg-gray-700'
                                            }`}
                                    >
                                        {plan.cta}
                                    </button>

                                    { plan.name != "Free" && 
                                    <>
                                        <span className="text-[8px]">
                                            <h6 className="p-3">{plan.subtext}</h6>
                                        </span>
                                    </>}
                                    
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>
            <LoginModal isOpen={isModalOpen} onClose={onCloseModal} />
        </>
    );
}