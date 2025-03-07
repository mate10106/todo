import features from "@/data/features";
import React from "react";

const Features = () => {
  return (
    <div>
      <div className="text-center py-12">
        <h2 className="font-bold text-3xl">Why Choose Our Task Manager?</h2>
        <p className="pt-3 text-black/55 text-[22px]">
          Discover the features that make our platform stand out
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-150"
          >
            <div className="text-3xl">{feature.icon}</div>
            <h3 className="font-bold text-lg mt-4">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
