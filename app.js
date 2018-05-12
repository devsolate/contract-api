const express = require('express');
const Constants = require('./src/constants');
const bodyParser = require('body-parser');
const ApiRouter = require('./src/router');
const chalk = require('chalk');
var cors = require('cors')

const app = express();

app.use(cors())
app.set('host', Constants.HOST || '0.0.0.0');
app.set('port', Constants.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', ApiRouter);

app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;