"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const PlagerismChecker = () => {
  const [text, setText] = useState("//Write your text here");
  const [orgText, setOrgText] = useState("//Get short summary ");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCompute = async () => {
    const axios = require("axios");
    const options = {
      method: "POST",
      url: "https://open-ai21.p.rapidapi.com/conversationgpt35",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "16c576e9b6msh151b4015899ff59p121a0fjsn7980dc6904b1",
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
      },
      data: {
        messages: [
          {
            role: "user",
            content: `My text data is ${text} and Original data is ${orgText} Check the percentage of similarity in percentage?`,
          },
        ],
        web_access: false,
        system_prompt: "",
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.result);

      if (response.data.result) {
        const percentages = response.data.result.match(/\b\d+(?=%)/);
        console.log(percentages);
        setResult(percentages + "%");
      } else {
        console.log("Percentage not found");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col h-screen p-1">
      <h1 className="flex justify-center items-center text-xl font-semibold">
        Plagerism Checker
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
            Refrence Text
          </h1>
          <Textarea
            value={orgText}
            className="h-full"
            onChange={(e) => setOrgText(e.target.value)}
          />
        </div>
      </div>

      <div className="h-1/6 justify-center items-center flex">
        {result && (
          <>
            <p className="pr-5 text-lg">{result}</p>
          </>
        )}

        <>
          {!loading ? (
            <Button disabled={loading} onClick={handleCompute}>
              Check
            </Button>
          ) : (
            <Loader2 className=" animate-spin"></Loader2>
          )}
        </>
      </div>
    </div>
  );
};

export default PlagerismChecker;
