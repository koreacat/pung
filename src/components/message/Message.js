import {el, getRelocationIndex} from "../../util/index.js";
import Component from "../common/Component.js";
import ListSelectWrap from "../listSelectWrap/ListSelectWrap.js";
import Timer from "../timer/Timer.js";

export default class Message extends Component {

    render() {
        const {messageStore, text, time} = this.$props;
        const {createMessage, messageList} = messageStore;
        const messageVO = createMessage({text, time});
        const $el = el('li');
        $el.dataset.sn = messageVO.sn;

        let index = getRelocationIndex({messageVO, messageList});
        this.$target.insertBefore($el, document.querySelectorAll(`[data-sn]`)[index]);
        new Timer($el, {messageVO});
        new ListSelectWrap($el, {messageVO, messageStore});
    }

}
