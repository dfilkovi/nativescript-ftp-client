import
{
    Observable
}
from 'tns-core-modules/data/observable';
import
{
    FtpClient
}
from 'nativescript-ftp-client';
import * as fileSystemModule from "tns-core-modules/file-system"

export class HelloWorldModel extends Observable
{
    public message: string;

    constructor()
    {
        super();

        var me = this;

        me.testUpload();
    }

    async testUpload()
    {
      var me = this;

      try 
      {
        var client = new FtpClient();

        const documentsFolder = fileSystemModule.knownFolders.documents();
        const path = fileSystemModule.path.join(documentsFolder.path, "FileFromPath2.txt");
        const file = fileSystemModule.File.fromPath(path);

        await client.connect('coreaplikacije.hr');

        await client.login('test', 'hHq8i2_1');

        //if (data.mServerPath != "") client.changeDirectory(data.mServerPath);

        var list = await client.list();

        console.log('list', list)

        await client.download(list[0].name, path);

        console.log('download finished');

        await client.disconnect();
      
      } 
      catch(error)
      {
        console.log(error);
      }
    }
}