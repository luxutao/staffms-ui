<template>
  <section>
    <el-col :span="24"><el-divider></el-divider></el-col>
    <el-col :span="24">
      <el-col :span="2" :offset="4">
        <p style="text-align: center">总员工数</p>
      </el-col>
      <el-col :span="2" :offset="4">
        <p style="text-align: center">在职员工数</p>
      </el-col>
      <el-col :span="2" :offset="4">
        <p style="text-align: center">离职员工数</p>
      </el-col>
    </el-col>
    <el-col :span="24">
      <el-col :span="2" :offset="4">
        <p style="text-align: center">{{total_worker}}</p>
      </el-col>
      <el-col :span="2" :offset="4">
        <p style="text-align: center">{{is_worker}}</p>
      </el-col>
      <el-col :span="2" :offset="4">
        <p style="text-align: center">{{not_worker}}</p>
      </el-col>
    </el-col>
    <el-col :span="24"><el-divider></el-divider></el-col>
    <el-col :span="11">
      <strong>部门分布</strong>
      <el-col :span="24">
        <chart :options="departoption" :auto-resize="true"></chart>
      </el-col>
    </el-col>
    <el-col :span="1" :offset="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :span="11">
      <strong>公司分布</strong>
      <el-col :span="24">
        <chart :options="companyoption" :auto-resize="true"></chart>
      </el-col>
    </el-col>
  </section>
</template>

<script>
  import http from '@/common/js/utils/http';
  import api from '@/api';

  export default {
    data() {
      return {
        is_worker: 0,
        not_worker: 0,
        total_worker: 0,

        departoption: {
          title : {
            text: '部门人员分布',
            subtext: '各部门所有人员的分布情况',
            x:'center'
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
            data: ['A','B','C','D','E','F','G','H','I','J','a','b','c','d','e','f','g'],
          },
          series : [
            {
              name: '部门',
              type: 'pie',
              radius : '55%',
              center: ['40%', '50%'],
              data: [
                {value: 10, name: 'A'},
                {value: 10, name: 'B'},
                {value: 10, name: 'C'},
                {value: 10, name: 'D'},
                {value: 10, name: 'E'},
                {value: 10, name: 'F'},
                {value: 10, name: 'G'},
                {value: 10, name: 'H'},
                {value: 20, name: 'I'},
                {value: 20, name: 'J'},
                {value: 10, name: 'a'},
                {value: 10, name: 'b'},
                {value: 10, name: 'c'},
                {value: 10, name: 'd'},
                {value: 20, name: 'e'},
                {value: 20, name: 'f'},
                {value: 20, name: 'g'},
              ],
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
        companyoption: {
          title : {
            text: '公司人员分布',
            subtext: '各公司所有人员的分布情况',
            x:'center'
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
            data: ['A','B','C','D','E','F','G','H','I','J','a','b','c','d','e','f','g'],
          },
          series : [
            {
              name: '公司',
              type: 'pie',
              radius : '55%',
              center: ['40%', '50%'],
              data: [
                {value: 10, name: 'A'},
                {value: 10, name: 'B'},
                {value: 10, name: 'C'},
                {value: 10, name: 'D'},
                {value: 10, name: 'E'},
                {value: 10, name: 'F'},
                {value: 10, name: 'G'},
                {value: 10, name: 'H'},
                {value: 20, name: 'I'},
                {value: 20, name: 'J'},
                {value: 10, name: 'a'},
                {value: 10, name: 'b'},
                {value: 10, name: 'c'},
                {value: 10, name: 'd'},
                {value: 20, name: 'e'},
                {value: 20, name: 'f'},
                {value: 20, name: 'g'},
              ],
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
      getChartdata() {
        http(api.getChartdata, {
          params: {}
        }).then(res => {
          this.is_worker = res.data.staff.is_worker;
          this.not_worker = res.data.staff.not_worker;
          this.total_worker = res.data.staff.total_worker;
          this.departoption.series[0].data = res.data.department;
          this.companyoption.series[0].data = res.data.company;
          let companys = [];let departs = [];
          res.data.company.forEach(company => {
            companys.push(company.name)
          });
          res.data.department.forEach(depart => {
            departs.push(depart.name)
          });
          this.departoption.legend.data = departs;
          this.companyoption.legend.data = companys;

        }).catch(error => {
          console.log(error)
        })
      }
    },
    mounted() {
      this.getChartdata();
    }
  }
</script>

<style scoped lang='scss'>
  @import './style.scss'
</style>
