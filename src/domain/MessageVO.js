export default class MessageVO {
    constructor({sn, text, createdDate, time}) {
        this.sn = sn;
        this.text = text;
        this.createdDate = createdDate;
        this.time = Number(time);
    }

    setTime = (time) => {
        if(time >= Math.max) {
            this.time = Math.max;
            return;
        }
        
        this.time = time;
    }
}