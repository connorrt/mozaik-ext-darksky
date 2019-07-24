import React, {Component, PropTypes} from 'react';
import reactMixin from 'react-mixin';    // to be able to use Mixins on es6 classes
import {ListenerMixin} from 'reflux';         // see https://github.com/reflux/refluxjs#convenience-mixin-for-react
import _ from 'lodash';
import Mozaik from 'mozaik/browser'; // Mozaïk browser utilities

class Current extends Component {
    // we extend the constructor to set a default state
    constructor(props) {
        super(props);

        this.state = {currently: null};
    }

    // Before the component is mounted, the mixin will search for this method on the component.
    // This method MUST return an object with an `id` property.
    // It tells Mozaïk that this component is interested in data coming from `sample` generated with `sampleMethod`
    // The `id` MUST be unique across all Mozaïk extensions.
    getApiRequest() {
        const {currently} = this.props;

        return {
            id: 'darksky.currently',
            params: {currently}
        };
    }

    // This method is automatically invoked each time the `sample.sampleMethod` has fetched some data.
    // This assumes your method will return an object containing a `count` property.
    onApiData(currently) {
        this.setState({currently});
    }

    render() {
        const {currently} = this.props;
        let icon = "👽";

        // Sanity check to make sure bad requests don't kill the whole dashboard
        let content = null;
        console.log("this.state.currently::", this.state.currently);
        if (this.state.currently) {
            switch (this.state.currently.currently.icon) {
                case "clear-day":
                    icon = "☀️";
                    break;
                case "clear-night":
                    icon = "🌙";
                    break;
                case "rain":
                    icon = "🌧️";
                    break;
                case "snow":
                    icon = "🌨️";
                    break;
                case "sleet":
                    icon = "🌧️❄️";
                    break;
                case "wind":
                    icon = "💨";
                    break;
                case "fog":
                    icon = "🌁";
                    break;
                case "cloudy":
                    icon = "☁️";
                    break;
                case "partly-cloudy-day":
                    icon = "⛅";
                    break;
                case "partly-cloudy-night":
                    icon = "🌙☁️";
            }
            content = (
                <div className="current__container">
                        <span className="temperature">
                            {this.state.currently.currently.temperature.toFixed()}°
                        </span>
                    <span className="icon">
                            <p>{icon}️</p>
                    </span>
                    <div className="summary">
                        {this.state.currently.currently.summary}
                    </div>
                </div>
            );
        } else {
            content = (
                <div>
                    API Error {icon}
                </div>
            )
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

Current.displayName = 'Current';

// apply the mixins on the component
reactMixin(Current.prototype, ListenerMixin);
reactMixin(Current.prototype, Mozaik.Mixin.ApiConsumer);

export default Current;
