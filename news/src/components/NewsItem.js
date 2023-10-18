import React from "react";

const NewsItem =(props)=> {
    let {title,description,imageurl,newsurl}=props;
    return (
      <div>
        <div className="card">
          <img src={imageurl?imageurl:"https://c.ndtvimg.com/2023-02/gbos47e4_zoom-meeting_625x300_08_February_23.jpg"} className="card-img-top" alt="..." /> 
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
              read more
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
