import { $, el } from "../../util/index.js";
import Button from "../common/Button.js";
import Input from "../common/Input.js";
import Select from "../common/Select.js";
import Message from "../message/Message.js";

const timeOptions = [
    { value: '3', text: '3초' },
    { value: '5', text: '5초' },
    { value: '10', text: '10초' },
    { value: '30', text: '30초' },
    { value: '60', text: '1분' },
]

function MessageCreator({$target, messageStore }) {
    this.$el = el('div');

    const handleCreate = () => {
        const $messageInput = $('#messageInput');
        const text = $messageInput.value;
        const time = $('#timeSelect').value;
        
        if (!text || text.length < 3) {
            alert('최소 3글자 이상 입력해주세요.');
            return;
        }

        new Message({ $target: $('#messageList'), messageStore, text, time });
        $messageInput.value = null;
    }

    const init = () => {}

    const render = () => {
        this.$el.innerHTML += `<span>메세지</span>`;
        new Input({ $target: this.$el, id: 'messageInput', type: 'text' });
        this.$el.innerHTML += `<span>시간</span>`;
        new Select({ $target: this.$el, options: timeOptions, id: 'timeSelect' });
        new Button({ $target: this.$el, name: '추가', onClickHandle: handleCreate });
        $target.appendChild(this.$el);
    }

    init();
    render();
}

export default MessageCreator;