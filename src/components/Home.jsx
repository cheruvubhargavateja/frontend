import React, { useState } from "react";
import isAuthenticated from "../libs/authentication/IsAuthenticated";
import { useFetch } from "../libs/api-calls/hooks";
import "./Home.css";

const Home = ({ role }) => {
  const {
    state: { isLoading, data },
  } = useFetch("https://api.github.com/users");

  if (data) {
    console.log(data.length);
  }

  const [page, setPage] = useState(1);

  const handlePadignation = (selectedPage) => {
    console.log(selectedPage);
    if (
      selectedPage >= 1 &&
      selectedPage <= data.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div>
      <h1>Home Page {role}</h1>
      {isLoading ? <h1>Loading........</h1> : null}
      <div className="row">
        {data &&
          data.slice(page * 10 - 10, page * 10).map((ele) => {
            return (
              <div className="items" key={ele.id}>
                <img
                  src={ele.avatar_url}
                  alt={ele.login}
                  width={"290px"}
                />
                <p>{ele.login}</p>
              </div>
            );
          })}
      </div>
      {data && (
        <div className="pages">
          <span
            className="page start"
            onClick={() => handlePadignation(page - 1)}
          >
            {"<"}
          </span>
          {[...Array(data.length / 10)].map((_, i) => {
            return (
              <span
                key={`key_id_${i}`}
                className={page === i + 1 ? "page active" : "page"}
                onClick={() => handlePadignation(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className="page start"
            onClick={() => handlePadignation(page + 1)}
          >
            {">"}
          </span>
        </div>
      )}
    </div>
  );
};

export default isAuthenticated(Home);
