const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

// função para normalizar a porta em que aplicação será exposta
// (?) não tem um padrão de tipagem na resposta do método
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

// handler de erros 
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;

    switch(error.code){
        case 'EACCES':
            console.error(bind + ' ta sem moral, precisa de mais patente para isso'); //requires elevated privileges
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind + ' ja esta sendo usado, papai'); //is already in use
            process.exit(1);
            break;
            
        default:
            throw error;    
    }

}

function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on' + bind);
}

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(`API esta rodando na ${port}!`)
