/**
 *
 * Pexel
 *
 */

import React from 'react';
import axios from "axios";
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { appHistory } from '../../App';

export default function Pexel(){
  const { page } = useParams();

  const [feed, setFeed] = useState([]);
  const [currentPage, setPage] = useState(parseInt(page));
  const [pager, setPager] = useState({
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getPexelImgs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setIsLoading(true);
    getPexelImgs();
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  function getPexelImgs(){
    if(currentPage*6>8000){
      appHistory.push('/feed/'+(1333))
      return setPage(1333)
    }else if(currentPage<1){
      appHistory.push('/feed/'+(1))
      return setPage(1)
    }

    axios
      .get(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=6`,{
        headers :{
          "Authorization": process.env.NODE_ENV.AUTH_ID_PEXEL
        }
      })
      .then(response =>{
        return response.data;
      })
      .then(data => {
        setFeed(data);
        setPager(getPager(data.total_results,data.page,data.per_page))
        setIsLoading(false);
      })
      .catch(error => {setErr(error);setIsLoading(false);});
  }

  function getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    let totalPages = Math.floor(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 5) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // calculate start and end item indexes
    //let startIndex = (currentPage - 1) * pageSize;
    //let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  };

  return (
    <div>
      <div>
        <div className="card-columns">
          {!isLoading && error === null ? (
            feed?.photos?.map(photo => {
                return (
                <div key={photo.id} className="card">
                <img className="card-img-top" src={photo.src.original} alt={photo.alt}></img>
                <div className="card-body">
                  <h5 className="card-title">Shot by {photo.photographer}</h5>
                  <p className="card-text">{photo.alt}</p>
                </div>
                </div>
              )
            })
          ) : (
            
            <div className="container-fluid px-0">
              <div className="col-12 justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          )}
          </div>
          {pager?.pages?.length<=1 ? null: (
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1? 'disabled': ''}`}>
                <button className="page-link" onClick={() => {appHistory.push('/feed/'+(currentPage-1));setPage(currentPage-1)}}tabIndex="-1">Previous</button>
              </li>
              {pager?.pages?.map((pageIndex, index) => (
                <li key={index} className={`page-item ${currentPage === pageIndex ? 'active': ''}`}>
                  <button onClick={() => {appHistory.push('/feed/'+(pageIndex)); setPage(pageIndex)}} className="page-link">{pageIndex}</button>
                </li>
              ))}
              <li className={`page-item ${ currentPage === pager?.endPage ? 'disabled': ''}`}>
                <button className="page-link" onClick={() => {appHistory.push('/feed/'+(currentPage+1)); setPage(currentPage+1)}}>Next</button>
              </li>
            </ul>
          </nav>
          )
          }
        </div>
    </div>
  );
}

