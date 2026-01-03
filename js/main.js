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
        
        // Set landing page message
        function setLandingMessage() {
            if (senderName) {
                landingSenderName.textContent = senderName;
                landingPunjabiMessage.textContent = `ਨੇ ਤੁਹਾਨੂੰ ਲੋਹੜੀ ਦੀ ਵਧਾਈ ਭੇਜੀ ਹੈ`;
            } else {
                // If no name in URL, show generic message
                landingSenderName.textContent = "ਤੁਹਾਡੇ ਦੋਸਤ";
                landingPunjabiMessage.textContent = `ਨੇ ਤੁਹਾਨੂੰ ਲੋਹੜੀ ਦੀ ਵਧਾਈ ਭੇਜੀ ਹੈ`;
            }
        }
        
        // Set main page message
        function setMainMessage() {
            if (senderName) {
                mainSenderMessage.innerHTML = `🎉 <strong>${senderName}</strong> ਨੇ ਤੁਹਾਨੂੰ ਲੋਹੜੀ ਦੀ ਵਧਾਈ ਭੇਜੀ ਹੈ!`;
            } else {
                mainSenderMessage.innerHTML = '🎉 ਤੁਹਾਨੂੰ ਲੋਹੜੀ ਦੀਆਂ ਲੱਖ ਲੱਖ ਵਧਾਈਆਂ!';
            }
        }
        
        // Show main page
        function showMainPage() {
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
            
            // Play a subtle sound effect (optional)
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
            
            // Create the shareable URL
            const currentUrl = window.location.origin + window.location.pathname;
            const shareableUrl = `${currentUrl}?from=${encodeURIComponent(userName)}`;
            
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
            
            const currentUrl = window.location.origin + window.location.pathname;
            const shareableUrl = `${currentUrl}?from=${encodeURIComponent(userName)}`;
            const message = `ਲੋਹੜੀ ਦੀਆਂ ਵਧਾਈਆਂ! ${userName} ਨੇ ਤੁਹਾਨੂੰ ਲੋਹੜੀ ਦੀ ਵਧਾਈ ਭੇਜੀ ਹੈ: ${shareableUrl}`;
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
            
            const currentUrl = window.location.origin + window.location.pathname;
            const shareableUrl = `${currentUrl}?from=${encodeURIComponent(userName)}`;
            
            // Copy to clipboard
            navigator.clipboard.writeText(shareableUrl)
                .then(() => {
                    // Show success feedback
                    const originalText = copyLinkButton.innerHTML;
                    copyLinkButton.innerHTML = '<span>✓</span><span>ਲਿੰਕ ਕਾਪੀ ਹੋ ਗਿਆ!</span>';
                    
                    setTimeout(() => {
                        copyLinkButton.innerHTML = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    alert('ਲਿੰਕ ਕਾਪੀ ਕਰਨ ਵਿੱਚ ਅਸਫਲ, ਕਿਰਪਾ ਕਰਕੇ ਮੈਨੂਅਲੀ ਕਾਪੀ ਕਰੋ');
                });
        });
        
        // Open main page button click handler
        openMainPageBtn.addEventListener('click', showMainPage);
        
        // Initialize the page
        function init() {
            setLandingMessage();
            setMainMessage();
            
            // If there's no sender name, we could optionally skip the landing page
            // But for consistency, we'll always show it
        }
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
            document.querySelector('.lohri-countdown').innerHTML =
                `<div class="countdown-title">🎉🔥 ਲੋਹੜੀ ਆ ਗਈ! 🔥🎉</div>`;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }, 1000);
}
startLohriCountdown();

        // Initialize when page loads
        window.addEventListener('DOMContentLoaded', init);
   