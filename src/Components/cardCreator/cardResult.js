import FormInfo from "./forminfo";
const { Component } = require("react");

class CardResult extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div id="cardResult">
               <div class="text-center cleanbg" id="cardShower"><img src={this.props.card} id="card"/></div>
            </div>
        );
    }
}

export default CardResult;