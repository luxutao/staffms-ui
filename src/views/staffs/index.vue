<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formInline.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getStaffs()">查 询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-col>
    <el-table :data="staffsTable" border style="width: 100%">
      <el-table-column align="center" prop="id" label="员工ID" width="120"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column align="center" prop="number" label="员工编号" width="180"></el-table-column>
      <el-table-column align="center" prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column align="center" prop="job.name" label="职位" width="180"></el-table-column>
      <el-table-column align="center" prop="company.name" label="所属公司" width="180"></el-table-column>
      <el-table-column align="center" prop="department.name" label="部门" width="180"></el-table-column>
      <el-table-column align="center" prop="leader" label="直属上级" width="180"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" align=right style="margin-top: 20px">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="formInline.page" :page-sizes="[10, 20, 30, 50]" :page-size="formInline.size" layout="sizes, prev, pager, next" :total="linetotal">
      </el-pagination>
    </el-col>
  </section>
</template>

<script>
  import http from '@/common/js/utils/http';
  import api from '@/api';

  export default {
    data() {
      return {
        staffsTable: [],
        formInline: {
          name: '',
          page: 1,
          size: 10
        },
        linetotal:0,
      }
    },
    methods: {
      getStaffs() {
        http(api.getStaffs, {
          params: this.formInline
        }).then(res => {
          this.staffsTable = res.data.data;
          this.linetotal = res.data.total;
        }).catch(error => {
          console.log(error)
        })
      },
      handleSizeChange(val) {
        this.formInline.size = val;
        this.formInline.page = 1;
        this.getStaffs();
      },
      handleCurrentChange(page) {
        this.formInline.page = page;
        this.getStaffs();
      }
    },
    mounted() {
      this.getStaffs();
    }
  }
</script>

<style scoped lang="scss">
  @import './style.scss';
</style>
