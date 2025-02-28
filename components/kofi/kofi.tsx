import Script from 'next/script';

const KofiDonationPanel = () => {
    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'center' }} data-testid="kofi-donation-panel-container">
            <iframe
                id="kofiframe"
                src="https://ko-fi.com/workcoholic/?hidefeed=true&widget=true&embed=true&preview=true"
                style={{ border: 'none', width: '100%', padding: '4px', borderRadius: '8px', transform: 'scale(0.9)' }}
                height="712"
                title="your-ko-fi-username"
            ></iframe>


            <Script id="kofi-donation-panel">
                {`
                    const iframe = document.getElementById('kofiframe');
                    iframe.src = 'https://ko-fi.com/workcoholic/?hidefeed=true&widget=true&embed=true&preview=true';
                `}
            </Script>
        </div>
    );
};

export default KofiDonationPanel;