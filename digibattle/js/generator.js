class DMX {
    constructor() {
        this.dummy = "V2-007E-007E-041E-141E-004E";
        this.eol = "1110";
        this.head = "V2-";
    }

    genRandomCode() {
        let level = Math.floor(Math.random() * 10).toString(2).padStart(4, '0');
        let order = "0";
        let sick = "0";
        let attack = Math.floor(Math.random() * 4).toString(2).padStart(2, '0');;
        let version = "0000";
        let stage = "101";
        let index = "0".padStart(7, "0");;
        let attribute = Math.floor(Math.random() * 4).toString(2).padStart(2, '0');
        let shot_s = "0".padStart(6, '0'); 
        let shot_w = "0".padStart(6, '0');
        let shot_m = "0".padStart(5, '0');
        let hp = Math.floor(22 + Math.random() * 10).toString(2).padStart(5, '0');
        let buff = "10";
        let power = Math.floor(150 + Math.random() * 70).toString(2).padStart(8, '0');
        let hits = "11111";

        let packets = new Array(6);
        packets[0] = order + level + sick + attack + version + this.eol;
        packets[1] = stage + index + attribute + this.eol;
        packets[2] = shot_s + shot_w + this.eol;
        packets[3] = "00" + hp + shot_m + this.eol;
        packets[4] = "00" + buff + power + this.eol;
        packets[5] = "0000" + "000" + hits + this.eol;

        let packetsHex = new Array();
        for (let i = 0; i < packets.length; i++) {
            console.log(packets[i])
            packetsHex.push(parseInt(packets[i], 2).toString(16).toUpperCase().padStart(4, '0'));
        }
        packetsHex[5] = '@8^1^FE';

        return this.head + packetsHex.join('-');
    }
}