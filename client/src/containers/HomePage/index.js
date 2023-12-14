/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios";

export default function HomePage() {
  //let value = 'cur' //cur pct et wt gmt
  const [value, setData] = useState('ph');
  const [timeVal, setTimeVal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTime();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getTime();
  },[value]) // eslint-disable-line react-hooks/exhaustive-deps

  function getTime(){
    setIsLoading(true);
    axios.get(`/api/v1/time/${value}`).then((res) => {
      const response = res.data;
      return response;
    }).then(data => {
      setTimeVal(data);
      setIsLoading(false);
    });
  }

  return (
    <div>
    <div className="container mt-5 text-center">
    <div className="row">
      <div className="col">
        <button onClick={() => {setData("ph");}} type="button" className="btn btn-secondary">
          Current Time
        </button>
      </div>
      <div className="col">
        <button onClick={() => {setData("pst");}} type="button" className="btn btn-primary">
          Pacific Time
        </button>
      </div>
      <div className="col">
        <button onClick={() => setData("est")} type="button" className="btn btn-success">
          Eastern Time
        </button>
      </div>
      <div className="col">
        <button onClick={() => setData("wst")} type="button" className="btn btn-warning">
          Western Time
        </button>
      </div>
      <div className="col">
        <button onClick={() => setData("gmt")} type="button" className="btn btn-info">
          GMT
        </button>
      </div>
    </div>
  </div>
  <div className="container mt-5 text-center">
    {
          {
            'ph': <h4>Current Time</h4>,
            'pst':<h4>Pacific Time</h4>,
            'est':<h4>Eastern Time</h4>,
            'wst':<h4>Western Time</h4>,
            'gmt': <h4>GMT</h4>
          }[value]
    }
    {!isLoading ? (
      <span>
      <h1>{timeVal?.time}</h1>
      <span className="badge badge-secondary">{timeVal?.hour > 12 ? timeVal?.hour-12 : timeVal?.time.substring(0,2)}:{timeVal?.time.substring(3,5)}{timeVal?.hour > 12 ? "PM":"AM"}</span>
    </span>
    ) : (null)}
  </div>
  
  </div>
  );
}
