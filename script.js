// Set your password here (in a real application, this should be handled more securely)
const CORRECT_PASSWORD = 'cool123';

// Initialize IndexedDB
let db;
const request = indexedDB.open('DocumentDB', 1);

request.onerror = (event) => {
    console.error('Database error:', event.target.error);
};

request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('documents')) {
        db.createObjectStore('documents', { keyPath: 'id' });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
};

// Helper function to switch between sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the requested section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
}

// Welcome screen initialization
document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const profilePic = document.querySelector('.profile-pic');
    
    // Make sure welcome screen is visible
    if (welcomeScreen) {
        welcomeScreen.style.display = 'flex';
        welcomeScreen.style.opacity = '1';
    }
    
    // Add click handler to profile picture for transition
    if (profilePic) {
        profilePic.style.cursor = 'pointer';
        profilePic.addEventListener('click', () => {
            showSection('loginSection');
        });
    }
    
    // Add click handler to tiles for transition
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.style.cursor = 'pointer';
        tile.addEventListener('click', (e) => {
            // Don't navigate if clicking on a link inside the tile
            if (!e.target.closest('a')) {
                showSection('loginSection');
            }
        });
    });

    // Fallback: ensure all tiles are visible after animation
    setTimeout(() => {
        document.querySelectorAll('.tile').forEach(tile => {
            tile.style.opacity = '1';
            tile.style.transform = 'none';
        });
    }, 1000);
});

// Password verification
function verifyPassword() {
    const passwordInput = document.getElementById('passwordInput');
    
    // Remove previous error message if any
    let errorMsg = document.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }

    if (passwordInput.value === CORRECT_PASSWORD) {
        showSection('mainContent');
        loadDocuments();
    } else {
        // Add shake animation
        passwordInput.classList.add('shake');
        setTimeout(() => {
            passwordInput.classList.remove('shake');
        }, 500);
        
        // Show error message
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Incorrect password. Please try again.';
        passwordInput.parentNode.insertBefore(errorMsg, passwordInput.nextSibling);
        
        // Clear the input
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Logout function
function logout() {
    // Clear the password field
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.value = '';
    }
    
    // Show welcome screen again
    showSection('welcomeScreen');
    
    // Reset profile info animation
    const profileInfo = document.querySelector('.profile-info');
    if (profileInfo) {
        profileInfo.classList.remove('fade-in');
        setTimeout(() => {
            profileInfo.classList.add('fade-in');
        }, 50);
    }
}

// Show Password Toggle and tile click handler
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('togglePassword');
    const pwd = document.getElementById('passwordInput');
    if (toggle && pwd) {
        toggle.addEventListener('change', () => {
            pwd.type = toggle.checked ? 'text' : 'password';
        });
    }

    // Remove swipe-animate logic, just keep pointer for tiles
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', (e) => {
            // If the tile contains a link and the click is on the link, let it work
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            // Optionally, you can show a notification or modal for each tile
            // Example:
            // showNotification(`You clicked on "${tile.querySelector('h3').textContent}"`, 'info');
        });
    });
});

// Loading Spinner
function showSpinner() {
    const spinner = document.getElementById('globalSpinner');
    if (spinner) spinner.classList.remove('hidden');
}
function hideSpinner() {
    const spinner = document.getElementById('globalSpinner');
    if (spinner) spinner.classList.add('hidden');
}

// Handle file upload with animation
function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    const uploadArea = document.querySelector('.upload-area');
    const uploadBtn = document.querySelector('.upload-btn');
    // Accept only certain file types
    const allowedTypes = [
        'application/pdf', 'image/jpeg', 'image/png', 'image/gif',
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ];

    if (files.length === 0) {
        showNotification('Please select a file to upload', 'error');
        return;
    }

    // Filter files
    const filteredFiles = Array.from(files).filter(f => allowedTypes.includes(f.type));
    if (filteredFiles.length === 0) {
        showNotification('Only PDF, DOC, DOCX, TXT, JPG, PNG, GIF files allowed.', 'error');
        return;
    }

    uploadBtn.disabled = true;
    uploadBtn.textContent = 'Uploading...';
    uploadArea.classList.add('uploading');
    showSpinner();

    let uploadCount = 0;
    const totalFiles = filteredFiles.length;

    for (let file of filteredFiles) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const document = {
                id: Date.now() + Math.random(),
                name: file.name,
                type: file.type,
                size: file.size,
                data: e.target.result,
                date: new Date().toISOString()
            };

            const transaction = db.transaction(['documents'], 'readwrite');
            const store = transaction.objectStore('documents');
            const request = store.add(document);

            request.onsuccess = () => {
                uploadCount++;
                if (uploadCount === totalFiles) {
                    // All files uploaded
                    uploadArea.classList.remove('uploading');
                    uploadBtn.disabled = false;
                    uploadBtn.textContent = 'Upload Files';
                    fileInput.value = '';
                    hideSpinner();
                    showNotification(`${totalFiles} file(s) uploaded successfully!`, 'success');
                    loadDocuments();
                }
            };

            request.onerror = () => {
                uploadCount++;
                if (uploadCount === totalFiles) {
                    uploadArea.classList.remove('uploading');
                    uploadBtn.disabled = false;
                    uploadBtn.textContent = 'Upload Files';
                    hideSpinner();
                    showNotification('Error uploading some files', 'error');
                }
            };
        };
        reader.onerror = () => {
            uploadCount++;
            if (uploadCount === totalFiles) {
                uploadArea.classList.remove('uploading');
                uploadBtn.disabled = false;
                uploadBtn.textContent = 'Upload Files';
                hideSpinner();
                showNotification('Error reading file(s)', 'error');
            }
        };
        reader.readAsDataURL(file);
    }
}

