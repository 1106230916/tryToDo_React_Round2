import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import axios from "axios";
// import reportWebVitals from './reportWebVitals';

class All extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: "",
      description: [],
      brand_related: "",
      product_details: ""
    }
  }

  componentDidMount(){
    /* 产品信息 */
    let url = "https://5thave-dev.bieyangapp.com/api/v1/products/footlocker_2XSBSW1?promo=true&groupBuy=false"
    axios.get(url).then((response) => {
      const data = response.data;
      this.setState({
        data: data
      })
    }).catch(function(error){
      console.log(error)
    })

    /* 厂商描述 */
    let description_url = "https://5thave-prod.bieyangapp.com/api/v1/translate/product/footlocker_2XSBSW1"
    axios.get(description_url).then((response) => {
      console.log(response.data);
      this.setState({
        description: response.data.description
      })
    }).catch((error) => {
      console.log(error);
    })

    /* 品牌信息 */
    let brand_related_url = "https://5thave-dev.bieyangapp.com/api/v1/products/footlocker_2XSBSW1/related"
    axios.get(brand_related_url).then((response) => {
      console.log(response.data);
      this.setState({
        brand_related: response.data
      })
    }).catch((error) => {
      console.log(error)
    })

    /* 相似商品 */
    let product_details_url = "https://5thave-dev.bieyangapp.com/api/v2/products/footlocker_2XSBSW1/similar/context/PRODUCT_DETAILS"
    axios.get(product_details_url, {
      headers: {
        "content-type": "application/x-protobuf-json"
      },
      data: {},
    }).then((response) => {
      // response.headers["content-type"] = "application/x-protobuf-json";
      console.log(response)
      console.log(response.data);
      this.setState({
        product_details: response.data
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  render(){
    console.log(this.state.data);
    return ((this.state.data !== "" && this.state.description !== [] && this.state.brand_related !== "" && this.state.product_details !== "") ?
      <React.Fragment>
        <Topshow data={this.state.data}/>
        <ImgShow data={this.state.data}/>
        <ProductInfos data={this.state.data}/>
        <SizeChoose data={this.state.data}/>
        <Server data={this.state.data}/>
        <Comment data={this.state.data}/>
        <Merchant data={this.state.data} merchant={this.state.brand_related.merchant}/>
        <ProductAttr data={this.state.data}/>
        <ProductDescription data={this.state.data}/>
        <OfficialInfos data={this.state.data} description={this.state.description} name={this.state.brand_related.merchant.name}/>
        <BrandInfos data={this.state.data} brand={this.state.brand_related.brand}/>
        <Protect data={this.state.data}/>
        <SimilarProduct data={this.state.data} product_details={this.state.product_details}/>
        <ProductButton data={this.state.data}/>
      </React.Fragment>
    : null)
  }
}

/** 顶部的产品宣传 */
class Topshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topShow: true
    }
  }

  topShow(e) {
    const topShow = this.state.topShow;
    this.setState({
      topShow: false
    })
  }

  render() {
    const topShow = this.state.topShow;
    return (
      <div className="top_bar">
        {topShow ? <img className="close" onClick={this.topShow.bind(this)} src={require("./assets/close.35b50b62.svg").default} alt=""/>
          : null}
        <img className="logo" src={require("./assets/logo.7a06eae3.png").default} alt=""/>
        <div className="content">
          <div className="text01">别样海外购APP</div>
          <div className="text02">新用户可限时领取<span className="yellow">666元大礼包</span></div>
        </div>
        <div className="open">打开APP</div>
      </div>
    )
  }
}

/** 大图展示，图片以及变化的小标 */
class ImgShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: -1,
      // mark: -1,
      move: [0, 0],
      // transition: "left 0.6s"
    }
    this.activity = this.activity.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  onTouchStart(e) {
    const move = this.state.move;
    const down_x = parseInt(e.changedTouches[0].clientX);
    console.log(down_x);
    this.setState({
      move: [down_x, move[1]]
    })
  }

  onTouchEnd(e) {
    const move = this.state.move;
    // let mark =  this.state.mark;
    const up_x = parseInt(e.changedTouches[0].clientX);
    console.log(up_x);
    this.setState({
      move: [move[0], up_x]
    })
    if (move[0] > up_x) {
      console.log("向左滑")
      // this.setState({
      //   transition: "left 0.6s",
      //   mark: mark >= -this.props.data.images.length ? mark - 1 : mark
      // })
      // console.log(this.state.mark);
    } else if (move[0] < up_x) {
      console.log("向右滑")
      // this.setState({
      //   transition: "left 0.6s",
      //   mark: mark >= -this.props.data.images.length ? mark + 1 : mark
      // });
    }
  }

  // componentDidMount(){
  //   // console.log(this.state.transition)
  // }

  // componentDidUpdate(){
  //   // clearTimeout();
  //   // console.log(this.state.mark);
  //   // const mark = this.state.mark;
  //   // if (mark === -this.props.data.images.length-1 || mark === 0){
  //   //   setTimeout(()=>{
  //   //     console.log("wait");
  //   //     this.setState({
  //   //       transition: "none",
  //   //       mark: mark === 0 ? -this.props.data.images.length : -1 ,
  //   //     })
  //   //   },600)
  //   // } else {
  //   //   return null;
  //   // }
  //   // if (mark === 0){
  //   //   this.setState({
  //   //     transition: "none",
  //   //     mark: -this.props.data.images.length
  //   //   })
  //   // }
  // }

  activity(index) {
    const activity = index;
    this.setState({
      activity: activity
    })
  }

  render() {
    const data = this.props.data;
    const activity = this.state.activity;
    // const left = this.state.mark + "00%";
    // const transition = this.state.transition;
    return(
      <div className="imgShow">
        <div className="carousel">
          <div className="carousel_slice" onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
            <img
              className="carousel_img"
              key={data.images[0].full.id}
              src={data.images[0].full.url} 
              alt=""/>
            {/* <img
              className="carousel_img"
              key={data.images[data.images.length-1].full.id}
              src={data.images[data.images.length-1].full.url} 
              alt=""
              style={{transition: "none" ,left: left}}/>
            {data.images.map((item, index) => {
              return(
                <img
                 className="carousel_img"
                 key={item.id}
                 src={item.full.url}
                 alt=""
                 style={{transition: "left 0.6s",left: left}}/>
              )
            })}
            <img
              className="carousel_img"
              key={data.images[0].full.id}
              src={data.images[0].full.url} 
              alt=""
              style={{transition: "none",left: left}}/> */}
          </div>
          <div className="carousel_mark">

          </div>
        </div>
        <div className="color_picker">
          <div className="color_item" onClick={this.activity.bind(this, -1)}>
            <div key={data.images[0].productId}
             className={activity === -1 ? "color_img activity" : "color_img"}
             style={{
              background: "url("+data.images[0].full.url+") 100%",
              backgroundSize: "100% 100%"
            }}></div>
            <div className="color_text">
              商品预览
            </div>
          </div>
          <div className="line"></div>
          {
            data.colors.map((item, index) => {
              return (
                <div className="color_item"
                     key={item.image.id}
                     onClick={this.activity.bind(this, index)}>
                  <div className={activity === index ? "color_img activity" : "color_img"} style={{
                    background: "url("+item.image.full.url+") 100%",
                    backgroundSize: "100% 100%"
                  }}></div>
                  <div className="color_text">
                    {item.name}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

/** 产品的详情，包括美元，人民币，折扣，款式，详细款式，产品保障，优惠 */
class ProductInfos extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.data;
    return(
      <div className="product_infos">
        <div className="dollar_price">
          <div className="dollar_price_now">
            {data.priceTag}
          </div>
          <div className="dollar_price_prev">
          {data.originalPriceTag}
          </div>
        </div>
        <div className="CNY_price">
          {data.priceTagCN}
        </div>
        <div className="discounts">
          <div className="discount">特惠</div>
          <div className="discount">6.9折</div>
          <div className="discount">满折</div>
        </div>
        <div className="title_main">
          {data.gender + " " + data.brand + " | " + data.name}
        </div>
        <div className="title_second"></div>
        <div className="protect">
          <div className="protect_item">
            <img src={require("./assets/new_product_details_page_protection3@2x.png").default} alt=""/>
            <div>机器人下单</div>
          </div>
          <div className="protect_item">
            <img src={require("./assets/new_product_details_page_protection4@2x.png").default} alt=""/>
            <div>官网直邮</div>
          </div>
          <div className="protect_item">
            <img src={require("./assets/new_product_details_page_service@2x.png").default} alt=""/>
            <div>100%正品</div>
          </div>
        </div>
        <div className="go_login">
          <div className="go_login_text">
            <div className="red">新人</div>
            <div>注册送￥688元新人礼包</div>
          </div>
          <div className="go_login_button">
            登录领取 {" >"}
          </div>
        </div>
        <div className="promotion">
          <div className="title">促销</div>
          <div className="content">
            <div className="discount"></div>
            <div className="detail">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class SizeChoose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: [false,false]
    }
  }

  render() {
    const select = this.state.select;
    return(
      <div className="size_choose">
        <div className="title">
          <div className="img"></div>
          规格
        </div>
        <div className="tips">
          请选择
          <span className={select[0] ? "" : "unselect"}>颜色</span>
          <span className={select[1] ? "" : "unselect"}>尺码</span>
        </div>
      </div>
    )
  }
}

/** 服务信息 */
class Server extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverShow: false
    }
  }

  serverShow(e) {
    const serverShow = this.state.serverShow;
    this.setState({
      serverShow: !serverShow
    })
  }

  render() {
    const data = this.props.data;
    const serverShow = this.state.serverShow;
    return(
      <div className="server">
        <div className="title" onClick={this.serverShow.bind(this)}>
          服务
        </div>
        <div className="content">
          {data.featureGroup.features.map((item, index) => {
            return (
              <div
                key={item.name}
                className="item"
                style={item.label[0]}>
                {item.label[0].text}
              </div>
            )
          })}
        </div>  
        <div className="server_content" style={{width: serverShow ? "100%" : "0",height: serverShow ? "100%" : "0"}}>
          <div className="dark" onClick={this.serverShow.bind(this)} style={{opacity: serverShow ? "1" : "0",width: serverShow ? "100%" : "0",height: serverShow ? "100%" : "0"}}></div>
          <div className="server_infos" style={{bottom: serverShow ? "0" : "-100%"}}>
            <div className="server_title">
              <div>服务</div>
              <img src={require("./assets/close@2x.png").default} alt="" onClick={this.serverShow.bind(this)}></img>
            </div>
            <div className="content">
              {data.featureGroup.features.map((item, index) => {
                return (      
                  <div key={item.name} className="item_02">
                    <div className="item_title" style={item.label[0]}>
                      {item.name}
                    </div>
                    <div className="item_content">
                      {item.desc}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/** 商品的评价，包括title，以及两条评价，查看更多 
 *  需要调用另一个api，暂且搁置
*/
class Comment extends React.Component {
  render() {
    return(
      <></>
    )
  }
}

/** 厂商信息，以及推荐 */
class Merchant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      costInfoShows: false
    }
  }

  costInfoShows(e) {
    const costInfoShows = this.state.costInfoShows;
    this.setState({
      costInfoShows: !costInfoShows
    })
  }

  render() { 
    const data = this.props.data;
    const merchant = this.props.merchant;
    const costInfoShows = this.state.costInfoShows;
    return(
      <div className="merchant">
        <div className="title">
          商场&nbsp;
          {merchant.name}
        </div>
        <div className="infos" style={{backgroundImage: "url("+merchant.images[1].full.url+")"}}>
          <img src={merchant.images[0].full.url} alt=""/>
          <div className="info">
            <div className="specialties">
              {merchant.specialties}
            </div>
            <div className="costInfo" onClick={this.costInfoShows.bind(this)}>
              {merchant.costInfo.summary}
            </div>
          </div>
        </div>
        <div className="costInfos_content" style={{width: costInfoShows ? "100%" : "0",height: costInfoShows ? "100%" : "0"}}>
          <div className="dark" onClick={this.costInfoShows.bind(this)} style={{opacity: costInfoShows ? "1" : "0",width: costInfoShows ? "100%" : "0",height: costInfoShows ? "100%" : "0"}}></div>
          <div className="costInfos_infos" style={{bottom: costInfoShows ? "0" : "-100%"}}>
            <div className="costInfos_title">
              <div>{merchant.name + "商家运费"}</div>
              <img src={require("./assets/close@2x.png").default} alt="" onClick={this.costInfoShows.bind(this)}></img>
            </div>
            <div className="content">
              {merchant.costDetails.faq.questions.map((item, index) => {
                return (      
                  <div key={item.q.text+index} className="item_02">
                    <div className="item_question">
                      <div>Q:&nbsp;&nbsp;</div>
                      <div>{item.q.text}</div>
                    </div>
                    <div className="item_answer">
                      <div>A:&nbsp;&nbsp;</div>
                      <div>{item.a.text}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="product">
          {merchant.recommendProducts.map((item, index) => {
            return (
              <div className="product_item" key={item.id}>
                <div className="img">
                  <img src={item.image.path} alt=""/>
                </div>
                <div className="name">
                  {item.label}
                </div>
                <div className="price">
                  {item.marks[1] ? 
                  <><div className="discount_price">
                    {item.marks[0]}
                  </div>
                  <div className="origin_price">
                    {item.marks[1]}
                  </div></>
                  : 
                  <div className="normal_price">
                    {item.marks[0]}
                  </div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

/** 商品的参数 */
class ProductAttr extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const data = this.props.data;
    return(
      <div className="product_attr">
        <div className="title">
          商品参数
        </div>
        <div className="content">
          <div className="item">
            <div className="top">材质</div>
            <div className="bottom">{data.attributes.attributes.material.choices[0]}</div>
          </div>
          <div className="item">
            <div className="top">细节</div>
            {data.keyDetails.map((item, index)=>{
              return (
                <div className="bottom" key={item}>
                  {item}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

/** 商品的描述 */
class ProductDescription extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return(
      <div className="product_description">
        <div className="title">
          商品描述
        </div>
        <div className="content">
          {data.images.map((item, index) => {
            return (
              <img src={item.full.url} key={item.id} alt=""/>
            )
          })} 
        </div>
      </div>
    )
  }
}

/** 官网详细信息 */
class OfficialInfos extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const data = this.props.data;
    const description = this.props.description;
    const name = this.props.name;
    // console.log(description)
    return(
      <div className="officialInfos">
        <div className="title">
          {name + "官网详情"}
        </div>
        <div className="content">
          {description === [] ? null : description.map((item, index)=>{
            return (
              <div className="item" key={item}>
                {item}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

/** 品牌信息 */
class BrandInfos extends React.Component {
  constructor(props) { 
    super(props);
  }
  render() {
    const brand = this.props.brand;
    console.log(brand);
    return(
      <div className="brandInfos">
        <div className="title">
          <img src={brand.icon.full.url} alt=""/>
          <div className="name">
            <div className="name_en">
              {brand.name}
            </div>
            <div className="name_cn">
              {brand.nameCN}
            </div>
          </div>
        </div>
        <div className="content">
          {brand.descriptions}
        </div>
        <div className="product">
          {brand.recommendProducts.map((item, index) => {
            return (
              <div className="product_item" key={item.id}>
                <div className="img">
                  <img src={item.image.path} alt=""/>
                </div>
                <div className="name">
                  {item.label}
                </div>
                <div className="price">
                  {item.marks[1] ? 
                  <><div className="discount_price">
                    {item.marks[0]}
                  </div>
                  <div className="origin_price">
                    {item.marks[1]}
                  </div></>
                  : 
                  <div className="normal_price">
                    {item.marks[0]}
                  </div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

/** 别样保障 */
class Protect extends React.Component {
  render() {
    return(
      <div className="protect">
        <div className="title">
          别样保障
        </div>
        <div className="content">
          <img src={require("./assets/quality-protect-guarantee.a7d1dc34.png").default} alt=""/>
        </div>
      </div>
    )
  }
}

/** 相似产品 */
class SimilarProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    const product_details = this.props.product_details;
    return(
      <div className="similarProduct">
        <div className="title">
          相似商品
        </div>
        <div className="content">
          {product_details.products.map((item, index) => {
            return (
              <div className="product_item" key={item.product.merchantId+index}>
                {item.product.colors.length !== 0 ?
                  <div className="count">
                  {item.product.colors.length + "色可选"}
                </div> : null}
                <div className="img">
                  <img src={item.product.images[0].full.url} alt=""/>
                </div>
                <div className="infos">
                  <div className="name">{item.product.brand + " | " +item.product.name}</div>
                  <div className="origin">{item.origin+item.merchantName}</div>
                  <div className="price">
                    {item.off ? <div className="discount">{item.off}</div> : null}
                    <div className="price_en">{item.product.priceTag}</div>
                  </div>
                  <div className="price_and_mark">
                    <div className="price_cn">
                      {item.product.priceTagCN}
                    </div>
                    <div className="mark_count">
                      {item.product.favoritedCount ? item.product.favoritedCount : "0" }人收藏
                    </div>
                  </div>
                  {/* {item.activityOffs ? : null} */}
                  <div className="activityOffs">
                    {item.activityOffs.map((item, index) => {
                      return (
                        <div className="off" key={item}>
                          {item}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

/** 底部功能按钮 */
class ProductButton extends React.Component {
  render() {
    return(
      <div className="buttonBar">
        <div className="item">
          <div>
            <img src={require("./assets/new_product_details_page_store@2x.png").default} alt=""/>
          </div>
        </div>
        <div className="item">
          <div>
            <img src={require("./assets/new_product_details_page_customer@2x.png").default} alt=""/>
          </div>
        </div>
        <div className="item">
          <div>
            <img src={require("./assets/new_product_details_page_shoppingbag@2x.png").default} alt=""/>
          </div>
        </div>
        <div className="add_to_shoppingcart">
          加入购物车
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <All />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
