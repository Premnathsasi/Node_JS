const fs = require('fs');
const path = require('path')

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductFromFile = cb => {
    fs.readFile(p, (err, data) => {
        if (err) {
            cb([]);
        }
        cb(JSON.parse(data))
    })
}

module.exports = class Product {
    constructor(t) {
        this.title = t
    }

    save() {
        fs.readFile(p, (err, data) => {
            getProductFromFile(products => {
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err)
                })
            })

        })
    }

    static fetchAll(cb) {
        getProductFromFile(cb)

    }
}