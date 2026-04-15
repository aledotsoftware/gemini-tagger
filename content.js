function injectTagBar() {
    const inputArea = document.querySelector('.input-area-container') || document.querySelector('input-area-v2');
    if (!inputArea || document.getElementById('tag-selector-root')) return;

    const root = document.createElement('div');
    root.id = 'tag-selector-root';
    inputArea.prepend(root);

    const shadow = root.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        :host {
            display: block;
            width: 100%;
            margin-bottom: 12px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .bar {
            display: flex;
            gap: 8px;
            padding: 4px 0;
            flex-wrap: wrap;
            background: transparent;
            align-items: center;
            animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .tag-btn {
            cursor: pointer;
            padding: 6px 14px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(30, 41, 59, 0.5);
            backdrop-filter: blur(8px);
            color: #e2e8f0;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            user-select: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .tag-btn:hover {
            background: rgba(139, 92, 246, 0.2);
            border-color: #8b5cf6;
            color: #fff;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
        }
        .tag-btn:active {
            transform: translateY(0);
        }
        .label {
            font-size: 11px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-right: 4px;
            font-weight: 600;
        }
    `;
    shadow.appendChild(style);

    const container = document.createElement('div');
    container.className = 'bar';

    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = '';
    container.appendChild(label);

    chrome.storage.sync.get(['customTags'], (res) => {
        const tagStr = res.customTags || "[general], [éterOS], [Wisely], [Jules]";
        const tags = tagStr.split(',').map(t => t.trim()).filter(t => t.length > 0);

        tags.forEach(tag => {
            const btn = document.createElement('div');
            btn.className = 'tag-btn';
            btn.innerText = tag;

            btn.onclick = () => {
                const editor = document.querySelector('div[contenteditable="true"]');
                if (editor) {
                    editor.focus();
                    const currentText = editor.innerText;
                    // Lógica de reemplazo inteligente mejorada
                    if (!currentText.startsWith('[')) {
                        editor.innerText = tag + " " + (currentText.trim());
                    } else {
                        // Reemplazar el tag existente al inicio
                        editor.innerText = tag + " " + currentText.replace(/^\[.*?\]\s*/, '').trim();
                    }
                    editor.dispatchEvent(new Event('input', { bubbles: true }));
                }
            };
            container.appendChild(btn);
        });
        shadow.appendChild(container);
    });
}

// Inyección más robusta usando un observer que detecta cuando el input area está listo
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
            injectTagBar();
        }
    }
});

// Iniciar observación
observer.observe(document.body, { childList: true, subtree: true });

// Intento inicial por si ya cargó
setTimeout(injectTagBar, 1000);