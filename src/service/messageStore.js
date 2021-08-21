import MessageVO from "../domain/MessageVO.js";
import MessageObserver from "./messageObserver.js";

function MessageStore() {
    this.snCount = 0;
    this.messageList = new Map();
    this.messageObserver = new MessageObserver();

    this.createMessage = ({ text, time }) => {
        const sn = this.snCount;
        const messageVO = new MessageVO({ sn, text, createdDate: new Date(), time });
        this.messageList.set(sn, messageVO);
        this.snCount += 1;
        this.messageObserver.ovserve(this.messageList);
        return messageVO;
    }

    this.deleteMessage = (sn) => {
        this.messageList.delete(sn);
    }
    
}

export default MessageStore;