import Component from "../common/Component.js";

export default class Title extends Component {
    template() {
        const { contents } = this.$props;
        return `<h1>${contents}</h1>`;
    }

}