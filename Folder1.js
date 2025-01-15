// const fs = require ('fs');

// fs.writeFile('Aman.txt','hlo world' ,(err)=>
// {
//     if(err) throw err;
//     console.log("Data write succesfully")
// })

// const fs = require ('fs');

// fs.writeFile('Aman1.txt','hlo world' ,(err)=>
// {
//     if(err) throw err;
//     console.log("Data write succesfully")
// })

// const am = require('fs');
//   am.appendFile("Aman.txt",'file update successfully',(err)=>
// {
//     if(err) throw err;
//     console.log('file update succesfully');
// })


const fs = require ('fs');
fs.unlink('Aman1.txt' ,(err)=>
{
    if(err) throw err;
    console.log("Data delete succesfully")
})


// const fs = require('fs');

// fs.unlink('Aman1.txt', (err) => {
//     if (err) throw err;
//     console.log("File deleted successfully");
// });
