import React, {Component, PropTypes} from 'react';
import reactMixin from 'react-mixin';    // to be able to use Mixins on es6 classes
import {ListenerMixin} from 'reflux';         // see https://github.com/reflux/refluxjs#convenience-mixin-for-react
import _ from 'lodash';
import Mozaik from 'mozaik/browser'; // Mozaïk browser utilities

class RainGraph extends Component {
    // we extend the constructor to set a default state
    constructor(props) {
        super(props);

        this.state = {hourly: null};
    }

    // Before the component is mounted, the mixin will search for this method on the component.
    // This method MUST return an object with an `id` property.
    // It tells Mozaïk that this component is interested in data coming from `sample` generated with `sampleMethod`
    // The `id` MUST be unique across all Mozaïk extensions.
    getApiRequest() {
        const {hourly} = this.props;

        return {
            id: 'darksky.rain_graph',
            params: {hourly}
        };
    }

    // This method is automatically invoked each time the `sample.sampleMethod` has fetched some data.
    // This assumes your method will return an object containing a `count` property.
    onApiData(hourly) {
        this.setState({hourly});
    }

    render() {
        const {hourly} = this.state;


        // Sanity check to make sure bad requests don't kill the whole dashboard
        let content = null;
        console.log("minutely::", hourly);
        if (hourly) {

            let output = [];
            // Function for making an individual rain percentage bar.
            for (let i = 0; i < 60; i++) {
                if (hourly.minutely.data[i]) {
                    output.push(<div className="bar"
                                     style={{height: (this.state.hourly.minutely.data[i].precipProbability + '%')}}/>
                    );
                }
            }

            content = (
                <div className="chart">
                    {/*This is a hack to make the CSS reload*/}
                    {document.body.style.color = document.body.style.color}
                    {output}
                </div>
            );
        } else {
            content = (
                <div>
                    API Error
                </div>
            )
        }

        return (
            <span className="rain__graph__container">
                {content}
                <div className="label">
                    Rain over the hour
                </div>
            </span>
        );
    }
}

RainGraph.displayName = 'RainGraph';

// apply the mixins on the component
reactMixin(RainGraph.prototype, ListenerMixin);
reactMixin(RainGraph.prototype, Mozaik.Mixin.ApiConsumer);

export default RainGraph;
