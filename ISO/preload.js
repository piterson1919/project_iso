const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {

  // Abrir archivo desde ruta
  openSharedFile: (filePath) => {
    return ipcRenderer.invoke('open-shared-file', filePath);
  },

  // Listar archivos en carpeta
  listFilesInFolder: (folderPath) => {
    return ipcRenderer.invoke('list-files-in-folder', folderPath);
  },

  // Abrir explorador para seleccionar archivo
  selectFile: () => {
    return ipcRenderer.invoke('select-file');
  }

});