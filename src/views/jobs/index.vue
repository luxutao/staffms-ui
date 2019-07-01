<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar">
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formInline.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="职能" prop="title">
              <el-select v-model="formInline.title" placeholder="请选择">
                <el-option v-for="title in titles" :key="title" :label="title" :value="title"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getJobs()">查 询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" @click="addjobVisible = true" style="float:right">添加职位</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-table :data="jobsTable" border style="width: 100%" :cell-style="cellStyle">
      <el-table-column align="center" prop="id" label="职位ID" width="120"></el-table-column>
      <el-table-column align="center" prop="name" label="名称" width="360"></el-table-column>
      <el-table-column align="center" prop="title" label="职能" width="180"></el-table-column>
      <el-table-column align="center" prop="rank" label="职级" width="180"></el-table-column>
      <el-table-column align="center" prop="staffcounts" label="员工数量" width="180"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="delJob(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" align=right style="margin-top: 20px">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="formInline.page" :page-sizes="[10, 20, 30, 50]" :page-size="formInline.size" layout="sizes, prev, pager, next" :total="linetotal">
      </el-pagination>
    </el-col>

    <el-dialog title="添加职位" :visible.sync="addjobVisible" width="30%" center>
      <el-form :model="addJobForm" status-icon :rules="addJobRules" ref="addJobForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name" style="padding-bottom: 20px">
          <el-input v-model.number="addJobForm.name"></el-input>
        </el-form-item>
        <el-form-item label="职能" prop="title" style="padding-bottom: 20px">
          <el-input v-model.number="addJobForm.title"></el-input>
        </el-form-item>
        <el-form-item label="职级" prop="level" style="padding-bottom: 20px">
          <el-select v-model="addJobForm.level" placeholder="请选择">
            <el-option v-for="count in 9" :key="count" :label="count" :value="count"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="副职级" prop="sublevel">
          <el-select v-model="addJobForm.sublevel" placeholder="请选择">
            <el-option v-for="count in 9" :key="count" :label="count" :value="count"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetaddJob('addJobForm')">重 置</el-button>
        <el-button type="primary" @click="addJob('addJobForm')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import http from '@/common/js/utils/http';
  import api from '@/api';

  export default {
    data() {
      return {
        formInline: {
          name: '',
          title: '',
          page: 1,
          size: 10
        },
        linetotal:0,
        jobsTable: [],
        titles: [],
        addjobVisible: false,

        addJobForm: {
          name: '',
          title: '',
          level: '',
          sublevel: ''
        },
        addJobRules: {
          name: [{required: true, min: 1, message: '请输入一个名称', trigger: 'blur'}],
          title: [{required: true, min: 1, message: '请输入一个职能', trigger: 'blur'}],
          level: [{required: true, message: '请输入一个职级', trigger: 'blur'}],
          sublevel: [{required: true, message: '请输入一个副职级', trigger: 'blur'}],
        }
      }
    },
    methods: {
      cellStyle({row, column, rowIndex, columnIndex}){
        if(row.staffcounts == 0 && columnIndex == 5){
          return 'color: red'
        } else if (row.staffcounts != 0 && columnIndex == 5){
          return 'color: green'
        }
      },
      getTitles() {
        http(api.gettitles, {}).then(res => {
          this.titles = res.data;
        }).catch(error => {
          console.log(error)
        })
      },
      getJobs() {
        http(api.getjobs, {
          params: this.formInline
        }).then(res => {
          this.jobsTable = res.data.data;
          this.linetotal = res.data.total;
        }).catch(error => {
          console.log(error)
        })
      },
      delJob(row) {
        this.$confirm('此操作将删除该职位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          if (row.staffcounts > 0) {
            this.$message({type: "error",message:"该职位有绑定员工"})
            return false;
          }
          http(api.deljob, {
            headers:{'Content-Type': 'application/json; charset=UTF-8'},
            type: 'post',
            data: {
              jobid: row.id
            }
          }).then(res => {
            this.$message({type:"success",message:"删除成功"})
            this.getJobs();
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {})
      },
      resetaddJob(formName) {
        this.$refs[formName].resetFields();
      },
      addJob(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            http(api.addjob, {
              headers: {'Content-Type': 'application/json; charset=UTF-8'},
              type: 'post',
              data: this.addJobForm
            }).then(res => {
              this.$message({type:"success",message:"添加成功"});
              this.addjobVisible = false;
              this.resetaddJob('addJobForm');
              this.getJobs();
              this.getTitles();
            })
          } else {
            console.log('提交错误');
            return false;
          }
        });
      },
      handleSizeChange(val) {
        this.formInline.size = val;
        this.formInline.page = 1;
        this.getJobs();
      },
      handleCurrentChange(page) {
        this.formInline.page = page;
        this.getJobs();
      }
    },
    mounted() {
      this.getTitles();
      this.getJobs();
    }
  }
</script>


<style scoped lang="scss">
  @import './style.scss';
</style>
