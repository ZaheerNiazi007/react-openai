import React from "react";
import { Configuration, OpenAIApi } from "openai";

import "./App.css";

function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = React.useState("");
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <main className="main d-flex align-items-center justify-content-center">
      <div className="w-2/4 mx-auto text-center">
        <div className="form-group">
          <textarea
            className="form-control"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write your prompt"
          ></textarea>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleClick}
          disabled={loading || prompt.length === 0}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        <div class="text-center mw-30">{result} </div>
      </div>
    </main>
  );
}

export default App;
