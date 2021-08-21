import { $, getRelocationIndex, getRemainingTime } from "../../util/index.js";

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

export default class ListSelectWrap {

    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        this.render();
        this.addEvent();
    }

    addTime = () => {
        const { messageVO, messageStore } = this.$props;
        const { messageList } = messageStore;
        const { sn, time, setTime } = messageVO;
        const value = $(`[data-add-select='${sn}']`)[0].value;

        if (value[0] === '*') {
            const remainingTime = getRemainingTime(messageVO);
            setTime(time + (Number(value.substr(1)) * remainingTime - remainingTime));
        } else {
            setTime(time + Number(value));
        }

        let index = getRelocationIndex({ messageVO, messageList });
        $('.messageList')[0].insertBefore(this.$target, $(`[data-list-sn]`)[index]);
    }

    subTime = () => {
        const { messageVO, messageStore } = this.$props;
        const { messageList, deleteMessage } = messageStore;
        const { sn, time, setTime } = messageVO;
        const value = $(`[data-sub-select='${sn}']`)[0].value;

        if (time - Number(value) <= 0) {
            deleteMessage(sn);
        } else {
            setTime(time - Number(value));
        }

        let index = getRelocationIndex({ messageVO, messageList });
        $('.messageList')[0].insertBefore(this.$target, $(`[data-list-sn]`)[index].nextSibling);
    }

    render() {
        this.$target.innerHTML += this.template();
    }

    template () {
        const { messageVO } = this.$props;
        const { sn } = messageVO;

        return `
            <select class='addSelect' data-add-select='${sn}'>
                ${addOptions.map((option) => {
                    const {value, contents} = option;
                    return `<option value='${value}'>${contents}</option>`
                })}
            </select>
            <button class='addTimeBtn' data-add-btn='${sn}'>시간 추가</button>
            <select class='subSelect' data-sub-select='${sn}'>
                ${subOptions.map((option) => {
                    const {value, contents} = option;
                    return `<option value='${value}'>${contents}</option>`
                })}
            </select>
            <button class='subTimeBtn' data-sub-btn='${sn}'>시간 감소</button>
            <button class='deleteBtn' data-delete-btn='${sn}'>삭제</button>
        `
    }

    addEvent() {
        const { messageVO, messageStore } = this.$props;
        const { deleteMessage } = messageStore;
        const sn = messageVO.sn;

        $(`[data-add-btn='${sn}']`)[0].addEventListener('click', () => {
            this.addTime();
        })

        $(`[data-sub-btn='${sn}']`)[0].addEventListener('click', () => {
            this.subTime();
        })

        $(`[data-delete-btn='${sn}']`)[0].addEventListener('click', () => {
            deleteMessage(sn);
        })
    }
}