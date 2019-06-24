<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules" ref="formInline">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formInline.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchName('formInline')">查 询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="addcompanyVisible = true" style="float:right">添加公司</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-table :data="companysTable" border style="width: 100%" :cell-style="cellStyle">
      <el-table-column align="center" prop="id" label="公司ID" width="120"></el-table-column>
      <el-table-column align="center" prop="name" label="名称" width="360"></el-table-column>
      <el-table-column align="center" prop="is_default" label="默认状态" width="180"></el-table-column>
      <el-table-column align="center" prop="staffcounts" label="员工数量" width="180"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="delCompany(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="changeCompany(scope.row)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加公司" :visible.sync="addcompanyVisible" width="30%" center>
      <el-form :model="addCompanysForm" status-icon :rules="addCompanyRules" ref="addCompanysForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name" style="padding-bottom: 20px">
          <el-input v-model.number="addCompanysForm.name"></el-input>
        </el-form-item>
        <el-form-item label="是否默认" prop="checkActive">
          <el-select v-model="addCompanysForm.default" placeholder="是否默认">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetaddCompany('addCompanysForm')">重 置</el-button>
        <el-button type="primary" @click="addCompany('addCompanysForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="changecompanyVisible" width="30%" center>
      <el-form :model="changeCompanysForm" status-icon :rules="changeCompanyRules" ref="changeCompanysForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name" style="padding-bottom: 20px">
          <el-input v-model.number="changeCompanysForm.name"></el-input>
        </el-form-item>
        <el-form-item label="是否默认" prop="checkActive">
          <el-select v-model="changeCompanysForm.default" placeholder="是否默认">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetchangeCompany('changeCompanysForm')">重 置</el-button>
        <el-button type="primary" @click="changeCompanySubmit('changeCompanysForm')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import http from '@/common/js/utils/http';
  import api from '@/api';

  export default {
    methods: {
      searchName(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getCompanys();
          } else {
            console.log('表单验证失败');
            return false;
          }
        });
      },
      getCompanys() {
        http(api.getcompanys, {
          params: {name: this.formInline.name}
        }).then(res => {
          this.companysTable = res.data;
        }).catch(error => {
          console.log(error)
        })
      },
      delCompany(row) {
        this.$confirm('此操作将删除该公司, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          if (row.staffcounts > 0) {
            this.$message({type: "error",message:"该公司有绑定员工"})
            return false;
          }
          http(api.delcompany, {
            headers:{'Content-Type': 'application/json; charset=UTF-8'},
            type: 'post',
            data: {
              comid: row.id
            }
          }).then(res => {
            this.$message({type:"success",message:"删除成功"})
            this.getCompanys();
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {})
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        if(row.is_default == '是' && columnIndex == 2){
          return 'color: green'
        } else if (row.is_default == '否' && columnIndex == 2){
          return 'color: red'
        }
      },
      resetaddCompany(formName) {
        this.$refs[formName].resetFields();
      },
      addCompany(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            http(api.addcompany, {
              headers: {'Content-Type': 'application/json; charset=UTF-8'},
              type: 'post',
              data: {
                name: this.addCompanysForm.name,
                is_default: this.addCompanysForm.default
              }
            }).then(res => {
              this.$message({type:"success",message:"添加成功"});
              this.addcompanyVisible = false;
              this.resetaddCompany('addCompanysForm');
              this.getCompanys();
            })
          } else {
            console.log('提交错误');
            return false;
          }
        });
      },
      changeCompany(row) {
        this.changecompanyVisible = true;
        this.temrow = row;
        this.changeCompanysForm.comid = row.id;
        this.changeCompanysForm.name = row.name;
        this.changeCompanysForm.default = row.is_default == '是' ? '1' : '0';
      },
      resetchangeCompany(formName) {
        this.changeCompanysForm.comid = this.temrow.id;
        this.changeCompanysForm.name = this.temrow.name;
        this.changeCompanysForm.default = this.temrow.is_default == '是' ? '1' : '0';
      },
      changeCompanySubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            http(api.changecompany, {
              headers: {'Content-Type': 'application/json; charset=UTF-8'},
              type: 'post',
              data: {
                comid: this.changeCompanysForm.comid,
                name: this.changeCompanysForm.name,
                is_default: this.changeCompanysForm.default
              }
            }).then(res => {
              this.$message({type:"success",message:"修改成功"});
              this.changecompanyVisible = false;
              this.getCompanys();
            })
          } else {
            console.log('提交错误');
            return false;
          }
        });
      }
    },
    mounted() {
      this.getCompanys()
    },

    data() {
      return {
        formInline: {
          name: '',
        },
        rules: {
          name: [{required: true, min: 1, message: '请输入一个名称', trigger: 'blur'}],
        },
        companysTable: [],
        addcompanyVisible: false,
        addCompanysForm: {
          name: '',
          default: '0'
        },
        addCompanyRules: {
          name: [{required: true, min: 1, message: '请输入一个名称', trigger: 'blur'}],
        },

        changecompanyVisible: false,
        changeCompanysForm: {
          comid: '',
          name: '',
          default: '0'
        },
        changeCompanyRules: {
          name: [{required: true, min: 1, message: '请输入一个名称', trigger: 'blur'}],
        },
        temrow: {},
      }
    }
  }
</script>

<style scoped lang="scss">
  @import './style.scss';
</style>
