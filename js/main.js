// DOM elements
const landingPage = document.getElementById('landingPage');
const landingSenderName = document.getElementById('landingSenderName');
const landingPunjabiMessage = document.getElementById('landingPunjabiMessage');
const openMainPageBtn = document.getElementById('openMainPageBtn');
const mainContainer = document.getElementById('mainContainer');
const mainSenderMessage = document.getElementById('mainSenderMessage');
const sendLohriButton = document.getElementById('sendLohriButton');
const inputSection = document.getElementById('inputSection');
const userNameInput = document.getElementById('userName');
const generateLinkButton = document.getElementById('generateLink');
const generatedLink = document.getElementById('generatedLink');
const whatsappShareButton = document.getElementById('whatsappShare');
const copyLinkButton = document.getElementById('copyLink');
const floatingEmojis = document.getElementById('floatingEmojis');
const confettiContainer = document.getElementById('confettiContainer');
const lohriAudio = document.getElementById('lohriAudio');

// Get sender name from URL
const urlParams = new URLSearchParams(window.location.search);
const senderName = urlParams.get('from');

// Enhanced function to support Punjabi, Hindi, and English names in URLs
function cleanNameForURL(name) {
    if (!name) return '';
    
    // First decode any existing URL encoding
    let decodedName = decodeURIComponent(name);
    
    // Handle Punjabi and Hindi characters - convert to transliteration
    // For Punjabi/Hindi names, we'll create a simplified version
    let cleanedName = decodedName
        .toLowerCase()
        // Replace common Punjabi/Hindi characters with English approximations
        .replace(/[ਥ]/g, 'th')
        .replace(/[ਗ]/g, 'g')
        .replace(/[ਦ]/g, 'd')
        .replace(/[ਬ]/g, 'b')
        .replace(/[ਪ]/g, 'p')
        .replace(/[ਜ]/g, 'j')
        .replace(/[ਕ]/g, 'k')
        .replace(/[ਮ]/g, 'm')
        .replace(/[ਨ]/g, 'n')
        .replace(/[ਤ]/g, 't')
        .replace(/[ਵ]/g, 'v')
        .replace(/[ਸ]/g, 's')
        .replace(/[ਹ]/g, 'h')
        .replace(/[ਲ]/g, 'l')
        .replace(/[ਅ-ੴ]/g, '') // Remove other Punjabi characters
        .replace(/[अ-ह]/g, '')  // Remove Devanagari characters
        .replace(/[^\w\s-]/gi, '') // Remove special characters except hyphens
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Remove multiple hyphens
        .replace(/^-+/, '')       // Remove hyphens from start
        .replace(/-+$/, '');      // Remove hyphens from end
    
    // If after cleaning we have nothing, use a default
    if (!cleanedName) {
        cleanedName = 'lohri-mubarak';
    }
    
    return cleanedName;
}

// Alternative approach: Use Base64 encoding for full language support
function createLanguageSafeURL(name) {
    if (!name) return '';
    
    // Method 1: Try to keep original if it's only English
    const englishOnlyRegex = /^[A-Za-z0-9\s\-]+$/;
    if (englishOnlyRegex.test(name)) {
        return name.toLowerCase().replace(/\s+/g, '-');
    }
    
    // Method 2: For Punjabi/Hindi names, use a hash or encoded version
    // Create a short hash of the name
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(36).substring(0, 8);
    }
    
    // Method 3: Use URL-safe Base64 encoding
    function toUrlSafeBase64(str) {
        // First encode to base64
        const base64 = btoa(encodeURIComponent(str));
        // Make it URL safe
        return base64
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }
    
    // Use Base64 encoding for full language support
    return 'name-' + toUrlSafeBase64(name);
}

