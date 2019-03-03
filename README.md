# nativescript-ftp-client

!!!!! Curently only working on Android !!!!!

If there is someone willing to add iOS support, they are welcome.

FTP client:
Android - based on http://www.sauronsoftware.it/projects/ftp4j/api/index.html


## Installation

```javascript
tns plugin add nativescript-ftp-client
```

## Usage 

Describe any usage specifics for your plugin. Give examples for Android, iOS, Angular if needed. See [nativescript-drop-down](https://www.npmjs.com/package/nativescript-drop-down) for example.
	
	```javascript
    
    import { FtpClient } from 'nativescript-ftp-client';

    //init the FTP client
    var client = new FtpClient();

    //all methods are promises so use await or then
    await client.connect('server.com');

    //or if you have a different port than 21 (port must be an int)
    //await client.connect('server.com', 25);

    await client.login('username', 'password');

    //if you want to change default folder
    //client.changeDirectory('some folder path');

    //list files
    var list = await client.list();

    //list will be an array of items
    //[{name: 'somename.txt, type: 'file'}, {name: 'somefolder', type: 'directory'}]

    //download first file from list to path (which is a path on the phone and must be a full file String and must be writable folder by your application (write storage permissions) )
    //for example '/some/path/fullfilename.txt'
    await client.download(list[0].name, path);


    //more methods
    /*
    upload(path: string) - string path like in download example
    rename(oldFile, newFile) - name from item in list and new name (both strings)
    deleteFile(file) - name from item
    deleteDirectory(directory) - name from item
    createDirectory(directory) - string
    */

    //always disconnect or there will be memory leaks
    await client.disconnect();

    ```)

    
## License

Apache License Version 2.0, January 2004
