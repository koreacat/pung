import Component from './components/common/Component.js';
import MessageStore from './stores/messageStore.js';
import MessageObserver from './observers/messageObserver.js';
import Title from './components/title/Title.js';
import MessageCreator from './components/messageCreator/MessageCreator.js';
import MessageList from './components/messageList/MessageList.js';

export default class App extends Component {
    setup() {
        this.$state = {
            messageStore: new MessageStore(new MessageObserver())
        }
    }

    template() {
        return `
            <header class="header"></header>
            <div class="messageCreatorWrap"></div>
            <div class="messageListWrap"></div>
        `
    }

    mounted() {
        const {messageStore} = this.$state;
        const $header = this.$target.querySelector('.header');
        const $messageCreator = this.$target.querySelector('.messageCreatorWrap');
        const $messageList = this.$target.querySelector('.messageListWrap');
        new Title($header, {contents: '펑 리스트'});
        new MessageCreator($messageCreator, {messageStore: messageStore});
        new MessageList($messageList, {});
    }

}
