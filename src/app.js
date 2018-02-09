const http =require('http')
const chalk = require('chalk')
const conf = require('./config/defaultConfig')
const path = require('path')
const route = require('./helper/route')
const openUrl = require('./helper/openUrl')

class Server {
    constructor (config) {
        this.conf = Object.assign({}, conf, config)
    }
    start () {
        const server = http.createServer((req, res) => {
            const url = req.url
            const filePath = path.join(this.conf.root, url)
            route(req, res, filePath, this.conf)
        })
        
        server.listen(this.conf.port, this.conf.postname, () => {
            const addr = `http://${this.conf.postname}:${this.conf.port}`
            openUrl(addr)
            console.log(`server start on ${chalk.green(addr)}`);
        })
    }
}

module.exports = Server