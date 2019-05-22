import request from 'superagent-bluebird-promise';
import Promise from 'bluebird'; // use bluebird for simplicity, you should also use a Promise polyfill
import config  from './config';
import _       from 'lodash';
import chalk   from 'chalk';
// When Mozaïk instantiates a client, it pass the mozaik instance to it,
// it's usefull to use the builtin Mozaïk logger for example.
// This function MUST return an object whose keys correspond to all available operations.
const client = mozaik => {

    const buildApiRequest = (path, params) => {
        const token = config.get('darksky.token');
        const location = config.get('darksky.location');
        const baseURL = 'https://api.darksky.net/forecast/';
        const req = request.get('${baseURL}/${token}/$location');

        const paramsDebug = params ? ` ${JSON.stringify(params)}` : '';
        mozaik.logger.info(chalk.yellow(`[DarkSky] calling ${baseURL}${token}/${location}${paramsDebug}`));

        if (params) {
            req.query(params);
        }

        return req.promise();
    };

    return {
        current(params) {
            return buildApiRequest('/')
                .then(res => res.body);
        },
    };
};

export default client;
