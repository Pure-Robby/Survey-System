// Action Tracker JavaScript
const actionTracker = (() => {
    let actions = [];
    let nextId = 1;
    let editingActionId = null;

    // Initialize with sample data
    const sampleActions = [
        {
            id: 1,
            title: "Implement Weekly Recognition Programme",
            description: "Start weekly team meetings with recognition of individual and team achievements",
            priority: "high",
            dueDate: "2025-02-15",
            column: "focus",
            dimension: "Recognition & Rewards"
        },
        {
            id: 2,
            title: "Create Individual Development Plans",
            description: "Work with each team member to create personalised development and career growth plans",
            priority: "medium",
            dueDate: "2025-03-01",
            column: "focus",
            dimension: "Career Growth"
        },
        {
            id: 3,
            title: "Establish Monthly One-on-Ones",
            description: "Schedule regular one-on-one meetings with each team member for guidance and feedback",
            priority: "high",
            dueDate: "2025-02-01",
            column: "focus",
            dimension: "Leadership Support"
        },
        {
            id: 4,
            title: "Team Building Workshop",
            description: "Organize a team building session to strengthen relationships and improve collaboration",
            priority: "medium",
            dueDate: "2025-04-15",
            column: "planned",
            dimension: "Team Collaboration"
        },
        {
            id: 5,
            title: "Skills Training Programme",
            description: "Implement quarterly skills training sessions based on team member interests and company needs",
            priority: "medium",
            dueDate: "2025-05-01",
            column: "planned",
            dimension: "Development & Growth"
        },
        {
            id: 6,
            title: "Improved Project Communication",
            description: "Implemented new project management system with better communication tools",
            priority: "high",
            dueDate: "2025-01-10",
            column: "completed",
            dimension: "Communication"
        },
        {
            id: 7,
            title: "Team Feedback Sessions",
            description: "Conducted structured feedback sessions to understand team concerns and suggestions",
            priority: "medium",
            dueDate: "2025-01-05",
            column: "completed",
            dimension: "Engagement"
        }
    ];

    // Load actions from localStorage or use sample data
    function loadActions() {
        const saved = localStorage.getItem('actionTrackerActions');
        if (saved) {
            actions = JSON.parse(saved);
            if (actions.length > 0) {
                nextId = Math.max(...actions.map(a => a.id)) + 1;
            }
        } else {
            actions = [...sampleActions];
            nextId = 8;
            saveActions();
        }
    }

    // Save actions to localStorage
    function saveActions() {
        localStorage.setItem('actionTrackerActions', JSON.stringify(actions));
    }

    // Initialize
    function init() {
        loadActions();
        renderBoard();
        setupDragAndDrop();
    }

    // Render the entire board
    function renderBoard() {
        renderColumn('focus');
        renderColumn('planned');
        renderColumn('completed');
        updateCounts();
    }

    // Render a specific column
    function renderColumn(columnType) {
        const column = document.getElementById(`${columnType}Column`);
        if (!column) return;

        const columnActions = actions.filter(a => a.column === columnType);
        
        if (columnActions.length === 0) {
            column.innerHTML = '<div class="empty-column">No action items in this column</div>';
            return;
        }

        column.innerHTML = columnActions.map(action => createActionCard(action)).join('');
        
        // Re-attach event listeners
        columnActions.forEach(action => {
            attachCardListeners(action.id);
        });
    }

    // Create action card HTML
    function createActionCard(action) {
        const priorityClass = `priority-${action.priority}`;
        const columnClass = action.column === 'focus' ? 'focus-area' : 
                           action.column === 'planned' ? 'planned' : 'completed';
        
        const dueDateText = action.dueDate ? 
            `Due: ${new Date(action.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}` : 
            'No due date';
        
        const dimensionBadge = action.dimension ? 
            `<div class="mb-2"><span class="badge badge-primary" style="font-size: 11px;">${action.dimension}</span></div>` : '';

        const actionButtons = action.column === 'completed' ? 
            `<button class="action-btn delete" onclick="actionTracker.deleteAction(${action.id})" title="Delete">
                <i class='bx bx-trash'></i>
            </button>` :
            `<button class="action-btn" onclick="actionTracker.editAction(${action.id})" title="Edit">
                <i class='bx bx-edit'></i>
            </button>
            <button class="action-btn" onclick="actionTracker.completeAction(${action.id})" title="Mark Complete">
                <i class='bx bx-check'></i>
            </button>
            <button class="action-btn delete" onclick="actionTracker.deleteAction(${action.id})" title="Delete">
                <i class='bx bx-trash'></i>
            </button>`;

        return `
            <div class="action-card ${columnClass}" data-action-id="${action.id}" draggable="true">
                <div class="action-card-title">${action.title}</div>
                <div>
                    <span class="action-card-priority ${priorityClass}">${action.priority.toUpperCase()}</span>
                </div>
                ${dimensionBadge}
                <div class="action-card-description">${action.description || 'No description'}</div>
                <div class="action-card-due-date">${dueDateText}</div>
                <div class="action-card-actions">
                    ${actionButtons}
                </div>
            </div>
        `;
    }

    // Attach event listeners to a card
    function attachCardListeners(actionId) {
        const card = document.querySelector(`[data-action-id="${actionId}"]`);
        if (!card) return;

        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    }

    // Update column counts
    function updateCounts() {
        document.getElementById('focusCount').textContent = 
            actions.filter(a => a.column === 'focus').length;
        document.getElementById('plannedCount').textContent = 
            actions.filter(a => a.column === 'planned').length;
        document.getElementById('completedCount').textContent = 
            actions.filter(a => a.column === 'completed').length;
    }

    // Show add modal
    function showAddModal(column = 'focus') {
        editingActionId = null;
        document.getElementById('modalTitle').textContent = 'Add Action Item';
        document.getElementById('actionForm').reset();
        document.getElementById('actionId').value = '';
        document.getElementById('actionColumn').value = column;
        showModal();
    }

    // Show edit modal
    function editAction(id) {
        const action = actions.find(a => a.id === id);
        if (!action) return;

        editingActionId = id;
        document.getElementById('modalTitle').textContent = 'Edit Action Item';
        document.getElementById('actionId').value = action.id;
        document.getElementById('actionTitle').value = action.title;
        document.getElementById('actionDescription').value = action.description || '';
        document.getElementById('actionPriority').value = action.priority;
        document.getElementById('actionDueDate').value = action.dueDate || '';
        document.getElementById('actionDimension').value = action.dimension || '';
        document.getElementById('actionColumn').value = action.column;
        showModal();
    }

    // Save action
    function saveAction() {
        const form = document.getElementById('actionForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const actionData = {
            id: editingActionId || nextId++,
            title: document.getElementById('actionTitle').value,
            description: document.getElementById('actionDescription').value,
            priority: document.getElementById('actionPriority').value,
            dueDate: document.getElementById('actionDueDate').value || null,
            column: document.getElementById('actionColumn').value || 'focus',
            dimension: document.getElementById('actionDimension').value || null
        };

        if (editingActionId) {
            const index = actions.findIndex(a => a.id === editingActionId);
            if (index !== -1) {
                actions[index] = { ...actions[index], ...actionData };
            }
        } else {
            actions.push(actionData);
        }

        saveActions();
        renderBoard();
        hideModal();
    }

    // Complete action
    function completeAction(id) {
        const action = actions.find(a => a.id === id);
        if (action) {
            action.column = 'completed';
            saveActions();
            renderBoard();
        }
    }

    // Delete action
    function deleteAction(id) {
        if (confirm('Are you sure you want to delete this action item?')) {
            actions = actions.filter(a => a.id !== id);
            saveActions();
            renderBoard();
        }
    }

    // Show modal
    function showModal() {
        const modal = document.getElementById('actionModal');
        if (modal) {
            modal.classList.add('show');
        }
    }

    // Hide modal
    function hideModal() {
        const modal = document.getElementById('actionModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    // Drag and Drop functionality
    let draggedElement = null;

    function setupDragAndDrop() {
        const columns = document.querySelectorAll('.action-column');
        
        columns.forEach(column => {
            column.addEventListener('dragover', handleDragOver);
            column.addEventListener('drop', handleDrop);
            column.addEventListener('dragenter', handleDragEnter);
            column.addEventListener('dragleave', handleDragLeave);
        });
    }

    function handleDragStart(e) {
        draggedElement = this;
        this.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
        document.querySelectorAll('.action-column').forEach(col => {
            col.classList.remove('drag-over');
        });
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('drag-over');
    }

    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (draggedElement !== null) {
            const actionId = parseInt(draggedElement.getAttribute('data-action-id'));
            const newColumn = this.getAttribute('data-column');
            
            const action = actions.find(a => a.id === actionId);
            if (action) {
                action.column = newColumn;
                saveActions();
                renderBoard();
            }
        }

        this.classList.remove('drag-over');
        return false;
    }

    return {
        init,
        showAddModal,
        editAction,
        saveAction,
        completeAction,
        deleteAction,
        hideModal
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    actionTracker.init();
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('actionModal');
    if (modal && e.target === modal) {
        actionTracker.hideModal();
    }
});



