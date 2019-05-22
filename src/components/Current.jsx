import React, { Component } from 'react';
import reactMixin           from 'react-mixin';    // to be able to use Mixins on es6 classes
import { ListenerMixin }    from 'reflux';         // see https://github.com/reflux/refluxjs#convenience-mixin-for-react
import Mozaik               from 'mozaik/browser'; // Mozaïk browser utilities

class Current extends Component {
    // we extend the constructor to set a default state
    constructor(props) {
        super(props);

        this.state = { current: null };
    }

    // Before the component is mounted, the mixin will search for this method on the component.
    // This method MUST return an object with an `id` property.
    // It tells Mozaïk that this component is interested in data coming from `sample` generated with `sampleMethod`
    // The `id` MUST be unique across all Mozaïk extensions.
    getApiRequest() {
        const { user } = this.props;

        return { id: 'darksky.current' };
    }

    // This method is automatically invoked each time the `sample.sampleMethod` has fetched some data.
    // This assumes your method will return an object containing a `count` property.
    onApiData(current) {
        this.setState({current});
        console.log(data);
    }

    render() {

        return (
            <div>
                {current.icon}
                {current.temperature}
            </div>
        );
    }
}

// apply the mixins on the component
reactMixin(Current.prototype, ListenerMixin);
reactMixin(Current.prototype, Mozaik.Mixin.ApiConsumer);

export default Current;
