import { $, getRemainingTime } from "../util/index.js";

function MessageObserver() {
    this.interval = null;

    this.deleteMessageEl = (sn) => {
        const $messageList = $('.messageList')[0];
        const $listItems = $messageList.childNodes;
        $listItems.forEach(($item) => {
            if (Number($item.dataset.listSn) === sn) $item.remove();
        })
    }

    this.updateTimeEl = (messageList) => {
        const $times = $('.time');
        $times.forEach($time => {
            const sn = Number($time.dataset.timeSn);
            const messageVO = messageList.get(sn);
            if (!messageVO) {
                this.deleteMessageEl(sn);
                return;
            }

            const remainingTime = getRemainingTime(messageVO);
            if (remainingTime >= 0) {
                $time.innerHTML = parseInt(Math.ceil(remainingTime));
            } else {
                this.deleteMessageEl(sn);
                messageList.delete(sn);
            }
        });
    }

    this.ovserve = (messageList) => {
        if (messageList.size > 0 && !this.interval) {
            console.log('start ovserve');
            this.interval = setInterval(() => {
                console.log('ovserving');
                this.updateTimeEl(messageList);
                if (messageList.size <= 0 && this.interval) this.stopOvserve();
            }, 100);
        }
    }

    this.stopOvserve = () => {
        console.log('stop ovserve');
        clearInterval(this.interval);
        this.interval = null;
    }
}

export default MessageObserver;