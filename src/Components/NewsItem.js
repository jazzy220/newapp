import React, { Component } from "react";
export default class NewsItem extends Component {
    render() {
        let {title, description,imgurl,url,author,Date} = this.props;
        return (
            <div>
                <div className="card">
                    <img src={!imgurl?"https://ichef.bbci.co.uk/news/1024/branded_news/7392/production/_130968592_gettyimages-1637128732.jpg":imgurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{!title?"This Title is not defined Click read more to read":title==="[Removed]"?"This descrioption is not defined Click read more to read":description}</h5>
                        <p className="card-desc">{!description?"This descrioption is not defined Click read more to read":description==="[Removed]"?"This descrioption is not defined Click read more to read":description}</p>
                        <div className="card-footer">
                        <small className="text-body-secondary">By {!author?"Unknown":author} Publish At {Date}</small>
                        </div>
                        <a href={url} rel="noreferrer"target="_blank"className="btn -sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}