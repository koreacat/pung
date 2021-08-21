import { el } from "../../util/index.js";

function MessageList({ $target }) {
    this.$el = el('ul');

    const init = () => {
        this.$el.id = ('messageList');
    }
    
    const render = () => {
        $target.appendChild(this.$el);
    }

    init();
    render();
}

export default MessageList;