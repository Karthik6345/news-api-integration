import React,{Fragment} from "react";
import {connect} from 'react-redux';
import Card from "./Card";
import "./App.css";
import { Link } from "react-router-dom";
import {fetchArticles, fetchArticle} from './Actions';

class App extends React.Component{
  componentDidMount(){
  this.props.fetchArticles();
  }
  handleChange(e) {
    const value = e.target.value;
    if (value.length > 0) {
       this.props.fetchArticle(e.target.value)
    }
  }
  render(){
    const {articles,filterArticles, error} = this.props;
    const data = filterArticles.length > 0 ? filterArticles : articles;
      return (
      
      <div className="App">
        {error && <div className="errorText">{error}</div>}
        <div className = "container" >
          <input
          type = "text"
          name = "search"
          className = "search"
          onChange={e => this.handleChange(e)}
          placeholder = "Search..." />
          <div className="cards">
              { data && data.map((article, index) => {
                  return (
                    <Fragment  key={index}>
                    {article.description &&
                        <Link className="card" to={`/${article.title}`}>
                          <Card
                            index={index}
                            author={article.author}
                            img={article.urlToImage}
                            title={article.title}
                            description={article.description}
                            publishedAt={article.publishedAt}
                          />
                        </Link>
                    }
                    </Fragment>
                  );
                })}
          </div>
        </div>
      </div>
    );
  } 
}

function mapStateToProps(state){
  const {articles,filterArticles, error}= state.articleReducer
  return {
    articles,
    filterArticles,
    error
  }
}

export default connect(mapStateToProps,{fetchArticles, fetchArticle})(App);
