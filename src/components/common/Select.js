import { el } from "../../util/index.js";

function Select({$target, options, id}) {
    this.$el = el('select');

    const init = () => {
        this.$el.id = id;
        this.$el.innerHTML = options.map((option) => {
            const {value, text} = option;
            return `<option value='${value}'>${text}</option>`
        }).join('');
    }

    const render = () => {
        $target.appendChild(this.$el);
    }
   
    init();
    render(); 
}

export default Select;