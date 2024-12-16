// 引入所需的套件
const express = require('express');
const cors = require('cors');
const { MongoClient,ObjectId } = require('mongodb');
const app = express();
// const port = 27017;

const port=3001;

// Use CORS middleware
// app.use(cors({ 
//   origin:[ 'http://localhost:27017'],  
//   origin:'*',  
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));


app.use(cors());



// 設定 MongoDB Atlas 連接字串
const uri = 'mongodb+srv://zwx:Zwx890829!@zwx.jmu0b.mongodb.net/'; 

// MongoDB 連接函數
async function connectToDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const database = client.db('CodeGenerator'); 
    const templatesCollection = database.collection('templates');
    return templatesCollection;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
}

// 查詢所有模板資料的 API 
app.get('/api/templates', async (req, res) => {
  try {
    const templatesCollection = await connectToDatabase();
    const templates = await templatesCollection.find({}).toArray();
    res.status(200).json(templates);
  } catch (error) {
    console.error('Error fetching templates', error);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

// 查詢特定模板資料的 API
app.get('/api/templates/templatename/:templateName', async (req, res) => {
  try {
    const templatesCollection = await connectToDatabase();
    const { templateName } = req.params;
    const template = await templatesCollection.findOne({ template_name: templateName });

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.status(200).json(template);
  } catch (error) {
    console.error('Error fetching template', error);
    res.status(500).json({ error: 'Failed to fetch template' });
  }
});


// 根據 custom_id 查詢模板資料
app.get('/api/templates/custom_id/:custom_id', async (req, res) => {
  try {
    const custom_id = parseInt(req.params.custom_id); // 將 custom_id 字串轉換為整數

    // 構造查詢條件
    const templatesCollection = await connectToDatabase();
    const template = await templatesCollection.findOne({ custom_id });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.status(200).json(template);
  } catch (error) {
    console.error('Error fetching template', error);
    res.status(500).json({ error: 'Failed to fetch template' });
  }
});




// 啟動伺服器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
