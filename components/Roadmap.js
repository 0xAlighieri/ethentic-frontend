import React from "react";

import { DotsCircleHorizontalIcon, CheckCircleIcon } from "@heroicons/react/outline";

export default function Roadmap(props) {
  return (
    <div className="mb-12 ">
      <h3 className="text-xl sm:text-2xl font-semibold text-red-400 tracking-tight  mb-4">
        {props.title}
      </h3>
      {props.roadmapItems.map((item) =>
        item.completed ? (
          <div key={item.id} className="inline-flex items-center  my-2">
            <CheckCircleIcon className="h-6 w-6 mr-6 text-teal-500" aria-hidden="true" />
            <p className="text-md text-teal-500 max-w-prose line-through ">{item.copy}</p>
          </div>
        ) : (
          <div key={item.id} className="inline-flex items-center my-2">
            <DotsCircleHorizontalIcon className="h-6 w-6 mr-6" aria-hidden="true" />
            <p className="text-md text-gray-500 max-w-prose">{item.copy}</p>
          </div>
        )
      )}
    </div>
  );
}
