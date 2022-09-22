const express = require('express');
const fs = require('fs');


const app = express();

app.use(express.json());

let resultFromFile, listOfOrders = [], orders = [];

//red from file
resultFromFile = fs.readFileSync(`${__dirname}/orders.txt`, 'utf-8')

//split from ,
let splitResultFromFile = resultFromFile.split(',')

//split from \n
for (let i = 0; i < splitResultFromFile.length; i++) {
    listOfOrders.push(splitResultFromFile[i].split('\n'))
}

for (let i = 0; i < listOfOrders.length; i++) {
    for (let j = 0; j < listOfOrders[i].length; j++) {
        if (listOfOrders[i][j] === '')
            listOfOrders[i][j] = listOfOrders[i][j].replace(listOfOrders[i][j], '\r')
    }
    listOfOrders[i] = listOfOrders[i].filter(ele => {
        return !ele.startsWith('\r')
    })
}
/////////////////////////////////////////////////////
let objectOfList = new Object(),total = 0;

for (let i = 0; i < listOfOrders.length; i++) {
    objectOfList.name = listOfOrders[i][0];
    let [latitude, longitude] = listOfOrders[i][1].split(' ')
    objectOfList.address = { latitude, longitude }
    objectOfList.items = []
    for (let j = 0; j < listOfOrders[i][2]; j ++) {
        let [name, count, price, total] = listOfOrders[i][3 + j].split (' ');
        objectOfList.items.push ({ name, count, price, total});
    }
    let [totals , discount, totalAfterDiscount] = listOfOrders[i][listOfOrders[i].length -1 ].split (' ');
    objectOfList.total = totals;
    objectOfList.discount = discount;
    objectOfList.totalAfterDiscount = totalAfterDiscount;
    total += +totalAfterDiscount
    console.log()
    orders.push (objectOfList)
}

app.get('/orders', (req, res,) => {

    res.status(200).json({
        orders,
        total
    });
})



app.listen(3000, () => {
    console.log('Connected Successfully...');
});
