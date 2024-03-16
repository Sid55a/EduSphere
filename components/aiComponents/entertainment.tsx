"use client";

import { useModal } from "@/hooks/use-model-store";
import { MusicPlayer } from "./musicPlayer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import {
  Compass,
  CompassIcon,
  Dot,
  Droplet,
  Eye,
  FlagTriangleLeft,
  FlagTriangleRight,
  Headphones,
  LucideCompass,
  Milestone,
  MoreVertical,
  MoveLeft,
  MoveRight,
  PenTool,
  Play,
  Quote,
  QuoteIcon,
  RefreshCcwIcon,
  RefreshCw,
  SunSnow,
  Thermometer,
  Wind,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { currentProfile } from "@/lib/current-profile";
import ActionTooltip from "../action-tooltip";
import toast from "react-hot-toast";

const EntertainmentZone = () => {
  const {
    mLink,
    quote,
    setQuote,
    currEMode,
    setCurrEMode,
    onOpen,
    setCricData,
    cricData,
  } = useModal();
  const [curr, setCurr] = useState(3);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    feelLike: "",
    humidity: "",
    temp: "",
    wind: { angle: "", dir: "", speed: "" },
    visibility: "",
  });

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/cricData");
      setCricData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // console.log(response.data);
  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "GET",
        url: "https://quotes15.p.rapidapi.com/quotes/random/",
        headers: {
          "X-RapidAPI-Key":
            "9fec0e4972msh21218c90552c659p1e4ff6jsnb84108350498",
          "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
        },
      });
      console.log(response.data);
      setQuote(response.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "GET",
        url: "https://ai-weather-by-meteosource.p.rapidapi.com/current",
        params: {
          lat: "23.2156",
          lon: "72.6369",
          timezone: "auto",
          language: "en",
          units: "auto",
        },
        headers: {
          "X-RapidAPI-Key":
            "9fec0e4972msh21218c90552c659p1e4ff6jsnb84108350498",
          "X-RapidAPI-Host": "ai-weather-by-meteosource.p.rapidapi.com",
        },
      });
      setWeather({
        temp: response.data.current.temperature,
        feelLike: response.data.current.feels_like,
        humidity: response.data.current.humidity,
        visibility: response.data.current.visibility,
        wind: {
          angle: response.data.current.wind.angle,
          dir: response.data.current.wind.dir,
          speed: response.data.current.wind.speed,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeft = () => {
    if (currEMode === 1) {
      setCurrEMode(4);
    } else {
      setCurrEMode(currEMode - 1);
    }
  };
  const handleRight = () => {
    if (currEMode === 4) {
      setCurrEMode(1);
    } else {
      setCurrEMode(currEMode + 1);
    }
  };
  const handleMusicClick = () => {
    onOpen("musicSelector");
  };
  return (
    <>
      <div className="flex items-center justify-center ">
        {currEMode === 2 && (
          <p className="flex  items-center gap-x-2">
            Weather <SunSnow className="h-4 w-4" />
          </p>
        )}
        {currEMode === 4 && cricData.matchHistory === "" && (
          <Button
            className="flex  items-center gap-x-2 h-[5.3rem] w-full"
            variant="secondary"
            onClick={getData}
          >
            Live-Cricket Score{" "}
            <Play className={cn("h-4 w-4", loading && "animate-spin")} />
          </Button>
        )}
        {currEMode === 3 && (
          <p className="flex  items-center gap-x-2">
            Quotes <PenTool className="h-4 w-4" />
          </p>
        )}
      </div>
      <div className="overflow-x-hidden w-[290px]">
        {currEMode === 1 ? (
          mLink ? (
            <MusicPlayer />
          ) : (
            <div className="h-[85px] w-[290px] dark:bg-zinc-800 bg-zinc-200 rounded-md mt-1 p-1 relative">
              <div className="flex items-center justify-center w-full h-full p-4">
                <div
                  onClick={handleMusicClick}
                  className="dark:bg-green-900 bg-zinc-400 p-3 rounded-3xl px-5 dark:text-zinc-300 cursor-pointer flex gap-x-2 items-center hover:bg-zinc-100 dark:hover:bg-green-700"
                >
                  Enjoy Music <Headphones className="h-6 w-6" />
                </div>
              </div>
            </div>
          )
        ) : (
          <></>
        )}

        {currEMode === 4 && cricData.matchStatus.length > 1 && (
          <p className="flex  items-center gap-x-2">
            <div className="p-1 h-[109px] w-[290px] border border-white bg-black ">
              <div className="text-white flex text-xs font-light ">
                <div className="flex-row">
                  <span>{cricData?.seriesName}</span>
                  <br />
                  <span>{cricData?.matchHistory}</span>
                </div>
                <div className=" ml-8 justify-end flex">
                  <span className=" text-orange-400 flex ">
                    <Dot className=" h-4  w-4 animate-bounce" />
                    <span> {cricData?.matchStatus} </span>
                  </span>
                </div>
              </div>
              <div className=" flex text-xs text-white mt-1 justify-between">
                <h2>{cricData?.team1Name}</h2>
                <span>{cricData?.team1Runs}</span>
              </div>
              <div className=" flex text-xs text-white mt-1 justify-between">
                <h2>{cricData?.team2Name}</h2>
                <span>{cricData?.team2Runs}</span>
              </div>
              <div className=" text-xs justify-between flex text-white font-light mt-2">
                <div> {cricData?.matchCurrentInfo}</div>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => onOpen("cricketModel")}
                />
                <RefreshCcwIcon
                  onClick={getData}
                  className={cn(
                    "h-4 w-4 cursor-pointer",
                    loading && "animate-spin"
                  )}
                />
              </div>
            </div>
          </p>
        )}

        {currEMode === 2 &&
          (weather.temp !== "" ? (
            <div className="h-[90px] w-[280px] dark:bg-zinc-800 border-zinc-700 dark:border-zinc-200 rounded-md mt-1 p-1 relative ">
              <div className="flex  border-2 border-zinc-700 dark:border-zinc-200">
                <div className="basis-1/3  flex-col justify-between ">
                  <ActionTooltip lable="Temperature">
                    <div className="h-[3.4rem] border-r-[1px] border-b-[1px]  border-zinc-700 dark:border-zinc-200 cursor-pointer">
                      <p className="flex justify-center items-center">Temp</p>
                      <span className="flex justify-center items-center  text-[1.1rem] font-semibold">
                        {weather.temp} °C
                      </span>
                    </div>
                  </ActionTooltip>
                  <ActionTooltip lable="Feels Like">
                    <div className=" h-[1.5rem] cursor-pointer">
                      <p className="text-[9px] flex justify-start items-start py-1 ml-1 border-r-[1px] border-zinc-700 dark:border-zinc-200 ">
                        Feels: {weather.feelLike} °C
                      </p>
                    </div>
                  </ActionTooltip>
                </div>
                <div className="flex flex-col w-full">
                  <ActionTooltip lable="Coordinates">
                    <div className="w-full h-[1.8rem] border-b-[1px] border-zinc-700 dark:border-zinc-200 cursor-pointer">
                      <p className="flex justify-start items-center mt-1 text-sm pl-1">
                        Coord: 23.2156N,72.6369E
                      </p>
                    </div>
                  </ActionTooltip>
                  <div className="h-[1.6rem] border-b-[1px] border-zinc-700 dark:border-zinc-200 flex justify-between">
                    <ActionTooltip lable="Humidity">
                      <div className="basis-3/5 flex justify-center items-center border-r-[1px] px-2 border-zinc-700 dark:border-zinc-200 cursor-pointer">
                        <Droplet className="w-4 h-4 mr-1" /> {weather.humidity}{" "}
                        g.m-3
                      </div>
                    </ActionTooltip>
                    <ActionTooltip lable="Visibility">
                      <div className="basis-2/5  flex justify-center items-center cursor-pointer ">
                        <Eye className="w-4 h-4 mr-1" /> {weather.visibility}
                      </div>
                    </ActionTooltip>
                  </div>
                  <div className="h-[1.58rem]  border-zinc-700 dark:border-zinc-200 flex justify-between">
                    <ActionTooltip lable="Wind Angle">
                      <div className="basis-2/5 flex justify-center items-center border-r-[1px] px-2 border-zinc-700 dark:border-zinc-200 text-[0.8rem] cursor-pointer">
                        <Milestone className="w-3 h-3 mr-1" />{" "}
                        {weather.wind.angle} °
                      </div>
                    </ActionTooltip>
                    <ActionTooltip lable="Wind Direction">
                      <div className="basis-1/5 flex justify-center items-center border-r-[1px] px-2 border-zinc-700 dark:border-zinc-200 text-[0.8rem] cursor-pointer">
                        <Compass className="w-3 h-3 mr-1" /> {weather.wind.dir}
                      </div>
                    </ActionTooltip>
                    <ActionTooltip lable="Wind Speed">
                      <div className="basis-2/5 flex justify-center items-center  px-1  border-zinc-700 dark:border-zinc-200 text-[0.8rem] cursor-pointer">
                        <Wind className="w-3 h-3 mr-1" /> {weather.wind.speed}{" "}
                        m/s
                      </div>
                    </ActionTooltip>
                  </div>
                </div>
                {/* <p>Humidity:{weather.humidity}</p>
              <p>Visibility:{weather.visibility}</p>
              <p>
                Wind:{weather.wind.angle} / {weather.wind.dir} /
                {weather.wind.speed}
              </p> */}
              </div>
              <ActionTooltip lable="Refresh">
                <RefreshCw
                  onClick={handleClickWeather}
                  className={cn(
                    "h-4 w-4 absolute right-2 top-2 cursor-pointer",
                    loading && "animate-spin"
                  )}
                />
              </ActionTooltip>
            </div>
          ) : (
            <div className="h-[85px] w-[290px] flex justify-center items-center ">
              <Button
                onClick={handleClickWeather}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
              >
                <RefreshCw
                  className={cn(
                    "h-5 w-5 text-gray-800 dark:text-white",
                    loading && "animate-spin"
                  )}
                />
              </Button>
            </div>
          ))}

        {currEMode === 3 &&
          (quote ? (
            <div className="h-[85px] w-[290px] dark:bg-zinc-800 bg-zinc-200 rounded-md mt-1 p-1 relative">
              <Quote className="h-3 w-3 absolute left-4" />

              <ScrollArea>
                <p className="flex justify-center items-center p-3 text-xs text-center">
                  {quote}
                </p>
              </ScrollArea>
              <Quote className="h-3 w-3 absolute right-4 bottom-2" />
              <ActionTooltip lable="Refresh">
                <RefreshCw
                  onClick={handleClick}
                  className={cn(
                    "h-4 w-4 absolute right-1 top-0 cursor-pointer",
                    loading && "animate-spin"
                  )}
                />
              </ActionTooltip>
            </div>
          ) : (
            <div className="h-[85px] w-[290px] flex justify-center items-center ">
              <Button
                onClick={handleClick}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
              >
                <RefreshCw
                  className={cn(
                    "h-5 w-5 text-gray-800 dark:text-white",
                    loading && "animate-spin"
                  )}
                />
              </Button>
            </div>
          ))}

        {/* {curr === 4 && (
        <div className="h-[85px] w-[290px] dark:bg-zinc-800 bg-zinc-200 rounded-md mt-1 p-1 relative">
          Hello
        </div>
      )} */}
      </div>
      <div className="flex items-center justify-between mt-1">
        <ActionTooltip lable="Move back" side="bottom" align="start">
          <Button
            onClick={handleLeft}
            className="h-4 w-10 p-2 cursor-pointer bg-gray-400"
          >
            <MoveLeft className="h-4 w-6" />
          </Button>
        </ActionTooltip>
        <ActionTooltip lable="Move Forward" side="bottom">
          <Button
            onClick={handleRight}
            className="h-4 w-10 p-2 cursor-pointer bg-gray-400"
          >
            <MoveRight className="h-4 w-6" />
          </Button>
        </ActionTooltip>
      </div>
    </>
  );
};

export default EntertainmentZone;
