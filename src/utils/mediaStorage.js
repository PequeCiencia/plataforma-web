// mediaStorage.js - Almacenamiento persistente de videos y archivos en IndexedDB del navegador
// Permite que videos de gran tamaño (MP4, WebM, MOV de 10MB a 500MB+) permanezcan guardados
// incluso después de reiniciar el navegador, recargar la página o reiniciar el servidor.

const DB_NAME = 'PequenosCientificosMediaDB';
const DB_VERSION = 1;
const STORE_NAME = 'media_files';

// Cache en memoria para URLs generadas durante la sesión activa
const urlCache = new Map();

// Abrir conexión a IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB no está soportado en este navegador'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

/**
 * Guarda un archivo o Blob en IndexedDB de forma persistente.
 * @param {string} id - Clave única (ej. "exp-densidades-paso-2")
 * @param {File|Blob} blob - Archivo de video o imagen
 * @param {string} fileName - Nombre del archivo original
 * @returns {Promise<string>} La clave guardada
 */
export async function saveMediaFile(id, blob, fileName = '') {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const record = {
        id,
        blob,
        fileName: fileName || blob.name || 'video_paso.mp4',
        fileType: blob.type || 'video/mp4',
        fileSize: blob.size || 0,
        savedAt: Date.now()
      };

      const req = store.put(record);

      req.onsuccess = () => {
        // Limpiar cache previa si existía
        if (urlCache.has(id)) {
          URL.revokeObjectURL(urlCache.get(id));
          urlCache.delete(id);
        }
        resolve(id);
      };

      req.onerror = (e) => {
        reject(e.target.error);
      };
    });
  } catch (error) {
    console.error('Error al guardar archivo en IndexedDB:', error);
    throw error;
  }
}

/**
 * Obtiene el registro guardado (Blob y metadatos) desde IndexedDB.
 * @param {string} id - Clave única
 * @returns {Promise<{id, blob, fileName, fileType, fileSize}|null>}
 */
export async function getMediaRecord(id) {
  if (!id) return null;
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.get(id);

      req.onsuccess = () => {
        resolve(req.result || null);
      };

      req.onerror = (e) => {
        reject(e.target.error);
      };
    });
  } catch (error) {
    console.error('Error al leer de IndexedDB:', error);
    return null;
  }
}

/**
 * Obtiene una URL utilizable para reproducir el video en <video src="...">.
 * Si ya se generó una URL para esta sesión, la reutiliza. Si no, crea un nuevo ObjectURL válido.
 * @param {string} id - Clave única
 * @returns {Promise<string|null>}
 */
export async function getMediaUrl(id) {
  if (!id) return null;

  // Si ya tenemos una URL activa en cache de sesión, retornarla
  if (urlCache.has(id)) {
    return urlCache.get(id);
  }

  const record = await getMediaRecord(id);
  if (!record || !record.blob) {
    return null;
  }

  const freshUrl = URL.createObjectURL(record.blob);
  urlCache.set(id, freshUrl);
  return freshUrl;
}

/**
 * Elimina un archivo de IndexedDB.
 * @param {string} id - Clave única
 */
export async function deleteMediaFile(id) {
  if (!id) return;
  try {
    if (urlCache.has(id)) {
      URL.revokeObjectURL(urlCache.get(id));
      urlCache.delete(id);
    }
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = (e) => reject(e.target.error);
    });
  } catch (error) {
    console.error('Error al eliminar de IndexedDB:', error);
  }
}
