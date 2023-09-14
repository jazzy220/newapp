import React, { Component } from "react";
export default class NewsItem extends Component {
    render() {
        let { title, description, imgurl, url, author, date, source } = this.props;
        return (
            <div>
                <div className="card my-3">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success mx--4" style={{zIndex:"10",left:'10px'}}>
                        {source}
                        <span className="visually-hidden"></span>
                    </span>
                    <img src={!imgurl ? "https://ichef.bbci.co.uk/news/1024/branded_news/7392/production/_130968592_gettyimages-1637128732.jpg" : imgurl} className="card-img-top" alt="[Reloading]" />
                    <div className="card-body" >
                        <h5 className="card-title">{!title ? "This Title is not defined Click read more to read" : title === "[Removed]" ? "This descrioption is not defined Click read more to read" : description}<span className="badge bg-secondary">New</span></h5>
                        <p className="card-desc">{!description ? "This descrioption is not defined Click read more to read" : description === "[Removed]" ? "This descrioption is not defined Click read more to read" : description}</p>
                        <div className="card-footer">
                            <small className="text-body-secondary">By {!author ? "Unknown" : author} Publish At {new Date(date).toGMTString()}</small>
                        </div>
                        <a href={url} rel="noreferrer" target="_blank" className="btn -sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}