import convict from 'convict';


const config = convict({
    darksky: {
        token: {
            doc:     'The Dark Sky API token.',
            default: '',
            format:  String,
            env:     'DARKSKY_API_TOKEN'
        },
        location: {
            doc: 'LAT,LON GPS Coordinates',
            default: '0,0',
            format: String,
            env: 'DARKSKY_LOCATION'
        }
    }
});


export default config;
