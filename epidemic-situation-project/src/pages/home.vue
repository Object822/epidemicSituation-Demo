<template>
  <div home-wrapper class="home-wrapper">
    <header head>
      <div back-banner></div>
      <!-- <img src="../assets/images/map2.jpg" alt /> -->
      <div header-content>
        <div title-wrapper>
          <div detail-info>
            <p>截止 {{modifyTime}} 全国数据统计</p>
            <ul>
              <li>
                <span number num-red>{{descData.confirmedCount}}</span>
                <span info-tab>确诊病例</span>
              </li>
              <li>
                <span number num-suspecte>{{descData.suspectedCount}}</span>
                <span info-tab>疑似病例</span>
              </li>
              <li>
                <span number num-death>{{descData.deadCount}}</span>
                <span info-tab>死亡人数</span>
              </li>
              <li>
                <span number num-cure>{{descData.curedCount}}</span>
                <span info-tab>治愈人数</span>
              </li>
            </ul>
          </div>
          <div detail-reason>
            <ul>
              <li>
                <van-icon name="star" color="#411445" />
                <p>
                  <span>传染源：</span>
                  {{descData.infectSource}}
                </p>
              </li>
              <li>
                <van-icon name="star" color="#45224a" />
                <p>
                  <span>病毒：</span>
                  {{descData.virus}}
                </p>
              </li>
              <li>
                <van-icon name="star" color="#472d56" />
                <p>
                  <span>传播途径：</span>
                  {{descData.passWay}}
                </p>
              </li>
              <li>
                <van-icon name="star" color="#7d5886" />
                <p>{{descData.remark1}}</p>
              </li>
              <li>
                <van-icon name="star" color="#6f599c" />
                <p>{{descData.remark2}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <section>
      <van-tabs v-model="active" scrollspy sticky type="card">
        <div content-map>
          <van-tab title="疫情地图">
            <div situation-map>
              <h1>
                <p map-title>
                  <i></i>
                  <span>疫情地图</span>
                </p>
                <p class="source">数据来源: 天行数据</p>
              </h1>
              <div>
                <img :src="descData.imgUrl" alt />
                <img :src="descData.dailyPic" alt />
              </div>
            </div>
            <div city-lists>
              <table border="0" align="center" cellspacing="0" cellpadding="0">
                <tr>
                  <th>地区</th>
                  <th>确诊</th>
                  <th>死亡</th>
                  <th>治愈</th>
                </tr>
                <tr class="lists-content" v-for="(item, index) in newsList" :key="index">
                  <td>{{item.provinceName}}</td>
                  <td>{{item.confirmedCount}}</td>
                  <td>{{item.deadCount}}</td>
                  <td>{{item.curedCount}}</td>
                </tr>
              </table>
            </div>
          </van-tab>
        </div>
        <van-tab title="实时播报">
          <div situation-map>
            <h1>
              <p map-title>
                <i></i>
                <span>实时播报</span>
              </p>
              <p class="source">数据来源: 天行数据</p>
            </h1>
          </div>
          <ul news-wrapper>
            <li v-for="(item, index) in newsData" :key="index" @click="openDetail(item.sourceUrl)">
              <div news-time>
                <div>
                  <span>{{item.pubDateStr}}</span>
                  <span>{{item.pubDate | timeFilter}}</span>
                </div>
                <span news-circular></span>
                <span news-line></span>
              </div>
              <div news-content>
                <h1>
                  <span news-latest v-if="index === 0">最新</span>
                  {{item.title}}
                </h1>
                <p v-html="item.summary"></p>
                <p style="text-align: right;">{{item.infoSource}}</p>
              </div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="谣言鉴别">
          <div situation-map>
            <h1>
              <p map-title>
                <i></i>
                <span>谣言鉴别</span>
              </p>
              <p class="source">数据来源: 天行数据</p>
            </h1>
          </div>
          <div rumour-wrapper v-for="(item, index) in rumourData" :key="index">
            <div rumour-banner>
              <van-tag mark type="warning">{{item.explain}}</van-tag>
              <img :src="item.imgsrc" alt />
            </div>
            <h2>{{item.title}}</h2>
            <p rumour-content>{{item.desc}}</p>
            <p rumour-source>信息来源：{{item.author}} {{item.date}}</p>
          </div>
        </van-tab>
      </van-tabs>
      <div style="text-align: center;margin: 20px 0;">
        <van-tag plain type="warning">
          本工具纯属个人练习,数据来源"天行数据",如有雷同纯属巧合!!!
          <br />愿疫情尽快过去,众志成城,抗击疫情,祝大家身体健康,工作顺利!
          <br />---直行的大螃蟹
        </van-tag>
      </div>
    </section>
  </div>
</template>

<script>
import {
  getEpidemicSituation,
  getResistEpidemicSituation,
  getRumourData
} from "../api";
// require styles
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "home-wrapper",
  data() {
    return {
      active: 0,
      newsList: [],
      newsData: [],
      rumourData: [],
      descData: {},
      modifyTime: ""
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {},
  filters: {
    timeFilter(val) {
      return new Date(val).format("MM-dd hh:ss");
    }
  },
  methods: {
    async getData() {
      const cityData = await getEpidemicSituation();
      if (cityData.code === 200) {
        let { newslist } = cityData;
        this.newsList = newslist;
      } else {
        Toast.fail("请求失败");
      }
    },
    async getRumourData() {
      const rumourData = await getRumourData();
      if (rumourData.code === 200) {
        let { newslist } = rumourData;
        this.rumourData = newslist;
      } else {
        Toast.fail("请求失败");
      }
    },
    async getResistData() {
      const resistData = await getResistEpidemicSituation();
      if (resistData.code === 200) {
        let { newslist } = resistData;
        this.descData = newslist[0].desc;
        this.newsData = newslist[0].news;
        this.modifyTime = new Date(this.descData.modifyTime).format(
          "yyyy-MM-dd hh:ss"
        );
      } else {
        Toast.fail("请求失败");
      }
    },
    openDetail(url) {
      window.open(url);
    }
  },
  mounted() {
    this.getData();
    this.getResistData();
    this.getRumourData();
  }
};
</script>
<style lang="">
.home-wrapper .van-tabs__nav--card {
  height: 66px;
  margin: 0;
}
.home-wrapper .van-tabs__nav--card .van-tab {
  line-height: 66px;
  font-size: 25px;
}
.home-wrapper .van-tabs__content {
  margin-top: 25px;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.home-wrapper .van-tag--mark {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
[home-wrapper] {
  width: 100%;
  /* height: 100vh; */
  & [head] {
    width: 100%;
    background: #fedcbd;
    & [header-content] {
      background: url(../assets/images/banner.jpeg) no-repeat;
      background-size: 100%;
      overflow: hidden;
      & [title-wrapper] {
        margin: 200px 25px 30px;
        border-radius: 30px;
        padding: 20px;
        box-shadow: 0px 10px 15px #666;
        background: #fff;
      }
    }
  }
}
[content-map] {
  /* margin-top: 25px;
  background: #fff;
  padding: 20px;
  box-sizing: border-box; */
}
[detail-info] {
  & p {
    font-size: 25px;
    color: #666;
  }
  & ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 10px 40px;
    box-sizing: border-box;
    position: relative;
    & li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & [number] {
        font-size: 40px;
        font-weight: 600;
      }
      & [num-red] {
        color: #840228;
      }
      & [num-suspecte] {
        color: #f26522;
      }
      & [num-death] {
        color: #ed1941;
      }
      & [num-cure] {
        color: #007d65;
      }
      & [info-tab] {
        font-size: 25px;
      }
    }
  }
  & ul::after {
    content: "";
    position: absolute;
    height: 1px;
    background: #ebebeb;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
[detail-reason] {
  & ul {
    display: flex;
    flex-direction: column;
    & li {
      display: flex;
      flex-direction: row;
      align-items: center;
      & p {
        margin-left: 10px;
        & span {
          color: #f15a22;
          font-weight: 600;
        }
      }
    }
  }
}
[situation-map] {
  & h1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    & [map-title] {
      & i {
        display: inline-block;
        width: 10px;
        height: 30px;
        background: red;
      }
    }
    & .source {
      font-size: 25px;
      color: #666;
    }
  }
  & div {
    & img {
      width: 100%;
    }
  }
}
[city-lists] {
  & table {
    width: 100%;
    text-align: center;
    border-radius: 10px;
    overflow: hidden;
    & th {
      font-size: 35px;
      padding: 10px;
    }
    & tr th:nth-child(2n-1) {
      background: #f26522;
    }
    & tr th:nth-child(2n) {
      background: #007d65;
    }
    & .lists-content {
      height: 60px;
      & td {
        font-size: 18px;
      }
    }
    & .lists-content:nth-child(2n-1) {
      background: #e6e6e6;
    }
  }
}
[news-wrapper] {
  overflow: hidden;
  padding-top: 10px;
  & li {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    & [news-time] {
      position: relative;
      display: flex;
      justify-content: space-between;
      flex: 0 0 180px;
      margin-right: 15px;
      & div {
        display: flex;
        flex-direction: column;
        text-align: right;
        flex-grow: 1;
        margin-right: 15px;
        & span {
          font-size: 25px;
        }
        & span:nth-child(2) {
          color: #666;
        }
      }
      & [news-circular] {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #444693;
        box-shadow: 0px 0px 5px 5px #999;
        transform: translateY(10px);
      }
      & [news-line] {
        position: absolute;
        width: 3px;
        height: 999px;
        right: 10px;
        top: 35px;
        background: #e6e6e6;
      }
    }
    & [news-content] {
      background: #f2eada;
      padding: 10px;
      border-radius: 15px;
      & h1 {
        margin: 0;
        font-size: 35px;
        & [news-latest] {
          color: #fff;
          background: #f15a22;
          padding: 0 10px;
          border-radius: 10px;
          font-size: 30px;
        }
      }
      & p {
        font-size: 25px;
        color: #666;
      }
    }
  }
}
[rumour-wrapper] {
  border-radius: 10px;
  box-shadow: 0 0 5px 5px #e6e6e6;
  background: #fff;
  padding: 10px;
  margin-bottom: 20px;
  & [rumour-banner] {
    position: relative;
    & img {
      width: 100%;
    }
  }
  & h2 {
    font-size: 35px;
    color: #4e72b8;
    font-weight: 600;
  }
  & [rumour-content] {
    font-size: 25px;
  }
  & [rumour-source] {
    font-size: 20px;
    color: #666;
    text-align: right;
  }
}
</style>