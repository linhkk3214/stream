function openStream() {
    const config = { audio: false, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}
function playStream(IdTagVideo, stream) {
    var $video = document.getElementById(IdTagVideo);
    $video.srcObject = stream;
    $video.play();
}
openStream()
    .then(stream => playStream("localStream", stream));