// Load and display documents with animations
function loadDocuments() {
    const documentsList = document.getElementById('documentsList');
    if (!documentsList) return;
    
    // Show loading state
    documentsList.innerHTML = '<div class="loading">Loading documents...</div>';

    const transaction = db.transaction(['documents'], 'readonly');
    const store = transaction.objectStore('documents');
    const request = store.getAll();

    request.onsuccess = () => {
        const documents = request.result;
        
        if (documents.length === 0) {
            documentsList.innerHTML = '<div class="empty-state">No documents found. Upload some files to get started!</div>';
            return;
        }
        
        documentsList.innerHTML = '';
        
        documents.forEach((doc, index) => {
            const docElement = document.createElement('div');
            docElement.className = 'document-item slide-in';
            docElement.style.animationDelay = `${index * 0.1}s`;
            
            // Format file size
            const fileSize = doc.size ? formatFileSize(doc.size) : 'Unknown size';
            
            // Get file icon based on type
            const fileIcon = getFileIcon(doc.name);
            
            docElement.innerHTML = `
                <div class="document-icon">${fileIcon}</div>
                <div class="document-info">
                    <div class="document-name" title="${doc.name}">${doc.name}</div>
                    <div class="document-meta">
                        <span class="document-size">${fileSize}</span>
                        <span class="document-date">${formatDate(doc.date)}</span>
                    </div>
                </div>
                <div class="document-actions">
                    <button class="btn-view" onclick="viewDocument('${doc.id}')" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-download" onclick="downloadDocument('${doc.id}')" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteDocument('${doc.id}', event)" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            documentsList.appendChild(docElement);
        });
    };
    
    request.onerror = () => {
        documentsList.innerHTML = '<div class="error-state">Error loading documents. Please try again.</div>';
    };
}

// Document Preview Modal
function viewDocument(id) {
    showSpinner();
    const transaction = db.transaction(['documents'], 'readonly');
    const store = transaction.objectStore('documents');
    const request = store.get(Number(id));

    request.onsuccess = () => {
        const doc = request.result;
        hideSpinner();
        if (doc) {
            openPreviewModal(doc);
        } else {
            showNotification('Document not found', 'error');
        }
    };
    request.onerror = () => {
        hideSpinner();
        showNotification('Error opening document', 'error');
    };
}

function openPreviewModal(doc) {
    const modal = document.getElementById('previewModal');
    const body = document.getElementById('previewBody');
    if (!modal || !body) return;
    body.innerHTML = '';
    // Show preview for images and pdf, otherwise show download link
    if (doc.type.startsWith('image/')) {
        body.innerHTML = `<img src="${doc.data}" alt="${doc.name}" style="max-width:100%;max-height:70vh;">`;
    } else if (doc.type === 'application/pdf') {
        body.innerHTML = `<embed src="${doc.data}" type="application/pdf" width="100%" height="500px">`;
    } else if (doc.type.startsWith('text/')) {
        body.innerHTML = `<iframe src="${doc.data}" style="width:100%;height:400px;border:none;"></iframe>`;
    } else {
        body.innerHTML = `<a href="${doc.data}" download="${doc.name}" class="animated-button">Download ${doc.name}</a>`;
    }
    modal.classList.remove('hidden');
    modal.focus();
}
function closePreviewModal() {
    const modal = document.getElementById('previewModal');
    if (modal) modal.classList.add('hidden');
}

// Download document
function downloadDocument(id) {
    showSpinner();
    const transaction = db.transaction(['documents'], 'readonly');
    const store = transaction.objectStore('documents');
    const request = store.get(Number(id));

    request.onsuccess = () => {
        hideSpinner();
        const doc = request.result;
        if (doc) {
            const link = document.createElement('a');
            link.href = doc.data;
            link.download = doc.name || 'document';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            showNotification('Document not found', 'error');
        }
    };
    request.onerror = () => {
        hideSpinner();
        showNotification('Error downloading document', 'error');
    };
}

// Delete document with confirmation
function deleteDocument(id, event) {
    // Prevent event bubbling
    if (event) {
        event.stopPropagation();
    }
    
    // Create a custom confirmation dialog
    const dialog = document.createElement('div');
    dialog.className = 'confirmation-dialog';
    dialog.innerHTML = `
        <div class="dialog-content">
            <h3>Delete Document</h3>
            <p>Are you sure you want to delete this document? This action cannot be undone.</p>
            <div class="dialog-actions">
                <button class="btn-cancel">Cancel</button>
                <button class="btn-confirm">Delete</button>
            </div>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(dialog);
    
    // Add event listeners
    const cancelBtn = dialog.querySelector('.btn-cancel');
    const confirmBtn = dialog.querySelector('.btn-confirm');
    
    const closeDialog = () => {
        dialog.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            document.body.removeChild(dialog);
        }, 300);
    };
    
    cancelBtn.addEventListener('click', closeDialog);
    
    confirmBtn.addEventListener('click', () => {
        closeDialog();
        
        // Get the document element to animate
        const docElement = event ? event.target.closest('.document-item') : null;
        
        // Animate document removal if element exists
        if (docElement) {
            docElement.style.animation = 'fadeOutRight 0.3s forwards';
        }
        
        // Delete from database after animation
        setTimeout(() => {
            const transaction = db.transaction(['documents'], 'readwrite');
            const store = transaction.objectStore('documents');
            const request = store.delete(Number(id));
            
            request.onsuccess = () => {
                showNotification('Document deleted successfully', 'success');
                loadDocuments();
            };
            
            request.onerror = () => {
                showNotification('Error deleting document', 'error');
                if (docElement) {
                    docElement.style.animation = '';
                }
            };
        }, 300);
    });
    
    // Close on outside click
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            closeDialog();
        }
    });
    
    // Show dialog with animation
    setTimeout(() => {
        dialog.style.opacity = '1';
    }, 10);
}

