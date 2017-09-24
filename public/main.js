var socket = io("https://stream6969.herokuapp.com");
let customConfig;

$.ajax({
  url: "https://service.xirsys.com/ice",
  data: {
    ident: "vanpho",
    secret: "2b1c2dfe-4374-11e7-bd72-5a790223a9ce",
    domain: "vanpho93.github.io",
    application: "default",
    room: "default",
    secure: 1
  },
  success: function (data, status) {
    // data.d is where the iceServers object lives
    customConfig = data.d;
    console.log(customConfig);
  },
  async: false
});
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

const peer = new Peer({ key: "peerjs", host: "stream6969.herokuapp.com", secure: true, port: 443, config: customConfig  });

peer.on("open", id => {
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
