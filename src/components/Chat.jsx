// // import  { useState, useEffect } from "react";
// // import * as tf from "@tensorflow/tfjs";
// // import { GPT2Tokenizer, GPT2LMHeadModel } from "transformers";

// // function Chat() {
// //   const [prompt, setPrompt] = useState("hey");
// //   const [generatedText, setGeneratedText] = useState("");

// //   useEffect(() => {
// //     async function generate() {
// //       // Load pre-trained tokenizer and model
// //       const tokenizer = await GPT2Tokenizer.fromPretrained("gpt2");
// //       const model = await GPT2LMHeadModel.fromPretrained("gpt2");

// //       // Tokenize the input text
// //       const input = tokenizer.encode(prompt);

// //       // Convert input to a tensor
// //       const inputTensor = tf.tensor(input, [1, input.length], "int32");

// //       // Generate text
// //       const outputTensor = await model.generate(inputTensor, {
// //         max_length: 50,
// //       });
// //       const output = outputTensor.arraySync()[0];
// //       const outputText = tokenizer.decode(output, { skipSpecialTokens: true });

// //       setGeneratedText(outputText);
// //     }

// //     if (prompt) {
// //       generate();
// //     }
// //   }, [prompt]);

// //   return (
// //     <div>
// //       <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
// //       <p>{generatedText}</p>
// //       {console.log(generatedText)}
// //     </div>
// //   );
// // }

// // export default Chat;
// import  { useState } from "react";
// import axios from "axios";

// const Chat = () => {
//   const [inputText, setInputText] = useState("");
//   const [outputText, setOutputText] = useState("");




//   const isBrowser = typeof window !== 'undefined';
//   if (!isBrowser) {
//     var process = { env: {} };
//   }


//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const handleGenerateClick = async () => {
//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/engines/davinci-codex/completions",
//         {
//           prompt: inputText,
//           max_tokens: 1024,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//           },
//         }
//       );

//       const generatedText = response.data.choices[0].text;
//       setOutputText(generatedText);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="input">Enter input text:</label>
//       <input type="text" id="input" value={inputText} onChange={handleInputChange} />
//       <button onClick={handleGenerateClick}>Generate</button>
//       {outputText && (
//         <div>
//           <label htmlFor="output">Output text:</label>
//           <textarea id="output" value={outputText} readOnly />
//           {console.log(outputText)}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;
// import { response } from 'express'
import {useState, useEffect} from 'react'



const Chat = () => {

    const [backend, setBackend] = useState([{}])

    useEffect(()=>{
        fetch("/api").then(
            response => response.json()
        ).than(
            data =>{
                setBackend(data)
            }
        )
    },[])
  return (
    <div>
        {(typeof backend.users === "undefined")? (
            <p>Loading...</p>
        ):(
            backend.users.map((user,index)=>(
                <div key={index}>
                    <p>{user}</p>
                </div>
            ))
        )}
    </div>
  )
}

export default Chat

