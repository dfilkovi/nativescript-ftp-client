import "globals";

declare var global: any
declare var it: any

export class FtpWorker 
{
    private client: any;

    constructor()
    {
        var me = this;

        try
        {
            me.client = new it.sauronsoftware.ftp4j.FTPClient();
        }
        catch(error)
        {
            console.log(error);
        }

        global.onmessage = function(msg)
        {
            var data = msg.data;

            var method = data.method;

            try
            {
                var response = me[method](data);
                global.postMessage({uuid: data.uuid, error: false, data: response});
            }
            catch(error)
            {
                global.postMessage({uuid: data.uuid, error: true, data: error.message});
            }
        }
    }

    connect(data: any): any
    {
        var me = this;
        if(data.port != undefined) return me.client.connect(data.url, data.port);
        else return me.client.connect(data.url);
    }
    
    login(data: any): any
    {
        var me = this;
        return me.client.login(data.username, data.password);
    }

    changeDirectory(data: any): any
    {
        var me = this;
        return me.client.changeDirectory(data.path);
    }

    upload(data: any): any
    {
        var me = this;
        return me.client.upload(new java.io.File(data.path));
    }

    disconnect(): any
    {
        var me = this;
        return me.client.disconnect(true);
    }

    list(): any
    {
        var me = this;
        var files = me.client.list();
        var fin = [];
        for(var file of files)
        {
            fin.push({
                type: (file.getType() == it.sauronsoftware.ftp4j.FTPFile.TYPE_DIRECTORY) ? 'directory' : 'file',
                name: file.getName()
            })
        }
        return fin;
    }

    download(data: any): any
    {
        var me = this;

        var fileOut = new java.io.File(data.localFile);
        return me.client.download(data.file, fileOut);
    }

    rename(data: any): any
    {
        var me = this;

        return me.client.rename(data.oldFile, data.newFile);
    }

    deleteFile(data: any): any
    {
        var me = this;

        return me.client.deleteFile(data.file);
    }

    deleteDirectory(data: any): any
    {
        var me = this;

        return me.client.deleteDirectory(data.directory);
    }

    createDirectory(data: any): any
    {
        var me = this;

        return me.client.createDirectory(data.directory);
    }
}

new FtpWorker();