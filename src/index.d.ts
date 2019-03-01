export declare class FtpClient {
    // define your typings manually
    // or..
    // take the ios or android .d.ts files and copy/paste them here
    connect(url: string, port?: number): Promise<any>

    login(username: string, password: string): Promise<any>

    changeDirectory(path: string): Promise<any>

    upload(path: string): Promise<any>

    disconnect(): Promise<any>

    list(): Promise<any>

    download(file, localFile): Promise<any>

    rename(oldFile, newFile): Promise<any>

    deleteFile(file): Promise<any>

    deleteDirectory(directory): Promise<any>

    createDirectory(directory): Promise<any>
}