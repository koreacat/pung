import { el } from "../../util/index.js";

function Title({$target, name}) {
    this.$el = el('h1');

    const init = () => {
        this.$el.innerHTML = name;
    }

    const render = () => {
        $target.appendChild(this.$el);
    }

    init();
    render();
}

export default Title;