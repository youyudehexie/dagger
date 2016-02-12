export const MENU_TEMPLATE = [{
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Flush Data',
        accelerator: 'F11',
        click() {
          window.localStorage.setItem('dagger', '{}')
        }
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A', role: 'selectall'
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
    {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
    }
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+Q',
        role: 'close'
      },
    ]

}]

