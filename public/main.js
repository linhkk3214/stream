function openStream() {
    const config = { audio: false, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}
function playStream(IdTagVideo, stream) {
    var $video = document.getElementById(IdTagVideo);
    $video.srcObject = stream;
    $video.play();
}
const peer = new Peer({ "key": "tr3izjcg20jatt9", "host": "stream6969.herokuapp.com", secure: true, port: 443 });
peer.on("open", (id) => {
    console.log(1);
    $("#txtLocalIdPeer").html(id);
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
