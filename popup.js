document.addEventListener('DOMContentLoaded', () => {
    const tagInput = document.getElementById('tagInput');
    const saveBtn = document.getElementById('saveBtn');
    const tagPreview = document.getElementById('tagPreview');

    function updatePreview(value) {
        if (!tagPreview) return;
        tagPreview.innerHTML = '';
        const tags = (value || '').split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0);
        
        tags.forEach(tag => {
            const chip = document.createElement('span');
            chip.className = 'tag-chip';
            chip.textContent = tag;
            tagPreview.appendChild(chip);
        });
    }

    // Cargar tags guardados
    chrome.storage.sync.get(['customTags'], (res) => {
        const defaultTags = "[general], [éterOS], [Wisely], [Jules]";
        const tags = res.customTags || defaultTags;
        if (tagInput) tagInput.value = tags;
        updatePreview(tags);
    });

    if (tagInput) {
        tagInput.addEventListener('input', (e) => {
            updatePreview(e.target.value);
        });
    }

    if (saveBtn) {
        saveBtn.onclick = () => {
            saveBtn.disabled = true;
            const originalText = saveBtn.innerHTML;
            saveBtn.innerHTML = 'Guardando...';
            
            chrome.storage.sync.set({ customTags: tagInput.value }, () => {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    // Verificación segura de la URL del tab
                    if (tabs && tabs[0] && tabs[0].url && tabs[0].url.includes('gemini.google.com')) {
                        chrome.tabs.reload(tabs[0].id);
                    }
                    setTimeout(() => {
                        window.close();
                    }, 500);
                });
            });
        };
    }
});