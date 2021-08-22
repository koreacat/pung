import { getRemainingTime } from "../../util/index.js";
import Component from "../common/Component.js";

export default class Timer extends Component {

    render() {
        this.$target.innerHTML += this.template();
    }

    template() {
        const { messageVO } = this.$props;
        const { text, sn } = messageVO;
        const remainingTime = parseInt(getRemainingTime(messageVO));

        return `
            <div>
                <span>${text}</span>
                <span>남은 시간: </span>
                <span class='time' data-time-sn='${sn}'>${remainingTime}</span>
            </div>
        `
    }
}
