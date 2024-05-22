import React, { useEffect, useReducer } from "react";
import { toast } from "react-toastify";

const notifyError = (msg) => toast.error(msg);
const notifySuccess = (msg) => toast.success(msg);

function reducer(state, action) {
  switch (action.type) {
    case "api_init":
      return {
        ...state,
        isLoading: true,
        data: null
      };
    case "set_data":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case "set_error":
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

const useFetch = (url) => {
  const initialState = {
    isLoading: false,
    data: null,
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch({ type: "api_init" });

    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: signal });
        if (!res.ok) {
          dispatch({ type: "set_error", payload: "Failed to fetch..." });
          notifyError(`Failed to fetch api ${url}`);
        }

        if (res.ok) {
          notifySuccess("Succesfully fetched the data...");
          const data = await res.json();
          dispatch({ type: "set_data", payload: data });
        }
      } catch (error) {
        dispatch({ type: "set_error", payload: error });
        notifyError(`Failed to fetch ${error}`);
      }
    };
    const timer = setTimeout(() => {
      fetchData();
    }, 3000);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [url]);

  return { state, dispatch };
};

export { useFetch };
