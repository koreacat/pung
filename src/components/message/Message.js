import { $, el, getRelocationIndex } from "../../util/index.js";
import ListSelectWrap from "../listSelectWrap/ListSelectWrap.js";
import Timer from "../timer/Timer.js";

export default class Message {

    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        this.template();
    }

    template () {
        const $el = el('li');
        const { messageStore, text, time } = this.$props;
        const { createMessage, messageList } = messageStore;
        const messageVO = createMessage({ text, time});
        $el.dataset.listSn = messageVO.sn;

        let index = getRelocationIndex({ messageVO, messageList });
        this.$target.insertBefore($el, $(`[data-list-sn]`)[index]);
        new Timer( $el, { messageVO });
        new ListSelectWrap($el, { messageVO, messageStore });
    }

}
