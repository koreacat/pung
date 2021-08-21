import { el } from "../../util/index.js";

function Button({$target, name, onClickHandle}){
    this.$el = el('button');

    const init = () => {
        this.$el.innerHTML = name;
        this.$el.addEventListener('click', (e) => {
            onClickHandle();
        })
    }
    
    const render = () => {
        $target.appendChild(this.$el);
    }

    init();
    render();
}

export default Button;