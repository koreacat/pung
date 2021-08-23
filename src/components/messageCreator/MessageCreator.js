import Component from "../common/Component.js";
import Message from "../message/Message.js";

const timeOptions = [
    {value: '3', contents: '3초'},
    {value: '5', contents: '5초'},
    {value: '10', contents: '10초'},
    {value: '30', contents: '30초'},
    {value: '60', contents: '1분'},
];

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

        this.addEvent('keyup', '.messageInput', ({key, target}) => {
            if (key !== 'Enter') return;
            this.handleCreate();
        });
    }

    handleCreate() {
        const {messageStore} = this.$props;
        const $messageInput = this.$target.querySelector('.messageInput');
        const text = $messageInput.value;
        const time = this.$target.querySelector('.timeSelect').value;

        if (!text || text.length < 3) {
            alert('최소 3글자 이상 입력해주세요.');
            throw new Error('최소 3글자 이상 입력해주세요.');
        }

        new Message(document.querySelector('.messageList'), {messageStore, text, time});
        $messageInput.value = null;
    }

}
