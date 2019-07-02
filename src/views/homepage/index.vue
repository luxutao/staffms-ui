<template>
  <section>
    <el-col :span="24"><el-divider></el-divider></el-col>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height: 100px;" @click.native="gotoRouter('staffs')">
            <el-col :span="10" style="padding-left: 0px;">
              <div class="total-frame" style="background: #409EFF">
                <i class="fa fa-cube total-icon fa-3x"></i>
              </div>
            </el-col>
            <el-col :span="14" style="padding: 25px;height:100px;">
              <div class="total-title">未处理事项</div>
              <div class="total-value">200</div>
            </el-col>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height: 100px;" @click.native="gotoRouter('staffs')">
            <el-col :span="10" style="padding-left: 0px;">
              <div class="total-frame" style="background: #01DF01">
                <i class="fa fa-users total-icon fa-3x"></i>
              </div>
            </el-col>
            <el-col :span="14" style="padding: 25px;height:100px;">
              <div class="total-title">总人数</div>
              <div class="total-value">200</div>
            </el-col>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height: 100px;" @click.native="gotoRouter('staffs')">
            <el-col :span="10" style="padding-left: 0px;">
              <div class="total-frame" style="background: #D7DF01">
                <i class="fa fa-user-times total-icon fa-3x"></i>
              </div>
            </el-col>
            <el-col :span="14" style="padding: 25px;height:100px;">
              <div class="total-title">近期离职人数</div>
              <div class="total-value">200</div>
            </el-col>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height: 100px;" @click.native="gotoRouter('staffs')">
            <el-col :span="10" style="padding-left: 0px;">
              <div class="total-frame" style="background: #F7819F">
                <i class="fa fa-exclamation total-icon fa-3x"></i>
              </div>
            </el-col>
            <el-col :span="14" style="padding: 25px;height:100px;">
              <div class="total-title">异常事项</div>
              <div class="total-value">200</div>
            </el-col>
          </el-card>
        </div>
      </el-col>
      
      <el-col :span="12" style="margin-top: 50px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="fa fa-flag"></i> <span>新入职员工</span>
            <span v-if="loading"><i class="fa fa-spinner fa-spin fa-fw"></i></span>
            <span v-if="noMore"></span>
            <el-button style="float: right;" type="primary" size="mini" circle icon="fa fa-flag"></el-button>
          </div>
          <div style="height: 250px;overflow: auto">
            <ul class="infinite-list" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
              <li v-for="i in regis" class="infinite-list-item">
                <el-col :span="5" style="text-align: center">{{ i.name }}</el-col>
                <el-col :span="10" style="text-align: center">{{ i.department }}</el-col>
                <el-col :span="5" style="text-align: center">{{ i.date }}</el-col>
                <el-col :span="5" style="text-align: center">
                  <el-button icon="el-icon-d-arrow-right" circle size="small"></el-button>
                </el-col>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="12" style="margin-top: 50px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="fa fa-glass"></i> <span>员工数量</span>
            <el-button style="float: right;" type="success" size="mini" circle icon="fa fa-glass"></el-button>
          </div>
          <div>
            <el-col :span="24">
              <chart :options="staffsOption" style="height: 250px"></chart>
            </el-col>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import http from '@/common/js/utils/http';
  import api from '@/api';

  export default {
    data() {
      return {
        loading: false,
        total: 100,
        regis: [
          {name: '甲', department: '运维管理组', date: '2018-11-12 05:03:03'},
          {name: '乙', department: '运维管理组', date: '2018-11-12 05:03:03'},
          {name: '丙', department: '运维管理组', date: '2018-11-12 05:03:03'},
          {name: '丁', department: '运维管理组', date: '2018-11-12 05:03:03'},
        ],
        staffsOption: {
          title : {
            text: '人员分布',
            subtext: '所有人员的分布情况',
            x:'left'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} 人({d}%)"
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: ['所有人员','在职人员','离职人员','未处理人员'],
          },
          series : [
            {
              name: '人员分布',
              type: 'pie',
              radius : ['50%', '70%'],
              center: ['50%', '50%'],
              data: [
                {value: 10, name: '所有人员'},
                {value: 10, name: '在职人员'},
                {value: 10, name: '离职人员'},
                {value: 10, name: '未处理人员'},
              ],
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
      }
    },
    computed: {
      noMore () {
        return this.regis.length >= this.total
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      gotoRouter(path) {
        this.$router.push({
          path: path
        })
      },
      load () {
        this.loading = true
        setTimeout(() => {
          this.regis.push({name: Math.floor((Math.random()*100)+1), department: '运维管理组', date: '2018-11-12 05:03:03'});
          this.loading = false
        }, 2000)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import './style.scss'
</style>
