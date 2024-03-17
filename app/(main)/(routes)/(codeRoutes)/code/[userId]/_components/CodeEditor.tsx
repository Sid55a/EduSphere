"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Editor } from "@monaco-editor/react";
import { Code, Profile } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import {
  CODE_SNIPPETS,
  LANGUAGE_FILE_NAME,
  LANGUAGE_VERSIONS,
  LanguageMap,
} from "./constants";

const CodeEditor = ({
  profile,
  codeData,
}: {
  profile: string;
  codeData?: Code;
}) => {
  const editorRef = useRef();
  const [codeText, setCodeText] = useState<string>(
    codeData
      ? codeData.code
      : `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("World");\n`
  );
  let iniLang = "javascript";
  if (codeData) {
    const iniLangExten = codeData.fileName?.split(".")[1];
    const langArr = Object.entries(LANGUAGE_FILE_NAME);
    iniLang = langArr.find((e) => e[1] === iniLangExten)?.[0] || "javascript";
  }
  const [language, setLanguage] = useState(iniLang);
  const [fileName, setFileName] = useState(codeData ? codeData.fileName : "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language: any) => {
    setLanguage(language);
    const lang = CODE_SNIPPETS[language as keyof LanguageMap];
    setCodeText(lang);
  };
  const FileType = LANGUAGE_FILE_NAME;
  const saveCode = async () => {
    try {
      setLoading(true);
      if (
        fileName.split(".").length === 2 &&
        // @ts-ignore
        fileName.split(".")[1] === FileType[language]
      ) {
        const code = await axios.post(`/api/code`, {
          codeText,
          fileName,
          codeId: codeData?.id || null,
        });
        router.push(`/code/${profile}/id/${code.data.id}`);
      } else {
        throw new Error("File Extension is not valid!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-fit pt-5">
      <div className="flex w-full">

          
        <div className="flex flex-col basis-1/2 ">
          <div className="w-80 flex gap-3 ml-[16rem]">
            <Input
              type="text"
              // @ts-ignore
              placeholder={`File name eg:- index.${FileType[language]}`}
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <Button 
            variant="success"
            disabled={loading}
            className=" text-white"
             onClick={saveCode}>
              Save
            </Button>
          </div>
          {!codeData ? (
            <LanguageSelector
             language={language} onSelect={onSelect} />
          ) : (
            <>
              <p className="mb-1 text-sm">File name: {fileName}</p>
              <p className="mb-3 text-xs">{`Language(version): ${iniLang} (${LANGUAGE_VERSIONS[iniLang]})`}</p>
            </>
          )}

          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="82vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language as keyof LanguageMap]}
            onMount={onMount}
            value={codeText}
            // @ts-ignore
            onChange={(value) => setCodeText(value)}
          />
        </div>

        <div className="bas1/2">
          <Output editorRef={editorRef} language={language} />
        </div>
      </div>
    </div>
  );
};
export default CodeEditor;
