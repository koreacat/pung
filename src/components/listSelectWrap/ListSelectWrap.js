import { getRelocationIndex, getRemainingTime } from "../../util/index.js";
import Component from "../common/Component.js";

const addOptions = [
    { value: '3', contents: '3초' },
    { value: '5', contents: '5초' },
    { value: '*2', contents: '2배' },
    { value: '*3', contents: '3배' },
]

const subOptions = [
    { value: 3, contents: '3초' },
    { value: 5, contents: '5초' },
]

export default class ListSelectWrap extends Component {

    handleAddTime() {
        const { messageVO, messageStore } = this.$props;
        const { messageList } = messageStore;
        const { time, setTime } = messageVO;
        const value = this.$target.querySelector('.addSelect').value;

        if (value[0] === '*') {
            const remainingTime = getRemainingTime(messageVO);
            setTime(time + (Number(value.substr(1)) * remainingTime - remainingTime));
        } else {
            setTime(time + Number(value));
        }

        let index = getRelocationIndex({ messageVO, messageList });
        document.querySelector('.messageList').insertBefore(this.$target, document.querySelectorAll(`[data-sn]`)[index]);
    }

    handleSubTime() {
        const { messageVO, messageStore } = this.$props;
        const { messageList, deleteMessage } = messageStore;
        const { sn, time, setTime } = messageVO;
        const value = this.$target.querySelector('.subSelect').value;

        if (time - Number(value) <= 0) {
            deleteMessage(sn);
        } else {
            setTime(time - Number(value));
        }

        let index = getRelocationIndex({ messageVO, messageList });
        document.querySelector('.messageList').insertBefore(this.$target, document.querySelectorAll(`[data-sn]`)[index].nextSibling);
    }

    render() {
        this.$target.innerHTML += this.template();
    }

    template() {
        return `
            <select class='addSelect'>
                ${addOptions.map(({ value, contents }) => {
                    return `<option value='${value}'>${contents}</option>`
                })}
            </select>
            <button class='addTimeBtn'>시간 추가</button>
            <select class='subSelect'>
                ${subOptions.map(({ value, contents }) => {
                    return `<option value='${value}'>${contents}</option>`
                })}
            </select>
            <button class='subTimeBtn'>시간 감소</button>
            <button class='deleteBtn'>삭제</button>
        `
    }

    setEvent() {
        const { messageVO, messageStore } = this.$props;
        const { deleteMessage } = messageStore;
        const sn = messageVO.sn;

        this.addEvent('click', '.addTimeBtn', () => {
            this.handleAddTime();
        });

        this.addEvent('click', '.subTimeBtn', () => {
            this.handleSubTime();
        });

        this.addEvent('click', '.deleteBtn', () => {
            deleteMessage(sn);
        });
    }
}