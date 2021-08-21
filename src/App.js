import MessageStore from './service/messageStore.js';
import Title from './components/title/Title.js';
import MessageCreator from './components/messageCreator/MessageCreator.js';
import MessageList from './components/messageList/MessageList.js';

function App($app) {
    const init = () => {
        const messageStore = new MessageStore();
        new Title({$target: $app, name: '펑 리스트'});
        new MessageCreator({$target: $app, messageStore});
        new MessageList({$target: $app});
    }

    init();
}

export default App;