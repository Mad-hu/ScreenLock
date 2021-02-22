<img src="./screenlock.png" width="100%" />

<br>

<p>
  Screen Lock based on Electron-react-boilerplate, uses <a href="https://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.github.io/docs/">Webpack</a> and <a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a>.
</p>

<br>

## Abstract
Screen Lock based on Electron-react-boilerplate, Screen Lock、keyboard shortcuts Lock、application auto power on
- Screen Lock
- keyboard shortcuts Lock 
  - Alt + Tab
  - Alt + F4
  - Ctrl + Alt + delete
  - ....
- application auto power on
  
| Important functions                                                            |          | MacOS  | Windows |
| ----------------------------------------------------------------- | ------------------- | :--: | :-----: |
| Screen Lock                                   |   |  ✅  |   ✅    |
| keyboard shortcuts Lock                       |     |  ❌  |   ✅    |
| auto power on                                  |    |  ✅  |   ✅    |
## Install
First, clone the repo via git and install dependencies:

```bash
git clone https://github.com/Mad-hu/ScreenLock.git
cd ScreenLock
yarn
```
## File Structure
- .erb: project config
- assets: app icons
- screenlock-node: keyboard shortcuts Lock cpp project
- src: base application
## Starting Development

Start the app in the `dev` environment:

```bash
yarn start
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```
## Auto power on !importent
electron builder config. package.json
``` package.json
"win": {
      "requestedExecutionLevel": "highestAvailable", // is require
      "target": [
        {
          "target": "nsis"
        }
      ]
    }
```
if you want auto power on and keyboard shortcuts Lock (Ctrl + Alt + delete) is working, next change the windows computer UAC. regedit.
``` reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System]
"ConsentPromptBehaviorAdmin"=dword:00000000
"EnableLUA"=dword:00000000
"EnableUIADesktopToggle"=dword:00000000
"PromptOnSecureDesktop"=dword:00000000
"ValidateAdminCodeSignatures"=dword:00000000
"FilterAdministratorToken"=dword:00000000
```
## Maintainers

- [Mad-hu](https://github.com/Mad-hu)

## Reference Documentation
- [windows keyboard shortcuts Lock](https://docs.microsoft.com/en-us/previous-versions/windows/desktop/legacy/ms644985(v=vs.85)?redirectedfrom=MSDN)
- [MacOS keyboard shortcuts Lock](https://developer.apple.com/documentation/coregraphics/quartz_event_services)
- [c++屏蔽Win10系统快捷键](https://www.cnblogs.com/tiandsp/p/10275683.html)
  
## License

MIT © 
