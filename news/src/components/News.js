import React, {useState,useEffect} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

const News=(props)=>{

  const[articles,setarticles]=useState([])
  const[loading,setloading]=useState(true)
  const[page,setpage]=useState(1)
  const[totalResults,settotalResults]=useState(0)
  document.title=`${props.category}-News hunter`

  const updateNews=async()=>{
    props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c54caf495724356986641acd01c4484&page=1&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parseddata = await data.json();
    props.setProgress(70)
    setarticles(parseddata.articles)
    settotalResults(parseddata.totalResults)
    setloading(false)
    props.setProgress(100)
  }
  useEffect(()=>{
    updateNews()
    // eslint-disable-next-line
  },[])
  const handleprevious = async () => {
    updateNews()
    setpage(page-1)
  };
  const handlenext = async () => {
    if (page + 1 > Math.ceil(totalResults /props.pageSize)) {
    } 
    else {
      updateNews()
      setpage(page+1)
      }
  };
    return (
      <div className="container my-4">
        <h1 className="text-center">Top headlines-{props.category}</h1>
        {loading&&<Spinner/>}
        <div className="row">
          {!loading&&articles.map((element) => {
            return (
              <div className="col md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handleprevious}
          >
            previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults /props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handlenext}
          >
            next
          </button>
        </div>
      </div>
    );
}
News.defaultProps={
  country:"in",
  pageSize:8,
  category:'general',
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}
export default News;
