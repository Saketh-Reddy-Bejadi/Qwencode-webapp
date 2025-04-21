import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import * as webllm from "@mlc-ai/web-llm";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Hero = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [copied, setCopied] = useState(false);

  const [engine, setEngine] = useState(null);
  useEffect(() => {
    const model = "Qwen2.5-Coder-0.5B-Instruct-q4f32_1-MLC";

    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.right = "20px";
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    popup.style.color = "white";
    popup.style.padding = "10px 20px";
    popup.style.borderRadius = "8px";
    popup.style.zIndex = "1000";

    let dots = 0;
    const maxDots = 3;
    popup.textContent = "Loading model";
    const intervalId = setInterval(() => {
      dots = (dots % maxDots) + 1;
      popup.textContent = "Loading model" + ".".repeat(dots);
    }, 500);

    popup.style.transition = "all 0.3s ease-in-out";
    document.body.appendChild(popup);

    webllm
      .CreateMLCEngine(model, {
        initProgressCallback: (initProgress) => {
          console.log(initProgress);
        },
      })
      .then((engine) => {
        clearInterval(intervalId);
        setEngine(engine);

        popup.textContent = "You are good to use the model!";
        setTimeout(() => {
          document.body.removeChild(popup);
        }, 2000);
      });
  }, []);

  const [isProcessing, setIsProcessing] = useState(false);

  const sendPromptToLLm = async () => {
    setIsProcessing(true);
    const newMessages = [
      ...messages,
      {
        role: "user",
        content: input,
      },
    ];
    setMessages(newMessages);
    setInput("");
    const response = await engine.chat.completions.create({
      messages: newMessages,
    });
    const reply = response.choices[0].message.content;
    setMessages([
      ...newMessages,
      {
        role: "assistant",
        content: reply,
      },
    ]);
    setIsProcessing(false);
  };

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
      <div className="xl:px-20 xl:w-9/12 w-full px-5 h-9/12 overflow-y-scroll flex flex-col">
        {messages.length === 1
          ? null
          : messages.map((msg, id) => (
              <div
                key={id}
                className={`bg-zinc-900 mb-5 xl:px-5 max-w-11/12 py-3 px-4 rounded-b-3xl transition-all duration-500 ease-in-out ${
                  msg.role === "user"
                    ? "text-right self-end rounded-l-3xl"
                    : "text-left self-start rounded-r-3xl"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      const copyToClipboard = async () => {
                        await navigator.clipboard.writeText(children);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      };

                      return !inline && match ? (
                        <div className="relative group">
                          <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-lg"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                          <button
                            onClick={copyToClipboard}
                            className="absolute top-2 right-2 px-2 py-1 text-sm bg-zinc-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copied ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      ) : (
                        <code
                          className="bg-zinc-700 text-zinc-300 px-1 rounded"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            ))}
        {isProcessing && (
          <div className="flex items-center mt-2 mb-5">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      <div className="w-11/12 h-2/12 flex justify-center items-center xl:gap-10 gap-5 transition-all duration-500 ease-in-out">
        <textarea
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim() !== "" && !isProcessing) {
              e.preventDefault();
              sendPromptToLLm();
            }
          }}
          className="border border-gray-600 rounded-xl w-10/12 h-10/12 focus:outline-0 resize-none p-3 transition-all duration-300 ease-in-out"
          placeholder="Ask Llama"
          value={input}
        />
        <button
          type="submit"
          disabled={input.trim() === "" || isProcessing}
          onClick={() => {
            if (input.trim() !== "" && !isProcessing) {
              sendPromptToLLm();
            }
          }}
          className="transition-all duration-300 ease-in-out"
        >
          <IoMdSend size={23} />
        </button>
      </div>
    </div>
  );
};
export default Hero;
