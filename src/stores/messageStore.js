import MessageVO from "../domain/MessageVO.js";

function MessageStore(messageObserver) {
    this.snCount = 0;
    this.messageList = new Map();

    this.createMessage = ({ text, time }) => {
        const sn = this.snCount++;
        const messageVO = new MessageVO({ sn, text, createdDate: new Date(), time });
        this.messageList.set(sn, messageVO);
        messageObserver.observe(this.messageList);
        return messageVO;
    }

    this.deleteMessage = (sn) => {
        this.messageList.delete(sn);
    }

}

export default MessageStore;
