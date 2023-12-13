
// const crypto = require('crypto');
const { join } = require("path");
const XLSX = require("xlsx");

// fastify.register(require('fastify-cors'));

async function routes(fastify,options){
    const workbook = XLSX.readFile('data/monthlysheet.xlsx')

// function generateSecretKey() {
//   return crypto.randomBytes(32).toString('hex');
// }

// const secretKey = generateSecretKey();
// console.log('Generated Secret Key:', secretKey);

    
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
   
    // const dataToEncrypt = Array.isArray(jsonData) ? JSON.stringify(jsonData) : jsonData;
    // const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    // let encrypted = cipher.update(dataToEncrypt, 'utf-8', 'hex');
    // encrypted += cipher.final('hex');
    // console.log(encrypted)
    fastify.get('/', async (req,res)=>{
        res.send(
            jsonData
        )
    })

    fastify.post("/insert-field",async (req,res)=>{
        console.log("ok")
       
        try{
            const { fieldName, fieldValue } = req.body;

    // Add the new field and value to each object in the array
            jsonData.forEach((item) => {
            item[fieldName] = fieldValue;
           });

           console.log(jsonData)
           res.send(jsonData)
            return { success: true, message: 'Field added successfully', data: jsonData }
        }
        catch (error) {
            console.error(error);
            res.code(500).send({ success: false, message: 'Internal Server Error' });
          }
    
    })
}

module.exports = routes