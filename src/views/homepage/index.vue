<template>
  <section>
    <el-col :span="24"><el-divider></el-divider></el-col>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height: 100px;cursor:pointer" @click.native="gotoRouter('/staffs')">
            <el-col :span="10" style="padding-left: 0px;">
              <div class="total-frame" style="background: #409EFF">
                <i class="fa fa-cube total-icon fa-3x"></i>
              </div>
            </el-col>
            <el-col :span="14" style="padding: 25px;height:100px;">
              <div class="total-title">未处理事项</div>
              <div class="total-value">{{ untreated }}</div>
            </el-col>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height: 100px;cursor:pointer" @click.native="gotoRouter('/staffs')">
            <el-col :span="10" style="padding-left: 0px;">
              <div class="total-frame" style="background: #01DF01">
                <i class="fa fa-users total-icon fa-3x"></i>
              </div>
            </el-col>
            <el-col :span="14" style="padding: 25px;height:100px;">
              <div class="total-title">总人数</div>
              <div class="total-value">{{ stafftotal }}</div>
            </el-col>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height: 100px;cursor:pointer" @click.native="gotoRouter('/staffs')">
            <el-col :span="10" style="padding-left: 0px;">
              <div class="total-frame" style="background: #D7DF01">
                <i class="fa fa-user-times total-icon fa-3x"></i>
              </div>
            </el-col>
            <el-col :span="14" style="padding: 25px;height:100px;">
              <div class="total-title">近期离职人数</div>
              <div class="total-value">{{ leavetotal }}</div>
            </el-col>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height: 100px;cursor:pointer" @click.native="gotoRouter('/staffs')">
            <el-col :span="10" style="padding-left: 0px;">
              <div class="total-frame" style="background: #F7819F">
                <i class="fa fa-exclamation total-icon fa-3x"></i>
              </div>
            </el-col>
            <el-col :span="14" style="padding: 25px;height:100px;">
              <div class="total-title">异常事项</div>
              <div class="total-value">{{ warning }}</div>
            </el-col>
          </el-card>
        </div>
      </el-col>
      
      <el-col :span="12" style="margin-top: 50px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="fa fa-flag"></i> <span>新入职员工</span>
            <span v-if="loading"><i class="fa fa-spinner fa-spin fa-fw"></i></span>
            <el-button style="float: right;" type="primary" size="mini" circle icon="fa fa-flag"></el-button>
          </div>
          <div style="height: 250px;overflow: auto">
            <ul class="infinite-list">
              <li v-for="i in regis" class="infinite-list-item">
                <el-col :span="5" style="text-align: center">{{ i.name }}</el-col>
                <el-col :span="10" style="text-align: center">{{ i.phone }}</el-col>
                <el-col :span="5" style="text-align: center">{{ i.create_time }}</el-col>
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
            <el-button style="float: right;" type="success" size="mini" circle icon="fa fa-glass" @click="gotoRouter('/staffs')"></el-button>
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
        untreated: 0,
        stafftotal: 0,
        leavetotal: 0,
        warning: 0,

        loading: true,
        regis: [],
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
    methods: {
      gotoRouter(path) {
        this.$router.push({
          path: path
        })
      },
      getnews () {
        http(api.getnews, {}).then(res => {
          this.regis = res.data;
          this.loading = false;
        }).catch(error => {
          console.log(error);
        })
      },
      getcard() {
        http(api.getcard, {
        }).then(res => {
          this.untreated = res.data.untreated;
          this.stafftotal = res.data.stafftotal;
          this.leavetotal = res.data.leavetotal;
          this.warning = res.data.warning;
          this.staffsOption.series[0].data[0].value = res.data.stafftotal;
          this.staffsOption.series[0].data[1].value = res.data.is_worker;
          this.staffsOption.series[0].data[2].value = res.data.not_worker;
          this.staffsOption.series[0].data[3].value = res.data.untreated;
        }).catch(error => {
          console.log(error);
        })
      }
    },
    mounted() {
      setTimeout(() => {
        this.getnews();
      }, 2000)
      this.getcard();
      setInterval(() => {
        this.loading = true;
        this.getnews();
        this.getcard();
      }, 10000);
    }
  }
</script>

<style scoped lang="scss">
  @import './style.scss'
</style>
