import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import ReactJsonSchema from "react-json-schema";
import PDF from 'react-pdf-js';
import PageComponent from '../../components/page';
import SwiperCarousel from '../../components/carousel';


import NotFound from '../not-found';
import {
  getCurrentPage,
  removeCurrentPage
} from '../../../modules/pageContainer';

const frontload = async (props) => {
  if(props.match.url==="/"){
    props.match.params.path = "homepage";
  }
  let res = await props.getCurrentPage(props.match.params.path);
  return res;
}

const pageSection = new ReactJsonSchema();
//pageSection.setComponentMap({ MySwiper, Swiper, Slide});

class PageContainer extends Component {
  contentSwitch(content){

    switch(content.children[0].component){
      case 'PDF':
        return <PDF file={content.children[0].file}></PDF>;
      case 'Swiper':
      console.log(content);
        return <SwiperCarousel swiper={content}></SwiperCarousel>;
      default:
        return pageSection.parseSchema(content);
    }

  }
  componentWillUnmount() {
    this.props.removeCurrentPage();
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.match.url==="/"){
      nextProps.match.params.path = "homepage";
    }
    if (nextProps.match.params.path !== this.props.match.params.path) {
      this.props.getCurrentPage(nextProps.match.params.path);
    }

    return true;
  }

  render() {
    const rows  = this.props.currentPage.rows;
    let meta = {}
    if(undefined!== this.props.currentPage.meta ){
      meta = this.props.currentPage.meta;
    }
    
    if(undefined===rows){
      return (<NotFound></NotFound>);
    }

    return (
      <PageComponent className="content-wrapper"
        id= {"page-" + this.props.match.params.path}
        title={meta.title}
        description={meta.description}
        image={meta.image}
        contentType={meta.contentType}
        twitter={meta.twitter}
        facebookAppId={meta.facebookAppId}
        noCrawl={meta.noCrawl}
        published={meta.published}
        updated={meta.updated}
        category={meta.category}
        tags={meta.tags}
      >
      
      <div className={this.props.match.params.path} id={this.props.match.params.path}>
        {rows.map(row => (
          <div className="content-row" key={"r"+row.id}>
          {row.columns.map(column=>{
            return (
              <div className={"content-column width"+ Math.floor((1/row.columns.length)*100)} key={"r"+row.id+ "c"+column.id}>
              {column.content.map((content,index)=>{
                return (
                  <div className="content-con" key={"r"+row.id+ "c"+column.id+"con"+index}> 
                                   
                    {this.contentSwitch(content,row.id,column.id,content.id)} 
                  </div>
                  )
            })}
              </div>
              )
            })}
          </div>
        ))}
      </div>
      </PageComponent>  
    );
  }
}

const mapStateToProps = state => ({
  currentPage: state.pageContainer.currentPage
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getCurrentPage, removeCurrentPage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(PageContainer)
);

