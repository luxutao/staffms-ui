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
    <el-table :data="staffsTable" border style="width: 100%" :cell-style="cellStyle">
      <el-table-column align="center" prop="id" label="员工ID" width="120"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column align="center" prop="number" label="员工编号" width="120"></el-table-column>
      <el-table-column align="center" prop="is_leave" label="是否离职" width="120"></el-table-column>
      <el-table-column align="center" prop="email" label="邮箱" width="250"></el-table-column>
      <el-table-column align="center" prop="job.name" label="职位" width="180"></el-table-column>
      <el-table-column align="center" prop="company.name" label="所属公司" width="360"></el-table-column>
      <el-table-column align="center" prop="department.name" label="部门" width="180"></el-table-column>
      <el-table-column align="center" prop="leader" label="直属上级" width="120"></el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showDetail(scope.row)">查看详情</el-button>
          <el-button type="text" size="small" @click="changeDetail(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" align=right style="margin-top: 20px">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="formInline.page" :page-sizes="[10, 20, 30, 50]" :page-size="formInline.size" layout="sizes, prev, pager, next" :total="linetotal">
      </el-pagination>
    </el-col>

    <el-dialog title="修改信息" :visible.sync="changeStaffVisible" width="30%" center>
      <el-form :model="changeStaffForm" status-icon :rules="changeStaffRules" ref="changeStaffForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="字段" prop="column" style="padding-bottom: 20px">
          <el-select v-model="changeStaffForm.column" placeholder="请选择" filterable style="width: 100%" @change="changeParent">
            <el-option v-for="item in columns" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值" prop="value" style="padding-bottom: 20px">
          <el-input v-model="changeStaffForm.value" v-show="!isselected"></el-input>
          <el-select v-model="changeStaffForm.value" placeholder="请选择" filterable style="width: 100%" v-show="isselected">
            <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetChangeStaff('changeStaffForm')">重 置</el-button>
        <el-button type="primary" @click="ChangeStaff('changeStaffForm')">确 定</el-button>
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
        staffsTable: [],
        formInline: {
          name: '',
          page: 1,
          size: 10
        },
        linetotal:0,

        items: [],
        isselected: false,
        columns: [
          {name: '手机号', value: 'phone'},
          {name: '是否离职', value: 'is_leave'},
          {name: '薪酬', value: 'salary'},
          {name: '所属公司', value: 'company'},
          {name: '所属部门', value: 'department'},
          {name: '职位', value: 'job'},
          {name: '直属上级', value: 'leader'},
        ],
        changeStaffVisible: false,
        changeStaffForm: {
          id: '',
          column: '',
          value: ''
        },
        changeStaffRules: {
          column: [{required: true, message: '请选择一个修改字段', trigger: 'change'}],
          value: [{required: true, message: '请输入要修改的值', trigger: 'blur'}],
        }
      }
    },
    methods: {
      cellStyle({row, column, rowIndex, columnIndex}){
        if(row.is_leave == '是' && columnIndex == 3){
          return 'color: red'
        } else if (row.is_leave != '是' && columnIndex == 3){
          return 'color: green'
        }
      },
      changeParent(v) {
        let convert = {company: 'companys', 'department': 'departs', leader: 'staffs', job: 'jobs'};
        if (v == 'company' || v == 'department' || v == 'leader' || v == 'job') {
          this.isselected = true;
          http(api.getRegisdata, {
            params: {v: convert[v]}
          }).then(res => {
            this.items = res.data[convert[v]];
          }).catch(error => {
            console.log(error);
          })
        } else if (v == 'is_leave'){
          this.isselected = true;
          this.items = [
            {id: 1, name: '是'}
          ]
        } else {
          this.isselected = false;
        }
      },
      resetChangeStaff(formName) {
        this.$refs[formName].resetFields();
      },
      ChangeStaff(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(this.changeStaffForm))
            http(api.changeStaff, {
              headers: {'Content-Type': 'application/json; charset=UTF-8'},
              type: 'post',
              data: this.changeStaffForm
            }).then(res => {
              this.$message({type:"success",message:"修改成功"});
              this.changeStaffVisible = false;
              this.resetChangeStaff('changeStaffForm');
              this.getStaffs();
            })
          } else {
            console.log('表单验证错误');
            return false;
          }
        });
      },
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
      },
      showDetail(row) {
        this.$router.push({
          name: '员工详情',
          query: {
            id: row.id
          }
        })
      },
      changeDetail(row) {
        this.changeStaffVisible = true;
        this.changeStaffForm.id = row.id;
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
