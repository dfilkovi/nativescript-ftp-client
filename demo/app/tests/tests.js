var FtpClient = require("nativescript-ftp-client").FtpClient;
var ftpClient = new FtpClient();

describe("greet function", function() {
    it("exists", function() {
        expect(ftpClient.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(ftpClient.greet()).toEqual("Hello, NS");
    });
});