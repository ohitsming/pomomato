export default function CustomerPortalButton() {
    const portalUrl = 'https://billing.stripe.com/p/login/7sI2aA7O53WQ3Ac9AA'; 

    return (
        <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
            Manage Subscription
        </a>
    );
}