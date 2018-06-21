import React, {Component} from 'react';
import axios from 'axios';

export default class YourEvents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yourEvents: []
        }
    }

componentDidMount() {
    axios.get(`/api/getUserEvents/${this.props.match.params.user_id}`)
        .then(res => {
            this.setState({
                yourEvents: res.data
            })
        })
}

    render() {
        let mappedEvents = this.state.yourEvents.map((event, i) => {
            return (
                <div key={i}>
                    <h3>{event.event_name}</h3>
                </div> 
            )
        })
        return (
            <div>
                <h1>YourEvents</h1>
                {mappedEvents}
            </div> 
        )
    }
}