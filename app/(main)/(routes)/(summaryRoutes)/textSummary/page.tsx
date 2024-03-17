"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Summarizer = () => {
  const [text, setText] = useState("//Write your text here");
  const [orgText, setOrgText] = useState("//Get short summary ");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCompute = async () => {
    try {
      const axios = require("axios");

      const response = await axios.request({
        method: "POST",
        url: "https://open-ai21.p.rapidapi.com/summary",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "16c576e9b6msh151b4015899ff59p121a0fjsn7980dc6904b1",
          "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
        },
        data: {
          text: `${text}`,
        },
      });
      console.log(response.data);
      setOrgText(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col h-screen p-1">
      <h1 className="flex justify-center items-center text-xl font-semibold">
        Text Summarizer
      </h1>
      <div className="flex-1 flex gap-1">
        <div className="flex-1 ">
          <h1 className="flex items-center justify-center text-lg  font-semibold">
            Your Text
          </h1>
          <Textarea
            value={text}
            className="h-full"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex-1 ">
          <h1 className="flex items-center justify-center text-lg  font-semibold">
            Summarized Text
          </h1>
          <Textarea
            value={orgText}
            className="h-full"
            onChange={(e) => setOrgText(e.target.value)}
          />
        </div>
      </div>

      <div className="h-1/6 justify-center items-center flex">
        {result ? (
          <>
            <p>{result}</p>
          </>
        ) : (
          <>
            <Button disabled={loading} onClick={handleCompute}>
              Summarize
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Summarizer;
