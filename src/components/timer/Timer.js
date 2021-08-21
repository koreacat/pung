import { el, getRemainingTime } from "../../util/index.js";

function Timer({ $target, messageVO }) {
    this.$el = el('div');
    const { text, sn } = messageVO;
    const remainingTime = parseInt(getRemainingTime(messageVO));

    const init = () => {
        this.$el.innerHTML = `
            <div>
                <span>${text}</span>
                <span>남은 시간: </span>
                <span class='time' data-time-sn='${sn}'>${remainingTime}</span>
            </div>
        `;
    }

    const render = () => {
        $target.appendChild(this.$el);
    }

    init();
    render();
}

export default Timer;