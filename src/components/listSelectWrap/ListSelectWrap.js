import { $, el, getRelocationIndex, getRemainingTime } from "../../util/index.js";
import Button from "../common/Button.js";
import Select from "../common/Select.js";

const addOptions = [
    { value: '3', text: '3초' },
    { value: '5', text: '5초' },
    { value: '*2', text: '2배' },
    { value: '*3', text: '3배' },
]

const subOptions = [
    { value: 3, text: '3초' },
    { value: 5, text: '5초' },
]

function ListSelectWrap({ $target, messageVO, messageStore }) {
    this.$el = el('div');
    const { messageList, deleteMessage } = messageStore;
    let addSelectorRef = null;
    let subSelectorRef = null;

    const addTime = () => {
        const time = Number(messageVO.time);
        const value = addSelectorRef.$el.value;

        if (value[0] === '*') {
            const remainingTime = getRemainingTime(messageVO);
            messageVO.setTime(time + (Number(value.substr(1)) * remainingTime - remainingTime));
        } else {
            messageVO.setTime(time + Number(value));
        }

        let index = getRelocationIndex({ messageVO, messageList });
        $('#messageList').insertBefore($target, $(`[data-sn]`)[index]);
    }

    const subTime = () => {
        const time = Number(messageVO.time);
        const value = subSelectorRef.$el.value;

        if (messageVO.time - Number(value) <= 0) {
            deleteMessage(messageVO.sn);
        } else {
            messageVO.setTime(time - Number(value));
        }

        let index = getRelocationIndex({ messageVO, messageList });
        $('#messageList').insertBefore($target, $(`[data-sn]`)[index].nextSibling);
    }

    const init = () => { }

    const render = () => {
        addSelectorRef = new Select({ $target: this.$el, options: addOptions, id: 'addSelect' });
        new Button({ $target: this.$el, name: '시간 추가', onClickHandle: addTime });
        subSelectorRef = new Select({ $target: this.$el, options: subOptions, id: 'subSelect' });
        new Button({ $target: this.$el, name: '시간 감소', onClickHandle: subTime });
        new Button({ $target: this.$el, name: '삭제', onClickHandle: () => deleteMessage(messageVO.sn) });
        $target.appendChild(this.$el);
    }

    init();
    render();
}

export default ListSelectWrap;