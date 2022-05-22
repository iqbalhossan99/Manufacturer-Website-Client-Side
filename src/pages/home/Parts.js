import React, { useEffect, useState } from "react";

const Parts = () => {
  const [parts, setParts] = useState([]);
  const maxItem = parts.slice(0, 6);
  useEffect(() => {
    fetch("parts.json")
      .then((res) => res.json())
      .then((data) => setParts(data));
  }, []);

  console.log(maxItem);
  return (
    <section className="container py-20 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-5">Parts</h2>
      <div className=" grid grid-cols-1  mx-auto gap-y-8 md:gap-x-8 justify-items-center lg:px-32 md:grid-cols-2 lg:grid-cols-3">
        {maxItem.map((part) => (
          <div className="text-center shadow-xl card w-96 bg-base-100">
            <div className="card-body">
              <img src={part.img} alt="" />
              <h3 className="justify-center text-xl font-semibold card-title text-secondary">
                {part.name}
              </h3>
              <p>
                {part.length > 0 ? (
                  <span>{part[0]}</span>
                ) : (
                  <span className="text-red-500">No slot available</span>
                )}
              </p>
              <p>
                {part.length} {part.length > 1 ? "spaces" : "space"} available
              </p>
              <span>Price:{part.price}</span>
              <div className="justify-center card-actions">
                <label
                  disabled={part.length === 0}
                  htmlFor="booking-modal"
                  className="text-base text-white btn btn-primary btn-sm text-bold bg-gradient-to-r from-primary to-secondary "
                >
                  BOOK APPOINTMENT
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Parts;