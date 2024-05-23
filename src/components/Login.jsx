import React, { useState, useEffect } from "react";
import "./Home.css";

const Login = () => {

  const [data, setData] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handlePadignation = (selectedPage) => {
    console.log(selectedPage);
    if (
      selectedPage >= 1 &&
      selectedPage <= total / limit &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  useEffect(() => {
    const fetchData = async () => { 
      const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${page*limit-limit}`)
      const jsonData = await res.json()

      if(res.ok){

        setData(jsonData)
        setTotal(jsonData.total)
      }
     }

     fetchData()
  }, [page]);

  console.log(data)

  return (
    <div>
      <h1>Login Page</h1>
      <div className="row">
        {data &&
          data.products.map((ele) => {
            return (
              <div className="items" key={ele.id}>
                <img
                  src={ele.images[0]}
                  alt={ele.login}
                  width={"290px"}
                  height={"300px"}
                />
                <p>{ele.title}</p>
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
            prev
          </span>
          {[...Array(total / limit)].map((_, i) => {
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
            next
          </span>
        </div>
      )}
    </div>
  );
};

export default Login;
