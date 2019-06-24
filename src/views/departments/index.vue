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
            <el-form-item label="管理人" prop="leader">
              <el-select v-model="formInline.leader" placeholder="请选择">
                <el-option v-for="leader in leaders" :key="leader.id" :label="leader.name" :value="leader.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getDepartments()">查 询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" @click="adddepartVisible = true" style="float:right">添加部门</el-button>
        </el-col>
      </el-row>
    </el-col>
    
    <el-col :span="5" class="treebar">
      <el-tree :data="departTree" :props="defaultProps" default-expand-all style="padding: 10px"></el-tree>
    </el-col>
    <el-col :span="18" :offset="1">
      <el-table :data="departsTable" border style="width: 100%" :cell-style="cellStyle">
        <el-table-column align="center" prop="id" label="部门ID" width="120"></el-table-column>
        <el-table-column align="center" prop="name" label="名称" width="360"></el-table-column>
        <el-table-column align="center" prop="parent" label="上级部门" width="360"></el-table-column>
        <el-table-column align="center" prop="leader" label="管理人" width="180"></el-table-column>
        <el-table-column align="center" prop="vp" label="VP" width="180"></el-table-column>
        <el-table-column align="center" prop="hrbp" label="HRBP" width="180"></el-table-column>
        <el-table-column align="center" prop="level" label="等级" width="180"></el-table-column>
        <el-table-column align="center" prop="staffcounts" label="员工数量" width="180"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="delDepart(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-col>

    <el-dialog title="添加部门" :visible.sync="adddepartVisible" width="30%" center>
      <el-form :model="addDepartForm" status-icon :rules="addDepartRules" ref="addDepartForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name" style="padding-bottom: 20px">
          <el-input v-model.number="addDepartForm.name"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" prop="parent" style="padding-bottom: 20px">
          <el-select v-model="addDepartForm.parent" placeholder="请选择" filterable>
            <el-option v-for="dep in alldeparts" :key="dep.id" :label="dep.name" :value="dep.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理人" prop="leader" style="padding-bottom: 20px">
          <el-select v-model="addDepartForm.leader" placeholder="请选择" filterable>
            <el-option v-for="staff in staffs" :key="staff.id" :label="staff.name" :value="staff.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="VP" prop="vp" style="padding-bottom: 20px">
          <el-select v-model="addDepartForm.vp" placeholder="请选择" filterable>
            <el-option v-for="staff in staffs" :key="staff.id" :label="staff.name" :value="staff.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="HRBP" prop="hrbp" style="padding-bottom: 20px">
          <el-select v-model="addDepartForm.hrbp" placeholder="请选择" filterable>
            <el-option v-for="staff in staffs" :key="staff.id" :label="staff.name" :value="staff.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级" prop="level">
          <el-select v-model="addDepartForm.level" placeholder="请选择" filterable>
            <el-option v-for="level in levels" :key="level.id" :label="level.name" :value="level.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetaddDepart('addDepartForm')">重 置</el-button>
        <el-button type="primary" @click="addDepart('addDepartForm')">确 定</el-button>
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
          leader: '',
        },
        departsTable: [],
        leaders: [],
        adddepartVisible: false,
        levels: [
            {id: 1, name: '一级部门'},
            {id: 2, name: '二级部门'},
            {id: 3, name: '三级部门'},
        ],
        alldeparts: [],
        staffs: [],
         defaultProps: {
          children: 'children',
          label: 'label'
        },
        departTree: [],

        addDepartForm: {
          name: '',
          parent: '',
          leader: '',
          vp: '',
          hrbp: '',
          level: ''
        },
        addDepartRules: {
          name: [{required: true, min: 1, message: '请输入一个名称', trigger: 'blur'}],
          parent: [{required: true, message: '请输入上级部门名称', trigger: 'blur'}],
          leader: [{required: true, message: '请选择一个leader', trigger: 'blur'}],
          vp: [{required: true, message: '请选择一个vp', trigger: 'blur'}],
          hrbp: [{required: true, message: '请选择一个hrbp', trigger: 'blur'}],
          level: [{required: true, message: '请选择一个等级', trigger: 'blur'}],
        }
      }
    },
    methods: {
      cellStyle({row, column, rowIndex, columnIndex}){
        if(row.staffcounts == 0 && columnIndex == 8){
          return 'color: red'
        } else if (row.staffcounts != 0 && columnIndex == 8){
          return 'color: green'
        }
      },
      getOrganization() {
        http(api.getOrganization, {}).then(res => {
          this.departTree = res.data;
        }).catch(error => {
          console.log(error)
        })
      },
      getLeaders() {
        http(api.getleaders, {}).then(res => {
          this.leaders = res.data;
        }).catch(error => {
          console.log(error)
        })
      },
      getStaffs() {
        http(api.getstaffs, {}).then(res => {
          this.staffs = res.data;
        }).catch(error => {
          console.log(error)
        })
      },
      getDepartments() {
        http(api.getdeparts, {
          params: this.formInline
        }).then(res => {
          this.departsTable = res.data;
        }).catch(error => {
          console.log(error)
        })
      },
      getalldeparts() {
        http(api.getdeparts, {
          params: {size:10000000,page:1}
        }).then(res => {
          this.alldeparts = res.data;
          this.alldeparts.unshift({
            id: 0, name: '无'
          })
        }).catch(error => {
          console.log(error)
        })
      },
      delDepart(row) {
        this.$confirm('此操作将删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          if (row.staffcounts > 0) {
            this.$message({type: "error",message:"该部门有绑定员工"})
            return false;
          }
          http(api.deldepart, {
            headers:{'Content-Type': 'application/json; charset=UTF-8'},
            type: 'post',
            data: {
              depid: row.id
            }
          }).then(res => {
            this.$message({type:"success",message:"删除成功"})
            this.getDepartments();
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {})
      },
      resetaddDepart(formName) {
        this.$refs[formName].resetFields();
      },
      addDepart(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            http(api.adddepart, {
              headers: {'Content-Type': 'application/json; charset=UTF-8'},
              type: 'post',
              data: this.addDepartForm
            }).then(res => {
              this.$message({type:"success",message:"添加成功"});
              this.adddepartVisible = false;
              this.resetaddDepart('addDepartForm');
              this.getOrganization();
              this.getDepartments();
              this.getLeaders();
            })
          } else {
            console.log('表单验证错误');
            return false;
          }
        });
      }
    },
    mounted() {
      this.getalldeparts();
      this.getOrganization();
      this.getStaffs();
      this.getLeaders();
      this.getDepartments();
    }
  }
</script>


<style scoped lang="scss">
  @import './style.scss';
</style>