// Decode the name from URL
function decodeNameFromURL(encodedName) {
    if (!encodedName) return null;
    
    // Check if it's our Base64 encoded format
    if (encodedName.startsWith('name-')) {
        const base64Str = encodedName.substring(5);
        try {
            // Add padding if needed
            let padded = base64Str;
            while (padded.length % 4 !== 0) {
                padded += '=';
            }
            // Convert back
            padded = padded.replace(/-/g, '+').replace(/_/g, '/');
            return decodeURIComponent(atob(padded));
        } catch (e) {
            console.error('Error decoding name:', e);
            return encodedName;
        }
    }
    
    // If it's just a regular name, decode URI component
    try {
        return decodeURIComponent(encodedName);
    } catch (e) {
        return encodedName;
    }
}

// Get sender name from URL with language support
function getSenderNameFromURL() {
    if (!senderName) return null;
    
    // Try to decode if it's encoded
    return decodeNameFromURL(senderName);
}

// Set landing page message
function setLandingMessage() {
    const displayName = getSenderNameFromURL();
    
    if (displayName) {
        landingSenderName.textContent = displayName;
        landingPunjabiMessage.textContent = `ਨੇ ਤੁਹਾਨੂੰ ਲੋਹੜੀ ਦੀ ਵਧਾਈ ਭੇਜੀ ਹੈ`;
    } else {
        // If no name in URL, show generic message
        landingSenderName.textContent = "ਤੁਹਾਡੇ ਦੋਸਤ";
        landingPunjabiMessage.textContent = `ਨੇ ਤੁਹਾਨੂੰ ਲੋਹੜੀ ਦੀ ਵਧਾਈ ਭੇਜੀ ਹੈ`;
    }
}

// Set main page message
function setMainMessage() {
    const displayName = getSenderNameFromURL();
    
    if (displayName) {
        mainSenderMessage.innerHTML = `🎉 <strong>${displayName}</strong> ਨੇ ਤੁਹਾਨੂੰ ਲੋਹੜੀ ਦੀ ਵਧਾਈ ਭੇਜੀ ਹੈ!`;
    } else {
        mainSenderMessage.innerHTML = '🎉 ਤੁਹਾਨੂੰ ਲੋਹੜੀ ਦੀਆਂ ਲੱਖ ਲੱਖ ਵਧਾਈਆਂ!';
    }
}

// Show main page
function showMainPage() {
    // 🔊 PLAY LOHRI SONG
    if (lohriAudio) {
        lohriAudio.currentTime = 0; // start from beginning
        lohriAudio.volume = 0.7;    // volume (0.0 – 1.0)
        lohriAudio.play().catch(err => {
            console.log("Audio play blocked:", err);
        });
    }

    // Hide landing page with animation
    landingPage.classList.add('hidden');

    // Show main container with animation
    setTimeout(() => {
        mainContainer.classList.add('visible');
        createFloatingEmojis();

        // Trigger confetti animation
        setTimeout(() => {
            createConfetti();
        }, 500);
    }, 500);

    playClickSound();
}

// Initialize floating emojis
function createFloatingEmojis() {
    const emojis = ['🔥', '🪔', '🧡', '🥁', '🎉', '✨', '🌟', '💫'];
    const numEmojis = 15;
    
    for (let i = 0; i < numEmojis; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.animationDelay = `${Math.random() * 5}s`;
        emoji.style.fontSize = `${Math.random() * 20 + 20}px`;
        floatingEmojis.appendChild(emoji);
    }
}

