var pcap = require("pcap"),
    pcap_session = pcap.createSession("en0", "tcp"),
    matcher = /safari/i,
    tcp_tracker = new pcap.TCP_tracker();

console.log("Listening on " + pcap_session.device_name);

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet),
        data = packet.link.ip.tcp.data;
    
    if (data && matcher.test(data.toString())) {
        console.log(pcap.print.packet(packet));
        console.log(data.toString() + '\r\n----------------------');
    }
});
