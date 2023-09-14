import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {


  static defaultProps = {
    country: "us",
    pageSize: 5,
    category: "general",

  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    }
    document.title = `${this.capatilize(this.props.category)}-NewsMonkey`

   }
  async updatenews() {
    const url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42960e1f77e948ca816f34c6936490b1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState({
      page:this.state.page+1,
      articles: parsData.articles,
      totalResults: parsData.totalResults,
      loading: false

    })
  }

  capatilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  async componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=42960e1f77e948ca816f34c6936490b1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState({
      articles: parsData.articles,
      totalResults: parsData.totalResults,
      loading: false
    })


  }
  // clickToPrevious = async () => {
  //   // console.log("previous")
  //   // let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42960e1f77e948ca816f34c6936490b1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true })
  //   // let data = await fetch(url);
  //   // let parsData = await data.json();
  //   // console.log(parsData);
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsData.articles,
  //   //   loading: false
  //   // })
  //   this.setState({page:this.state.page -1})
  //   this.updatenews();
  // }

  // clickToNext = async () => {
  //   // console.log("next")
  //   // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
  //   // }
  //   // else {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42960e1f77e948ca816f34c6936490b1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   //   this.setState({ loading: true })
  //   //   let data = await fetch(url);
  //   //   let parsData = await data.json();
  //   //   console.log(parsData);
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parsData.articles,
  //   //     loading: false
  //   //   })
  //   // }
  //   this.setState({page:this.state.page +1})
  //   this.updatenews();
  // }
  fetchMoreData = async () => {
    const url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42960e1f77e948ca816f34c6936490b1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState({
      page:this.state.page+1,
      articles: this.state.articles.concat(parsData.articles),
      totalResults: parsData.totalResults,
      loading: false

    })
  }



  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "23px 0px" }}>NewsMonkey -Top {this.capatilize(this.props.category)} headlines </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={this.state.loading && <Spinner />} >
          <div className="container">
            <div className="row my-3">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={!element.source.id ? element.source.name : element.source.id === "[Removed]" && "null" ? "[Removed]" : element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>

    )
  }
}