// Helper functions for file handling and UI
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function getFileIcon(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    const icons = {
        // Documents
        'pdf': 'fa-file-pdf',
        'doc': 'fa-file-word',
        'docx': 'fa-file-word',
        'txt': 'fa-file-alt',
        'rtf': 'fa-file-alt',
        // Spreadsheets
        'xls': 'fa-file-excel',
        'xlsx': 'fa-file-excel',
        'csv': 'fa-file-csv',
        // Presentations
        'ppt': 'fa-file-powerpoint',
        'pptx': 'fa-file-powerpoint',
        // Images
        'jpg': 'fa-file-image',
        'jpeg': 'fa-file-image',
        'png': 'fa-file-image',
        'gif': 'fa-file-image',
        'svg': 'fa-file-image',
        // Archives
        'zip': 'fa-file-archive',
        'rar': 'fa-file-archive',
        '7z': 'fa-file-archive',
        // Code
        'html': 'fa-file-code',
        'css': 'fa-file-code',
        'js': 'fa-file-code',
        'json': 'fa-file-code',
        // Default
        'default': 'fa-file'
    };
    
    const iconClass = icons[extension] || icons['default'];
    return `<i class="fas ${iconClass}"></i>`;
}

// Show notification message
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 2000);
}

// Add CSS animations if not already present
if (!document.getElementById('custom-animations-style')) {
    const style = document.createElement('style');
    style.id = 'custom-animations-style';
    style.textContent = `
        @keyframes fadeOut {
            to { 
                opacity: 0; 
                transform: translateY(-20px); 
            }
        }
        @keyframes fadeIn {
            from { 
                opacity: 0; 
                transform: translateY(20px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        @keyframes slideIn {
            from { 
                opacity: 0; 
                transform: translateX(-20px); 
            }
            to { 
                opacity: 1; 
                transform: translateX(0); 
            }
        }
        @keyframes fadeOutRight {
            to {
                opacity: 0;
                transform: translateX(40px);
            }
        }
        .shake {
            animation: shake 0.5s;
        }
        .notification {
            position: fixed;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #2563eb;
            color: #fff;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.4s;
            font-size: 1rem;
        }
        .notification.error {
            background: #ef4444;
        }
        .notification.success {
            background: #22c55e;
        }
        .confirmation-dialog {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.3s;
        }
        .confirmation-dialog .dialog-content {
            background: #fff;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.15);
            text-align: center;
            min-width: 280px;
        }
        .confirmation-dialog .dialog-actions {
            margin-top: 1.5rem;
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        .confirmation-dialog .btn-cancel,
        .confirmation-dialog .btn-confirm {
            padding: 0.5rem 1.5rem;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            font-size: 1rem;
        }
        .confirmation-dialog .btn-cancel {
            background: #e5e7eb;
            color: #374151;
        }
        .confirmation-dialog .btn-confirm {
            background: #ef4444;
            color: #fff;
        }
    `;
    document.head.appendChild(style);
}

// Animate profile picture on click (optional visual effect)
function triggerWelcomeAnimation() {
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        profilePic.classList.add('animate');
        setTimeout(() => {
            profilePic.classList.remove('animate');
        }, 1000);
    }
}