// Create confetti animation
function createConfetti() {
    const confettiCount = 150;
    confettiContainer.innerHTML = '';
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = confetti.style.width;
        
        // Random animation properties
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 2;
        
        confetti.style.animation = `confetti-fall ${animationDuration}s ease-in ${animationDelay}s forwards`;
        confettiContainer.appendChild(confetti);
        
        // Create CSS for confetti fall
        if (!document.getElementById('confetti-animation')) {
            const style = document.createElement('style');
            style.id = 'confetti-animation';
            style.textContent = `
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(-100px) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, (animationDuration + animationDelay) * 1000);
    }
}

// Play click sound (optional)
function playClickSound() {
    // Create a simple click sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // If Web Audio API is not supported, do nothing
        console.log("Audio not supported");
    }
}

// Send Lohri button click handler
sendLohriButton.addEventListener('click', function() {
    inputSection.style.display = 'block';
    inputSection.scrollIntoView({ behavior: 'smooth' });
});

// Generate link button click handler
generateLinkButton.addEventListener('click', function() {
    const userName = userNameInput.value.trim();
    
    if (!userName) {
        alert('ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਨਾਮ ਦਰਜ ਕਰੋ');
        userNameInput.focus();
        return;
    }
    
    // Create the shareable URL with language-safe encoding
    const currentUrl = window.location.origin + window.location.pathname;
    
    // Option 1: Use Base64 encoding (supports all languages)
    const encodedName = createLanguageSafeURL(userName);
    const shareableUrl = `${currentUrl}?from=${encodedName}`;
    
    // Option 2: Simple encoding (works for most cases)
    // const shareableUrl = `${currentUrl}?from=${encodeURIComponent(userName)}`;
    
    // Display the generated link
    generatedLink.textContent = shareableUrl;
    generatedLink.style.display = 'block';
    
    // Scroll to the generated link
    generatedLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// WhatsApp share button click handler
whatsappShareButton.addEventListener('click', function() {
    const userName = userNameInput.value.trim();
    
    if (!userName) {
        alert('ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਲਿੰਕ ਬਣਾਓ');
        return;
    }
    
    // Create the shareable URL
    const currentUrl = window.location.origin + window.location.pathname;
    const encodedName = createLanguageSafeURL(userName);
    const shareableUrl = `${currentUrl}?from=${encodedName}`;
    
    // Create customized Punjabi share message as requested
    const message = `*"${userName}" ਦੀ ਪਹਿਲੀ ਲੋਹੜੀ * ਤੁਹਾਨੂੰ ਇੱਕ ਹੈਰਾਨੀਜਨਕ ਸੁਨੇਹਾ ਭੇਜਿਆ ਹੈ 😍 

💁 ਇਸ ਨੀਲੀ ਲਾਈਨ ਨੂੰ ਛੂਹੋ  
👇👇👇
${shareableUrl}

🔥 ਲੋਹੜੀ ਮੁਬਾਰਕ! 🔥`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
});

// Copy link button click handler
copyLinkButton.addEventListener('click', function() {
    const userName = userNameInput.value.trim();
    
    if (!userName) {
        alert('ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਲਿੰਕ ਬਣਾਓ');
        return;
    }
    
    // Create the shareable URL
    const currentUrl = window.location.origin + window.location.pathname;
    const encodedName = createLanguageSafeURL(userName);
    const shareableUrl = `${currentUrl}?from=${encodedName}`;
    
    // Create the same customized message for clipboard
    const message = `*"${userName}" ਦੀ ਪਹਿਲੀ ਲੋਹੜੀ * ਤੁਹਾਨੂੰ ਇੱਕ ਹੈਰਾਨੀਜਨਕ ਸੁਨੇਹਾ ਭੇਜਿਆ ਹੈ 😍 

💁 ਇਸ ਨੀਲੀ ਲਾਈਨ ਨੂੰ ਛੂਹੋ  
👇👇👇
${shareableUrl}

🔥 ਲੋਹੜੀ ਮੁਬਾਰਕ! 🔥`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(message)
        .then(() => {
            // Show success feedback
            const originalText = copyLinkButton.innerHTML;
            copyLinkButton.innerHTML = '<span>✓</span><span>ਸੁਨੇਹਾ ਕਾਪੀ ਹੋ ਗਿਆ!</span>';
            
            setTimeout(() => {
                copyLinkButton.innerHTML = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback: copy just the URL
            navigator.clipboard.writeText(shareableUrl)
                .then(() => {
                    alert('ਲਿੰਕ ਕਾਪੀ ਹੋ ਗਿਆ!');
                })
                .catch(() => {
                    alert('ਲਿੰਕ ਕਾਪੀ ਕਰਨ ਵਿੱਚ ਅਸਫਲ, ਕਿਰਪਾ ਕਰਕੇ ਮੈਨੂਅਲੀ ਕਾਪੀ ਕਰੋ');
                });
        });
});

// Open main page button click handler
openMainPageBtn.addEventListener('click', showMainPage);

// Start Lohri countdown
function startLohriCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Lohri date: 13 January
    let lohriDate = new Date(currentYear, 0, 13, 0, 0, 0);

    // If Lohri already passed, set for next year
    if (now > lohriDate) {
        lohriDate = new Date(currentYear + 1, 0, 13, 0, 0, 0);
    }

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = lohriDate - now;

        if (distance <= 0) {
            clearInterval(timer);
            const countdownElement = document.querySelector('.lohri-countdown');
            if (countdownElement) {
                countdownElement.innerHTML = `<div class="countdown-title">🎉🔥 ਲੋਹੜੀ ਆ ਗਈ! 🔥🎉</div>`;
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");
        
        if (daysElement) daysElement.textContent = days;
        if (hoursElement) hoursElement.textContent = hours;
        if (minutesElement) minutesElement.textContent = minutes;
        if (secondsElement) secondsElement.textContent = seconds;
    }, 1000);
}

// Add polyfill for older browsers that don't support btoa with Unicode
if (typeof btoa === 'undefined') {
    // Polyfill for btoa
    window.btoa = function(str) {
        return Buffer.from(str, 'binary').toString('base64');
    };
}

if (typeof atob === 'undefined') {
    // Polyfill for atob
    window.atob = function(str) {
        return Buffer.from(str, 'base64').toString('binary');
    };
}

// Handle Unicode in btoa/atob
function btoaUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function atobUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

// Enhanced URL encoding for complete language support
function createUniversalURL(name) {
    if (!name) return '';
    
    // Check if name contains non-ASCII characters
    const hasNonAscii = /[^\x00-\x7F]/.test(name);
    
    if (!hasNonAscii) {
        // Simple English name, use as-is with hyphens
        return name.toLowerCase().replace(/\s+/g, '-');
    } else {
        // Punjabi/Hindi name, use Base64 encoding
        // First convert to UTF-8
        const utf8Bytes = new TextEncoder().encode(name);
        // Convert to Base64
        let binary = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
            binary += String.fromCharCode(utf8Bytes[i]);
        }
        const base64 = btoa(binary);
        // Make URL safe
        return base64
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }
}

// Update the createLanguageSafeURL function to use the universal method
function createLanguageSafeURL(name) {
    return createUniversalURL(name);
}

// Update decode function
function decodeNameFromURL(encodedName) {
    if (!encodedName) return null;
    
    // Check if it looks like Base64 (contains only URL-safe Base64 chars)
    const base64Regex = /^[A-Za-z0-9\-_]+$/;
    
    if (base64Regex.test(encodedName) && encodedName.length > 10) {
        // Likely Base64 encoded
        try {
            // Add padding
            let padded = encodedName.replace(/-/g, '+').replace(/_/g, '/');
            while (padded.length % 4 !== 0) {
                padded += '=';
            }
            
            // Decode from Base64
            const binary = atob(padded);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            
            // Convert from UTF-8
            return new TextDecoder().decode(bytes);
        } catch (e) {
            console.error('Error decoding:', e);
            return encodedName;
        }
    } else {
        // Simple name, just decode URI component
        try {
            return decodeURIComponent(encodedName);
        } catch (e) {
            return encodedName;
        }
    }
}

// Initialize the page
function init() {
    setLandingMessage();
    setMainMessage();
    startLohriCountdown();
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', init);