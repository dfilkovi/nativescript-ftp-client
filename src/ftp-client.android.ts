import "globals";

declare var global: any

export class FtpClient {

    private worker: Worker;
    private promises = {};
    private instance = 0;

    postMessage(obj: any)
    {
        var me = this;

        me.instance++;

        var id = me.instance;
        obj.uuid = id;

        me.promises[id] = obj;

        me.worker.postMessage(obj);
    }

    connect(url: string, port: number): Promise<any>
    {
        var me = this;

        return new Promise((resolve, reject) =>
        {
            try
            {
                me.worker;
                if(global.TNS_WEBPACK)
                {
                    const FtpWorker = require("nativescript-worker-loader!./ftp-worker-android.js");
                    me.worker = new FtpWorker();
                } 
                else 
                {
                    me.worker = new Worker('./ftp-worker-android.js');
                }

                me.worker.onmessage = function(msg)
                {
                    if(msg.data.uuid)
                    {
                        var obj = me.promises[msg.data.uuid];
                        if(obj == undefined)
                        {
                            console.log('Message does not contain uuid', msg.data);
                            return;
                        }

                        if(msg.data.error == false) obj.resolve(msg.data.data);
                        else obj.reject(msg.data.data);
                    } 
                    else 
                    {
                        console.log('Message does not contain uuid', msg.data)
                    }
                }

                me.postMessage({
                    method: 'connect',
                    url: url,
                    port: port,
                    resolve,
                    reject
                });
            }
            catch(error)
            {
                reject(error);
            }
        })
    }

    login(username: string, password: string): Promise<any>
    {
        var me = this;
        return new Promise((resolve, reject) =>
        {
            try
            {
                me.postMessage({
                    method: 'login',
                    username: username,
                    password: password,
                    resolve,
                    reject
                });
            }
            catch(error)
            {
                reject(error);
            }
        })
    }

    changeDirectory(path: string): Promise<any>
    {
        var me = this;

        return new Promise((resolve, reject) =>
        {
            try
            {
                me.postMessage({
                    method: 'changeDirectory',
                    path: path,
                    resolve,
                    reject
                });
            }
            catch(error)
            {
                reject(error);
            }
        })
    }

    upload(path: string): Promise<any>
    {
        var me = this;

        return new Promise((resolve, reject) =>
        {
            try
            {
                me.postMessage({
                    method: 'upload',
                    path: path,
                    resolve,
                    reject
                });
            }
            catch(error)
            {
                reject(error);
            }
        })

        
    }

    disconnect(): Promise<any>
    {
        var me = this;

        return new Promise((resolve, reject) =>
        {
            try
            {
                me.postMessage({
                    method: 'disconnect',
                    resolve,
                    reject
                });

                me.worker.terminate();
            }
            catch(error)
            {
                reject(error);
            }
        })
    }


    list(): Promise<any>
    {
        var me = this;

        return new Promise((resolve, reject) =>
        {
            try
            {
                me.postMessage({
                    method: 'list',
                    resolve,
                    reject
                });
            }
            catch(error)
            {
                reject(error);
            }
        })
    }

    download(file, localFile): Promise<any>
    {
        var me = this;

        return new Promise((resolve, reject) =>
        {
            try
            {
                me.postMessage({
                    method: 'download',
                    file: file,
                    localFile: localFile,
                    resolve,
                    reject
                });
            }
            catch(error)
            {
                reject(error);
            }
        })
    }

    rename(oldFile, newFile): Promise<any>
    {
        var me = this;

        return new Promise((resolve, reject) =>
        {
            try
            {
                me.postMessage({
                    method: 'rename',
                    oldFile: oldFile,
                    newFile: newFile,
                    resolve,
                    reject
                });
            }
            catch(error)
            {
                reject(error);
            }
        })
    }

    deleteFile(file): Promise<any>
    {
        var me = this;

        return new Promise((resolve, reject) =>
        {
            try
            {
                me.postMessage({
                    method: 'deleteFile',
                    file: file,
                    resolve,
                    reject
                });
            }
            catch(error)
            {
                reject(error);
            }
        })
    }

    deleteDirectory(directory): Promise<any>
    {
        var me = this;

        return new Promise((resolve, reject) =>
        {
            try
            {
                me.postMessage({
                    method: 'deleteDirectory',
                    directory: directory,
                    resolve,
                    reject
                });
            }
            catch(error)
            {
                reject(error);
            }
        })
    }

    createDirectory(directory): Promise<any>
    {
        var me = this;

        return new Promise((resolve, reject) =>
        {
            try
            {
                me.postMessage({
                    method: 'createDirectory',
                    directory: directory,
                    resolve,
                    reject
                });
            }
            catch(error)
            {
                reject(error);
            }
        })
    }
}
