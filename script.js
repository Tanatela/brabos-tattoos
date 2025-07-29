// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Gallery image modal (simple implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const media = item.querySelector('video');
        if (media) {
            if (media.paused) {
                media.play();
            } else {
                media.pause();
            }
            return; // Exit if it's a video
        }

        // Existing modal logic for images (if any, though we only have videos now)
        // This part might be removed if there are no images in the gallery anymore
        const img = item.querySelector('img');
        if (img) {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            const modalImg = modal.querySelector('img');
            modalImg.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            const closeBtn = modal.querySelector('.close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 30px;
                font-weight: bold;
                cursor: pointer;
                z-index: 10001;
            `;
            
            document.body.appendChild(modal);
            
            // Close modal events
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Close with Escape key
            document.addEventListener('keydown', function escapeHandler(e) {
                if (e.key === 'Escape') {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                    document.removeEventListener('keydown', escapeHandler);
                }
            });
        }
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const modalImg = modal.querySelector('img');
        modalImg.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        const closeBtn = modal.querySelector('.close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            font-weight: bold;
            cursor: pointer;
            z-index: 10001;
        `;
        
        document.body.appendChild(modal);
        
        // Close modal events
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    });
});

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;
    
    // Create WhatsApp message
    const whatsappMessage = `Olá! Meu nome é ${name}. Gostaria de fazer um orçamento para uma tatuagem.%0A%0ADescrição: ${message}%0A%0AMeu telefone: ${phone}`;
    const whatsappUrl = `https://wa.me/5514997711910?text=${whatsappMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    this.reset();
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.textContent = 'Redirecionando para o WhatsApp...';
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ffffff;
        color: #000000;
        padding: 20px;
        border-radius: 10px;
        z-index: 10000;
        font-weight: bold;
    `;
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        if (document.body.contains(successMsg)) {
            document.body.removeChild(successMsg);
        }
    }, 3000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.gallery-item, .contact-item, .about-text').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading animation
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
    document.body.style.transition = "opacity 0.5s ease";
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "0";
});



// Enhanced video handling for better compatibility
document.addEventListener("DOMContentLoaded", function() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Add error handling
        video.addEventListener('error', function(e) {
            console.error('Erro ao carregar vídeo:', e);
            const errorMsg = document.createElement('div');
            errorMsg.innerHTML = `
                <p style="color: #ff6b6b; text-align: center; padding: 20px;">
                    ⚠️ Erro ao carregar vídeo<br>
                    <a href="${video.querySelector('source').src}" download style="color: #ff6b6b; text-decoration: underline;">
                        Clique aqui para baixar
                    </a>
                </p>
            `;
            video.parentNode.insertBefore(errorMsg, video.nextSibling);
        });
        
        // Add loading state
        video.addEventListener('loadstart', function() {
            const overlay = this.parentNode.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Carregando...</span>';
            }
        });
        
        // Reset overlay when loaded
        video.addEventListener('loadeddata', function() {
            const overlay = this.parentNode.querySelector('.gallery-overlay');
            const span = overlay.querySelector('span');
            if (overlay && span) {
                overlay.innerHTML = '<i class="fas fa-play"></i>' + '<span>' + span.textContent.replace('Carregando...', span.getAttribute('data-original') || span.textContent) + '</span>';
            }
        });
        
        // Store original text
        const overlay = video.parentNode.querySelector('.gallery-overlay span');
        if (overlay && !overlay.getAttribute('data-original')) {
            overlay.setAttribute('data-original', overlay.textContent);
        }
        
        // Improve mobile playback
        video.addEventListener('click', function(e) {
            e.stopPropagation();
            if (this.paused) {
                this.play().catch(err => {
                    console.error('Erro ao reproduzir vídeo:', err);
                });
            } else {
                this.pause();
            }
        });
        
        // Add play/pause on overlay click
        const galleryOverlay = video.parentNode.querySelector('.gallery-overlay');
        if (galleryOverlay) {
            galleryOverlay.addEventListener('click', function(e) {
                e.stopPropagation();
                if (video.paused) {
                    video.play().catch(err => {
                        console.error('Erro ao reproduzir vídeo:', err);
                    });
                } else {
                    video.pause();
                }
            });
        }
        
        // Update overlay based on play state
        video.addEventListener('play', function() {
            const overlay = this.parentNode.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
        
        video.addEventListener('pause', function() {
            const overlay = this.parentNode.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        // Lazy loading for better performance
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        if (video.getAttribute('data-src')) {
                            video.src = video.getAttribute('data-src');
                            video.removeAttribute('data-src');
                        }
                        video.load();
                        videoObserver.unobserve(video);
                    }
                });
            });
            
            videoObserver.observe(video);
        }
    });
});

// Add CSS for better video styling
const videoStyles = document.createElement('style');
videoStyles.textContent = `
    .gallery-item video {
        transition: transform 0.3s ease;
    }
    
    .gallery-item:hover video {
        transform: scale(1.02);
    }
    
    .gallery-overlay {
        transition: opacity 0.3s ease;
    }
    
    video::-webkit-media-controls-panel {
        background-color: rgba(0, 0, 0, 0.8);
    }
    
    video::-webkit-media-controls-play-button,
    video::-webkit-media-controls-volume-slider,
    video::-webkit-media-controls-timeline {
        filter: invert(1);
    }
`;
document.head.appendChild(videoStyles);

// Add .htaccess content suggestion for better server compatibility
console.log(`
Para melhor compatibilidade dos vídeos, adicione este conteúdo ao arquivo .htaccess:

AddType video/mp4 .mp4
AddType video/webm .webm
AddType video/ogg .ogv

<IfModule mod_headers.c>
    Header set Cache-Control "max-age=2592000, public"
    Header set Access-Control-Allow-Origin "*"
</IfModule>

<IfModule mod_mime.c>
    AddType video/mp4 mp4
    AddType video/webm webm
    AddType video/ogg ogv
</IfModule>
`);

