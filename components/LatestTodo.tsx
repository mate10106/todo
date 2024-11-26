import Image from "next/image";
import React from "react";

const LatestTodo = () => {
  return (
    <section className="mt-20 max-lg:mt-12">
      <div className="max-lg:text-center">
        <h1 className="text-2xl font-bold">Latest tasks</h1>
        <span className="text-sm font-light">latest 5 task you created</span>
      </div>
      <table className="mt-12 mb-8 mx-auto w-full max-lg:w-2/3 max-lg:text-center rounded-lg">
        <tbody>
          <tr>
            <td>
              <Image
                src="/list-bullet-svgrepo-com.svg"
                width={22}
                height={22}
                alt="title"
                className="max-lg:mx-auto"
              />
            </td>
            <td>
              <Image
                src="/date-svgrepo-com.svg"
                width={22}
                height={22}
                alt="title"
                className="max-lg:mx-auto"
              />
            </td>
          </tr>
          <tr>
            <td className="table-content">Do homework</td>
            <td className="table-content">2024.12.22</td>
          </tr>
          <tr>
            <td className="table-content">Do homework</td>
            <td className="table-content">2024.12.22</td>
          </tr>
          <tr>
            <td className="table-content">Do homework</td>
            <td className="table-content">2024.12.22</td>
          </tr>
          <tr>
            <td className="table-content">Do homework</td>
            <td className="table-content">2024.12.22</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default LatestTodo;
