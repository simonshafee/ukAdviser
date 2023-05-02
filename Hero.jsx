import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const API_KEY = "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";

const Hero = () => {
    const [messages, setMessages] = useState([
        {
            message: "Hello I am Adviser, How can I help you?",
            sender: "ChatGPT",
        },
    ]);
    const [text, setText] = useState([
        {
            name: "",
        },
    ]);

    const handeltext = (e) => {
        const { name, value } = e.target;
        setText({ ...text, [name]: value });


    };

    const handelSub = async (message,e) => {
        e.preventDefault()
        // setMessages([...messages, {message: text.text}])
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing",
        };
        const newMessages = [...messages, newMessage];

        setMessages(newMessages);

        // await processMessageChatToGPT(newMessages);
    };

    async function processMessageChatToGPT(chatMessages) {
        // chatMessages { sender : "user" or "ChatGPT", message: "The message content here"}
        // apiMessages { role: "user" or "assistant", content: "The message content here"}

        let apiMessages = chatMessages.map((messageOBJ) => {
            let role = "";
            if (messageOBJ.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageOBJ.message };
        });

        // role: "user" -> a message from the user , "assistant" ->  a response from ChatGPT
        // role: "system" -> generally one initial message definig how we want chat gpt to talk

        const systemMessage = {
            role: "system",
            content: "Explain all concepts  like i am 10 years old.", // speak like a pirate, Expain like i am a 10 years of exprience software engineer
        };

        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                systemMessage,
                ...apiMessages, // [message1, message2 , message3]
            ],
        };

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: "Bearer" + API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log(data);
                console.log(data.error.message);
                setMessages([
                    ...chatMessages,
                    {
                        message: data.choices[0].message.content,
                        sender: "ChatGPT",
                    },
                ]);
                setIsTyping(false);
            });
    }

    return (
        <div className="flex  h-screen items-center justify-center bg-gray-200 ">
            <div
                className=" bg-gray-900 w-3/12 h-full p-2
         rounded-sm flex justify-center  items-start   "
            >
                <button
                    className=" text-white  h-[10%] w-full
           justify-center items-center flex  border-spacing-1 
            border border-white rounded-md  mt-14 "
                >
                    + New chat
                </button>
                <div></div>
            </div>

            <div
                className=" bg-gray-800  w-8/12  h-full  rounded-sm
         flex flex-col justify-center  items-center
        "
            >
                <div>
                    <h1 className=" text-white text-2xl mt-16 w-full h-2/6  ">
                        My Advisor
                    </h1>
                </div>
                <div
                    className="  w-4/5 rounded-md mt-5  h-full flex justify-start   bg-slate-600
             text-white flex-col  items-center
          "
                >
                    {messages.map((message, i) => (
                        <div key={i} className=" ">{message.message}</div>
                    ))}
                </div>

                <div className=" text-white rounded-md  w-full h-1/6 flex justify-center items-center ">
                    <form className="w-10/12 rounded-md 
                    flex justify-center items-center "
                    onSubmit={handelSub(text[0].value)}
                    >
                        <input
                            type="text"
                            className=" w-4/6 h-[40px] rounded-md text-black"
                            placeholder="...سوالت رو اینجا بنویس"
                            value={text.name}
                            onChange={handeltext}
                            name="text"
                        />

                        <button
                            type="submit"
                            className=" bg-red-500 rounded-md w-1/6 h-[40px]"

                        >
                            Sub
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Hero;
