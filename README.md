# Gemini Tag Selector v1.1

Extensión para Google Gemini que inyecta una barra de etiquetas de contexto personalizables sobre el área de chat, optimizando el flujo de trabajo técnico.

## 🚀 Funcionalidades
- **Inyección Automática:** Barra de tags persistente sobre el input de Gemini.
- **UI de Configuración:** Popup integrado para editar, añadir o eliminar tags sin tocar el código.
- **Persistencia:** Los tags se guardan en el almacenamiento sincronizado de Chrome.
- **Smart Replacement:** Si seleccionas un tag nuevo, reemplaza automáticamente al anterior en el prompt.

## 🛠️ Instalación
1. Descarga o crea la carpeta del proyecto con los archivos: `manifest.json`, `content.js`, `popup.html` y `popup.js`.
2. Ve a `chrome://extensions/` en tu navegador.
3. Activa el **Developer mode**.
4. Haz clic en **Load unpacked** y selecciona la carpeta del proyecto.
5. (Recomendado) Fija la extensión en la barra de herramientas para acceder rápido al editor.

## ⚙️ Configuración de Tags
1. Haz clic en el ícono de la extensión en la barra de Chrome.
2. En el área de texto, ingresa tus tags separados por comas.
   * Ejemplo: `[general], [codigo], [trabajo], [investigacion]`
3. Presiona **Guardar y Recargar**. La pestaña de Gemini se actualizará con tus nuevos tags.

## 📝 Estructura de Archivos
- `manifest.json`: Configuración de permisos (`storage`) y puntos de entrada.
- `content.js`: Lógica de inyección en el DOM de Gemini y lectura de datos.
- `popup.html/js`: Interfaz de usuario para la gestión dinámica de etiquetas.

---
**Diseñado para entornos de desarrollo de alto rendimiento por Tudex Networks.**