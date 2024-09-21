import React, { useState } from 'react';
import axios from 'axios';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function App() {
    const [command, setCommand] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

  
    const songs = {
        'sahiba.': 'jBWKpN5cZIg',
        'song.':'VHgocXq76cM'
        
    };

    const startListening = () => {
        if (!SpeechRecognition) {
            alert('Your browser does not support Speech Recognition');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.start();

        recognition.onresult = (event) => {
            let speechResult = event.results[0][0].transcript;
            console.log('Recognized speech:', speechResult);
            speechResult = speechResult.toLowerCase(); // Convert to lowercase
            setCommand(speechResult);
            handleSubmit(speechResult);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition ended');
        };
    };

    const handleSubmit = async (cmd = command) => {
        const commandString = String(cmd).trim();
        if (!commandString) {
            return;
        }

        setResponse('');
        setLoading(true);
        try {
            if (commandString.startsWith('play')) {
                const songName = commandString.replace('play', '').trim();
                const songId = songs[songName]; 

                if (songId) {
                   
                    window.open(`https://www.youtube.com/watch?v=${songId}`, '_blank');
                    setResponse(`Playing ${songName}`);
                } else {
                    
                    console.log('Available songs:', Object.keys(songs));
                    setResponse(`Song '${songName}' not found.`);
                }
            } else {
                
                const res = await axios.post('http://localhost:5000/open', { command: commandString });
                setResponse(res.data);
            }
        } catch (error) {
            setResponse(error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="App">
            <h1>AI Voice Command Center</h1>
            <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Type command or use voice"
            />
            <button onClick={() => handleSubmit(command)} disabled={loading}>
                {loading ? 'Opening...' : 'Open'}
            </button>
            <button onClick={startListening}>
                🎙️ Speak Command
            </button>
            {response && <div id="response">{response}</div>}
        </div>
        <img src="ghost2.webp" className="ghost ghost1" alt="Ghost" />
        <img src="ghost2.webp" className="ghost ghost2" alt="Ghost" />
        <img src="ghost2.webp" className="ghost ghost3" alt="Ghost" />
        <img src="ghost2.webp" className="ghost ghost4" alt="Ghost" />
        <img src="ghost2.webp" className="ghost ghost5" alt="Ghost" />
        </>
    );
}

export default App;
