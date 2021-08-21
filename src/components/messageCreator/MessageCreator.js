import { $ } from "../../util/index.js";
import Component from "../common/Component.js";
import Message from "../message/Message.js";

const timeOptions = [
    { value: '3', contents: '3초' },
    { value: '5', contents: '5초' },
    { value: '10', contents: '10초' },
    { value: '30', contents: '30초' },
    { value: '60', contents: '1분' },
]

export default class MessageCreator extends Component {
    template() {
        return `
            <span>메세지</span>
            <input type='text' class='messageInput'>
            <span>시간</span>
            <select class='timeSelect'>
                ${timeOptions.map((option) => {
                    const {value, contents} = option;
                    return `<option value='${value}'>${contents}</option>`
                })}
            </select>
            <button class='createBtn'>추가</button>
        `
    }

    setEvent() {
        this.addEvent('click', '.createBtn', () => {
            this.handleCreate()
        });
    }

    handleCreate = () => {
        const { messageStore } = this.$props;
        const $messageInput = $('.messageInput')[0];
        const text = $messageInput.value;
        const time = $('.timeSelect')[0].value;

        if (!text || text.length < 3) {
            alert('최소 3글자 이상 입력해주세요.');
            return;
        }
        
        new Message($('.messageList')[0], { messageStore, text, time });
        $messageInput.value = null;
    }

}
