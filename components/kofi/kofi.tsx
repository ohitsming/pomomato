
import React, { useEffect } from 'react';

const KofiWidget = ({
    username = 'workcoholic',
    type = 'floating-chat',
    donateButtonText = 'Support Us',
    donateButtonBackgroundColor = '#00b9fe',
    donateButtonTextColor = '#fff',
}) => {
    useEffect(() => {
        // Create script for Ko-fi CDN
        const script = document.createElement('script');
        script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
        script.async = true;
        script.onload = () => {
            // Once the script is loaded, configure and initialize the widget
            try {
                if (window?.kofiWidgetOverlay) {
                    window.kofiWidgetOverlay.draw(username, {
                        'type': type,
                        'floating-chat.donateButton.text': donateButtonText,
                        'floating-chat.donateButton.background-color': donateButtonBackgroundColor,
                        'floating-chat.donateButton.text-color': donateButtonTextColor
                    });
                }
            } catch (ex) {
                //ignore error
            }

        };

        // Append script to the document
        document.body.appendChild(script);

        // Cleanup function to remove the widget when component unmounts
        return () => {
            // Remove the script
            document.body.removeChild(script);

            // Remove any Ko-fi widget elements that were created
            const kofiIframe = document.getElementById('kofi-widget-iframe');
            if (kofiIframe) {
                kofiIframe.remove();
            }

            // Clear any global variables the widget might have set
            if (window?.kofiWidgetOverlay) {
                window.kofiWidgetOverlay = undefined;
            }
        };
    }, [username, type, donateButtonText, donateButtonBackgroundColor, donateButtonTextColor]);

    // This component doesn't render anything directly - it just injects the Ko-fi script
    return null;
};

export default KofiWidget;