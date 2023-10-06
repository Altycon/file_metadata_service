const multer = require('multer');

const express = require('express');
const cors = require('cors');

require('dotenv').config()

const upload = multer({ dest: 'uploads/' });
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (request, response) {
  response.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), async (request,response)=>{
  const file = request.file;

       response.json({
          name: file.originalname,
          type: file.mimetype,
          size: file.size
       });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
