const express = require('express');
const fs = require('fs');


const app = express();

app.use(express.json());

let resultFromFile,listOfOrders = [],objectOfList = {},orders = [];

//red from file
resultFromFile = fs.readFileSync(`${__dirname}/orders.txt`, 'utf-8')

//split from ,
let splitResultFromFile = resultFromFile.split(',')

//split from \n
for(let i=0;i<splitResultFromFile.length;i++){
    listOfOrders.push(splitResultFromFile[i].split('\n'))
}

// to remove \r and ''
for(let i=0;i<listOfOrders.length;i++){
    for (let j=0;j<listOfOrders[i].length;j++) {
        if(listOfOrders[i][j] === '')
        listOfOrders[i][j] = listOfOrders[i][j].replace(listOfOrders[i][j],'\r') 
    }
    
    listOfOrders[i] = listOfOrders[i].filter(ele => {
        return !ele.startsWith('\r') 
    })
}

// add objects to the list orders
for(let i=0;i<listOfOrders.length;i++){
        objectOfList = {...listOfOrders[i]}
        orders.push(objectOfList)
}
console.log(orders)

app.get ('/', (req, res,) => {
    
    res.status(200).json({
        orders
    });
})


app.use('/', ordersRouter)
app.listen(3000,()=>{
    console.log('Connected Successfully...');
});
