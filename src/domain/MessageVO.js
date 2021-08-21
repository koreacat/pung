function MessageVO({sn, text, createdDate, time}) {
    this.sn = sn;
    this.text = text;
    this.createdDate = createdDate;
    this.time = time;

    this.setTime = (time) => {
        if(time >= Math.max) {
            this.time = Math.max;
            return;
        }
        
        this.time = time;
    }
}

export default MessageVO;