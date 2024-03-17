"use client";
import { useModal } from "@/hooks/use-model-store";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import Draggable from "react-draggable";
const CircularButton = ({ data }: { data: string }) => {
  const { setGroupSummary, onOpen } = useModal();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState<{ width: number; height: number }>({
    width: document.documentElement.clientWidth - 470,
    height: 0,
  });
  const [showMenu, setShowMenu] = useState(false); // State to toggle the dropdown menu
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the dropdown menu

  useEffect(() => {
    const updatePageSize = () => {
      setPageSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };
    // Update page size on mount and on window resize
    updatePageSize();
    window.addEventListener("resize", updatePageSize);

    // Event listener to close dropdown menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", updatePageSize);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDoubleClick = () => {
    setShowMenu(true);
    // Show the dropdown menu on double click
  };

  const handleOptionClick = async (path: string) => {
    switch (path) {
      case "groupSummary":
        {
          const options = {
            method: "POST",
            url: "https://open-ai21.p.rapidapi.com/summary",
            headers: {
              "content-type": "application/json",
              "X-RapidAPI-Key":
                "16c576e9b6msh151b4015899ff59p121a0fjsn7980dc6904b1",
              "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
            },
            data: {
              text: { data },
            },
          };

          try {
            setLoading(true);
            onOpen("groupSummaryModel");
            const response = await axios.request(options);
            console.log(response.data);
            {
              response && setGroupSummary(response.data.result);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        }
        break;
      case "groupQA":
        {
          onOpen("groupQAmodel", { aiGroupQAInput: data });
        }
        break;
      case "nextReply":
        {
          const options = {
            method: "POST",
            url: "https://open-ai21.p.rapidapi.com/qa",
            headers: {
              "content-type": "application/json",
              "X-RapidAPI-Key":
                "16c576e9b6msh151b4015899ff59p121a0fjsn7980dc6904b1",
              "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
            },
            data: {
              question:
                "What should be appropriate reply by me in this conversation?",
              context: data,
            },
          };

          try {
            setLoading(true);
            const response = await axios.request(options);
            onOpen("groupNextReply", { aiGroupQAInput: response.data.result });
            console.log(response.data.result);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        }
        break;

      default:
        break;
    }
  };

  return (
    <Draggable
      defaultPosition={{ x: pageSize.width, y: 0 }} // Initial position of the button
      bounds="body" // Restrict dragging within the bounds of the body
    >
      <div
        className="fixed z-[100] flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100"
        onDoubleClick={handleDoubleClick} // Double click event handler
      >
        <div className="relative" ref={dropdownRef}>
          <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
            <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="bg-white text-gray-700  rounded-full text-sm px-1"></span>
                </div>
              </div>
            </div>
          </div>
          {/* {showMenu && (
            <div className="absolute top-0  p-4  space-y-4  right-0 mt-2 mr-14 w-[8rem] h-[10rem]  bg-gray-700 text-white rounded-md shadow">
              <div
                className="cursor-pointer flex text-center rounded-md p-1  hover:bg-gray-500"
                onClick={() => handleOptionClick("groupSummary")} // Handle click on option 1
              >
              <span>
               Summarize
               </span>
                <Bot className={cn("opacity-0 h-4 w-4", loading && "opacity-100 h-4 w-4")} />
              </div>
              <hr></hr>
              <div
                className=" cursor-pointer  rounded-md p-1 text-center hover:bg-gray-500"
                onClick={() => handleOptionClick("groupQA")} // Handle click on option 2
              >
                Q/A
              </div>
              <hr></hr>
              <div
                className="cursor-pointer text-center rounded-md p-1 hover:bg-gray-500"
                // Handle click on option 3
              >
                Next Reply
              </div>
            </div>
          )} */}

          {showMenu && (
            <div>
              <div className="absolute top-0  bg-black p-4  space-y-4  right-0 mt-2 mr-14 w-[8rem] h-[10rem]   text-white rounded-md shadow">
                <div
                  onClick={() => handleOptionClick("groupSummary")}
                  className="dark:text-zinc-300 dark:hover:text-white "
                >
                  <p className="flex w-full">Summary</p>
                </div>
                <div
                  onClick={() => handleOptionClick("groupQA")}
                  className="dark:text-zinc-300 dark:hover:text-white "
                >
                  <p className="flex w-full">Q/A</p>
                </div>
                <div
                  onClick={() => handleOptionClick("nextReply")}
                  className="dark:text-zinc-300 dark:hover:text-white "
                >
                  <p className="flex w-full">Next Reply</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default CircularButton;
