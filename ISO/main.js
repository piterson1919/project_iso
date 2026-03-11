const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// =============================
// Crear ventana principal
// =============================
function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 900,
    icon: path.join(__dirname, "assets/imagen1.ico"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL("http://192.168.0.116:5173");
}

app.whenReady().then(createWindow);


// =============================
// Cerrar aplicación
// =============================
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


// =============================
// Reactivar en Mac
// =============================
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});


// =============================
// Abrir archivo compartido
// =============================
ipcMain.handle("open-shared-file", async (event, filePath) => {

  try {

    if (!filePath) {
      console.error("Ruta de archivo vacía");
      return;
    }

    if (!fs.existsSync(filePath)) {
      console.error("El archivo no existe:", filePath);
      return;
    }

    const result = await shell.openPath(filePath);

    if (result) {
      console.error("Error abriendo archivo:", result);
    }

  } catch (err) {
    console.error("Error inesperado:", err);
  }

});


// =============================
// Listar archivos de carpeta
// =============================
ipcMain.handle("list-files-in-folder", async (event, folderPath) => {

  try {

    if (!folderPath || !fs.existsSync(folderPath)) {
      console.error("La carpeta no existe:", folderPath);
      return [];
    }

    const files = fs.readdirSync(folderPath);

    const visibleFiles = files
      .filter((f) => {
        const lower = f.toLowerCase();

        return (
          !f.startsWith("~$") &&
          !f.startsWith(".") &&
          !lower.endsWith(".db") &&
          f !== "desktop.ini"
        );
      })
      .map((file) => ({
        name: file,
        fullPath: path.join(folderPath, file)
      }));

    return visibleFiles;

  } catch (error) {
    console.error("Error leyendo carpeta:", error);
    return [];
  }

});


// =============================
// Abrir explorador para elegir archivo
// =============================
ipcMain.handle("select-file", async () => {

  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Documentos', extensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'] },
      { name: 'Todos los archivos', extensions: ['*'] }
    ]
  });

  if (result.canceled) return null;

  return result.filePaths[0];
});