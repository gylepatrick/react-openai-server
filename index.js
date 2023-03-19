import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

const app = express()

env.config()

app.use(cors())
app.use(bodyParser.json())

// configure openapi
const configuration = new Configuration({
    organization: "org-aAkBPvfy88r3bh0Q50GyluHY",
    apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(configuration)

// default route
app.get('/', (req, res) => {
   res.send("Hello world");
})

app.post('/', async (req, res) => {
    const {message} = req.body
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 2048,
            temperature: 0.5,

        })

        res.json({message: response.data.choices[0].text})
    } catch (error) {
        console.log(error)
        res.send(error).status(400)
    }
})


app.listen(5000, ()=> {
    console.log("Server Running ...");
})