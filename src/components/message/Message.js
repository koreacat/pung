import { $, el, getRelocationIndex } from "../../util/index.js";
import ListSelectWrap from "../listSelectWrap/ListSelectWrap.js";
import Timer from "../timer/Timer.js";

function Message({ $target, messageStore, text, time }) {
    this.$el = el('li');

    const { createMessage, messageList } = messageStore;
    const messageVO = createMessage({ text, time});

    const init = () => {
        this.$el.dataset.sn = messageVO.sn;
    }

    const render = () => {
        let index = getRelocationIndex({ messageVO, messageList });
        $target.insertBefore(this.$el, $(`[data-sn]`)[index]);
        new Timer({ $target: this.$el, messageVO: messageVO });
        new ListSelectWrap({ $target: this.$el, messageVO: messageVO, messageStore });
    }

    init();
    render();
}

export default Message;