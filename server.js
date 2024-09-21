const express=require('express')
const {exec}=require('child_process')
const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.json())

app.post('/open',(req,res) =>{
    const { command }= req.body;

    let appCommand='';

    switch(command.toLowerCase()){
        case 'paint.':
            appCommand='mspaint';
            break;
            case 'file manager.':
                appCommand='explorer';
                break;
                case 'notepad.':
                appCommand='notepad';
                break;
                case 'calculator.':
                appCommand='calc';
                break;
                case 'cmd.':
                appCommand='start cmd';
                break;
                case 'chrome.':
                appCommand='start chrome';
                break;
            default:
                return res.status(400).send(`Command ${command} not found`)
    }

    exec(appCommand,(error) =>{
        if(error){
            return res.status(500).send('Faild to open')
        }
        res.status(200).send(`Command ${command} executed successfully`)
    })

})









const PORT=5000;
app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
})