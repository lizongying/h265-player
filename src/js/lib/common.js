//Player request.
window.kPlayVideoReq = 0;
window.kPauseVideoReq = 1;
window.kStopVideoReq = 2;

//Player response.
window.kPlayVideoRsp = 0;
window.kAudioInfo = 1;
window.kVideoInfo = 2;
window.kAudioData = 3;
window.kVideoData = 4;

//Downloader request.
window.kGetFileInfoReq = 0;
window.kDownloadFileReq = 1;
window.kCloseDownloaderReq = 2;

//Downloader response.
window.kGetFileInfoRsp = 0;
window.kFileData = 1;

//Downloader Protocol.
window.kProtoHttp = 0;
window.kProtoWebsocket = 1;

//Decoder request.
window.kInitDecoderReq = 0;
window.kUninitDecoderReq = 1;
window.kOpenDecoderReq = 2;
window.kCloseDecoderReq = 3;
window.kFeedDataReq = 4;
window.kStartDecodingReq = 5;
window.kPauseDecodingReq = 6;
window.kSeekToReq = 7;

//Decoder response.
window.kInitDecoderRsp = 0;
window.kUninitDecoderRsp = 1;
window.kOpenDecoderRsp = 2;
window.kCloseDecoderRsp = 3;
window.kVideoFrame = 4;
window.kAudioFrame = 5;
window.kStartDecodingRsp = 6;
window.kPauseDecodingRsp = 7;
window.kDecodeFinishedEvt = 8;
window.kRequestDataEvt = 9;
window.kSeekToRsp = 10;

function Logger(module) {
    this.module = module;
}

window.Logger = Logger;

Logger.prototype.log = function(line) {
    console.log('[' + this.currentTimeStr() + '][' + this.module + ']' + line);
};

Logger.prototype.logError = function(line) {
    console.log(
        '[' + this.currentTimeStr() + '][' + this.module + '][ER] ' + line);
};

Logger.prototype.logInfo = function(line) {
    console.log(
        '[' + this.currentTimeStr() + '][' + this.module + '][IF] ' + line);
};

Logger.prototype.logDebug = function(line) {
    console.log(
        '[' + this.currentTimeStr() + '][' + this.module + '][DT] ' + line);
};

Logger.prototype.currentTimeStr = function() {
    const now = new Date(Date.now());
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const ms = now.getMilliseconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec +
        ':' + ms;
};

