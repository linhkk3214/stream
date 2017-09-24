function openStream() {
    const config = { audio: false, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}
function playStream(IdTagVideo, stream) {
    var $video = document.getElementById(IdTagVideo);
    $video.srcObject = stream;
    $video.play();
}
//openStream()
//    .then(stream => playStream("localStream", stream));

const peer = new Peer({ "key": "linhdeptrao" });
peer.on("open", id => {
    $("#txtLocalId").html(id);
});
$("#btnCall").click(function () {
    var remoteId = $("#txtRemoteId").val();
    openStream()
        .then(stream => {
            playStream("localStream", stream);
            const call = peer.call(remoteId, stream);
            call.on("stream", stream => playStream("remoteStream", stream))
        });
});
peer.on("call", (call) => {
    openStream()
        .then(stream => {
            call.answer(stream);
            playStream("localStream", stream);
            playStream.on("stream", (stream) => play("remoteStream", stream));
        });
});
