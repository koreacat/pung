import { el } from "../../util/index.js";

function Input({$target, id, type}) {
    this.$el = el('input');

    const init = () => {
        this.$el.id = id;
        this.$el.type = type;
    }

    const render = () => {
        $target.appendChild(this.$el);
    }

    init();
    render();    
}

export default Input;