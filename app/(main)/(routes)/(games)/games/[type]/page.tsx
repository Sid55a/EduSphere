import React from "react";

const page = ({ params }: { params: { type: string } }) => {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <iframe
          src={`https://www.friv4school.io/${
            params.type === "singleplayer" ? "" : `c/${params.type}`
          }`}
          className="w-full h-full"
          frameBorder="0"
          scrolling="none"
          allowFullScreen
        ></iframe>
        {/* <iframe
          src="https://archive.org/embed/DukeNukem"
          width="560"
          height="384"
          frameBorder="0"
          allowFullScreen
        ></iframe> */}
        {/* <iframe
          className="w-full h-full "
          src="https://playpager.com/embed/chess/index.html"
          scrolling="no"
        ></iframe> */}
      </div>
    </>
  );
};

export default page;
