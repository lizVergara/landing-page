import React from "react";

class Challenge extends React.Component {
  render(): JSX.Element {
    return (
      <main className="text-center p-4 cursor-pointer">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-slate-400">
          Challenge
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mt-4">
          TRD
        </h2>
      </main>
    );
  }
}

export default Challenge;
