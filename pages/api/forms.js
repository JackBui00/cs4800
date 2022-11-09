import "csv-parser";


export default function handler(req, res) {
    const body = req.body
    console.log(typeof body)
    
    
    const csv = require('csv-parser');
    const fs = require('fs');
    
    fs.createReadStream('public/fireTestData.csv')
        .pipe(csv())
        .on('data', (row) => {
        
        console.log(row);
        //console.log(row)
        
        //console.log(row)
        //if(row.Date === body.Date & row.City === body.City){
        //    console.log(row)
        //}
        
    })
    .on('end', () => {
    
  });
    


    
    console.log(req.body); 
    
    
    //res.status(200).json({csvData})
    res.status(200).json({ data: `${body.City} ${body.Date} ${body.Humidity}` })

}