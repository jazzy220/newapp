import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";


export default class News extends Component {

 
  static defaultProps = {
    country:"us",
    pageSize:5,
    category:"general",

  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: this.articles,
    }

  }



  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=42960e1f77e948ca816f34c6936490b1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsData = await data.json();
    console.log(parsData);
    this.setState({
      articles: parsData.articles,
      totalResults: parsData.totalResults,
      loading: false
    })
    setInterval(() => {
      document.title = "News update";
    }, 2000);

    setInterval(() => {
      document.title = "NewsMonkey"
    }, 1500)

  }
  clickToPrevious = async () => {
    console.log("previous")
    let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42960e1f77e948ca816f34c6936490b1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsData = await data.json();
    console.log(parsData);
    this.setState({
      page: this.state.page - 1,
      articles: parsData.articles,
      loading: false
    })
  }

  clickToNext = async () => {
    console.log("next")
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42960e1f77e948ca816f34c6936490b1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url);
      let parsData = await data.json();
      console.log(parsData);
      this.setState({
        page: this.state.page + 1,
        articles: parsData.articles,
        loading: false
      })
    }

  }
  render() {
    return (
      <div className="background-container" >
      <div className="container my-3">
        <h1 className="text-center  my-1" style={{margin:"23px 0px"}}>NewsMonkey -Top headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row my-4">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={!element.source.id?element.source.name:element.source.id==="[Removed]"&&"null"?"[Removed]":element.source.name} />
            </div>
          })}
        </div>
        <div className="container my-3 d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-primary my-3 mx-3" onClick={this.clickToPrevious}>&larr; Previous Page </button>
          <button type="button" disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-primary my-3" onClick={this.clickToNext}>Go to next page &rarr;</button>
        </div>
      </div>
      </div>
    )
  }
}