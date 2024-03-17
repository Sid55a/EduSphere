import { useState } from "react";
// import { executeCode } from "../api";
import { Button } from "@/components/ui/button";
import { executeCode } from "./execute";

const Output = ({ editorRef, language }: { editorRef: any; language: any }) => {
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <p className="text-lg">Output</p>
      <Button
        variant="outline"
        className="mb-4 mt-2 bg-green-600 text-gray-300 font-extrabold"
        size="sm"
        onClick={runCode}
      >
        Run Code
      </Button>
      <div
        style={{ height: "82vh", width: "80vh" }}
        className={`p-2  ${
          isError
            ? "text-red-400 border border-red-500"
            : "border border-gray-300 rounded-md"
        }`}
      >
        {output
          ? output.map((line: any, i: any) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};
export default Output;
