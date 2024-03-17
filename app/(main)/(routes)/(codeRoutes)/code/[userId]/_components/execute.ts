import axios from "axios";
import { LANGUAGE_VERSIONS, LanguageMap } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language: any, sourceCode: any) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language as keyof LanguageMap],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
