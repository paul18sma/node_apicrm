import app from './app';

function start(){
    app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

start();