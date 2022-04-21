import axios from "axios";
import { useRef, useState } from "react";
import formatter from "html-formatter";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  const urlInput = useRef(null);
  const htmlScraped = useRef(null);

  const [copy, setCopy] = useState(null);
  const [textToCopy, setTextToCopy] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = urlInput.current.value;
    axios
      .get(url)
      .then((res) => {
        htmlScraped.current.value = formatter.render(res.data);
        setTextToCopy(htmlScraped.current.value);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="bg-slate-500 p-5">
        <h1 className="text-white font-bold text-3xl">HTML Web Scraper</h1>
      </header>

      <div className="container max-w-4xl m-auto py-7">
        <form className="flex justify-center mb-8" onSubmit={handleSubmit}>
          <label
            className="bg-slate-300 border border-gray-400 rounded-tl-md rounded-bl-md py-2 px-6 text-gray-700"
            htmlFor="url-input"
          >
            URL
          </label>
          <input
            className="flex-1 py-2 px-6 border border-l-0 border-r-0 border-gray-400 outline-none"
            type="text"
            ref={urlInput}
            id="url-input"
            placeholder="Enter Website Link here..."
          />
          <button className="bg-white border border-gray-400 rounded-tr-md rounded-br-md py-2 px-6 text-gray-700 hover:bg-slate-200 font-semibold">
            SCRAP!
          </button>
        </form>

        <div className="htmlOutput relative">
          <textarea
            className="w-full bg-white border border-gray-400 rounded-md p-5 text-gray-700 outline-none h-full"
            name="scraped-html"
            id="scraped-html"
            rows="15"
            placeholder="HTML Code Scraped Here"
            ref={htmlScraped}
            disabled
          ></textarea>

          <CopyToClipboard
            text={textToCopy}
            onCopy={() => {
              setCopy(true);
              toast("Text Copied!");
            }}
            className="absolute bottom-0 right-0 m-5 bg-gray-200 p-5 hover:bg-gray-300"
          >
            <button>Copy to clipboard</button>
          </CopyToClipboard>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
