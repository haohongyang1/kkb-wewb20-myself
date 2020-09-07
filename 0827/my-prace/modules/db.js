/**
 * 
 */
const conf = require("./conf")
// 异步过程控制与连接：连接数据后，再插入表、数据等等，多个异步任务的控制
const {EventEmitter} = require("events")
// 定义客户端
const {MongoClient} = require("mongodb")
class Mongodb {
    constructor() {
        this.conf = conf
        this.emmiter = new EventEmitter()
        // 进行数据库连接
        this.client = new MongoClient(conf.url, {useNewUrlParser})
        this.client.connect(err => {
            if (err) throw err
            console.log("连接成功")
            this.emmiter.emit("connect")
        })
        // 
    }
    // col('abc') => 返回abc的集合
    col(colName,dbName = conf.dbName) {
        return this.client.db(dbName).collection(colName)
    }
    //
    once (event, cb) {
        this.emmiter.once(event,cb)
    }
}
module.exports = Mongodb