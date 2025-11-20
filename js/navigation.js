/**
 * Navigation Component
 * Reusable navigation that automatically highlights the active page
 */

const Navigation = {
    // Navigation items configuration
    items: [
        {
            href: 'index.html',
            icon: 'bx bx-grid-alt',
            label: 'Overview'
        },
        {
            href: 'reports.html',
            icon: 'bx bx-file',
            label: 'Reports'
        },
        {
            href: 'comments-analysis.html',
            icon: 'bx bx-message-square-dots',
            label: 'Comments Analysis',
            disabled: true // Set to false when ready to enable
        },
        {
            href: 'progress-tracker.html',
            icon: 'bx bx-line-chart',
            label: 'Progress Tracker'
        },
        {
            href: 'user-management.html',
            icon: 'bx bx-user',
            label: 'User Management'
        },
        {
            href: 'manager-dashboard.html',
            icon: 'bx bx-user-circle',
            label: 'Line Manager Dashboard'
        }
    ],

    /**
     * Get the current page filename from the URL
     */
    getCurrentPage: function() {
        const path = window.location.pathname;
        let filename = path.split('/').pop();
        
        // Handle root/index case
        if (!filename || filename === '' || filename.endsWith('/')) {
            filename = 'index.html';
        }
        
        return filename;
    },

    /**
     * Render the navigation HTML
     * @param {string} containerPadding - Padding class for container (default: 'px-0')
     */
    render: function(containerPadding = 'px-0') {
        const currentPage = this.getCurrentPage();
        
        let navHTML = `<div class="nav-tabs-custom">
        <div class="container-fluid ${containerPadding}">`;

        this.items.forEach(item => {
            // Only mark as active if not disabled and matches current page
            const isActive = !item.disabled && item.href === currentPage ? ' class="active"' : '';
            
            if (item.disabled) {
                navHTML += `<a href="#" onclick="return false;" style="opacity: 0.5; cursor: not-allowed;"><i class='${item.icon}'></i> ${item.label}</a>`;
            } else {
                navHTML += `<a href="${item.href}"${isActive}><i class='${item.icon}'></i> ${item.label}</a>`;
            }
        });

        navHTML += `</div>
    </div>`;

        return navHTML;
    },

    /**
     * Initialize navigation by replacing the nav container
     * Automatically detects existing padding or uses default
     */
    init: function() {
        const navContainer = document.querySelector('.nav-tabs-custom');
        if (navContainer) {
            // Detect existing padding from the container-fluid div
            const containerFluid = navContainer.querySelector('.container-fluid');
            const existingPadding = containerFluid ? 
                Array.from(containerFluid.classList).find(cls => cls.startsWith('px-')) || 'px-0' : 
                'px-0';
            
            navContainer.outerHTML = this.render(existingPadding);
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Navigation.init());
} else {
    Navigation.init();
}

