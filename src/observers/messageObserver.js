import { getRemainingTime } from "../util/index.js";

function MessageObserver() {
    this.interval = null;

    this.deleteMessageEl = (sn) => {
        const $messageList = document.querySelector('.messageList');
        const $listItems = $messageList.childNodes;

        $listItems.forEach(($item) => {
            if (Number($item.dataset.sn) === sn) $item.remove();
        })
    }

    this.updateTimeEl = (messageList) => {
        const $times = document.querySelectorAll('.time');

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

    this.observe = (messageList) => {
        if (messageList.size > 0 && !this.interval) {
            console.log('start observe');

            this.interval = setInterval(() => {
                console.log('observing');
                this.updateTimeEl(messageList);
                if (messageList.size <= 0 && this.interval) this.stopObserve();
            }, 100);
        }
    }

    this.stopObserve = () => {
        console.log('stop observe');
        clearInterval(this.interval);
        this.interval = null;
    }
}

export default MessageObserver;
