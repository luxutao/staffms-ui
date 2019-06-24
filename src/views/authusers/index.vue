<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules" ref="formInline">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formInline.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchUsers('formInline')">查 询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="adduserVisible = true" style="float:right">添加用户</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-table :data="authusersTable" border style="width: 100%" :cell-style="cellStyle">
      <el-table-column align="center" prop="id" label="用户ID" width="120"></el-table-column>
      <el-table-column align="center" prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column align="center" prop="is_active" label="用户状态" width="180"></el-table-column>
      <el-table-column align="center" prop="create_time" label="创建日期" width="180"></el-table-column>
      <el-table-column align="center" prop="last_time" label="上次登录日期" width="180"></el-table-column>
      <el-table-column align="center" prop="last_ip" label="上次登录IP" width="180"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="resetPassword(scope.row)" type="text" size="small">重置密码</el-button>
          <el-button @click="delUser(scope.row)" type="text" size="small">删除用户</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="重置密码" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form :model="resetPassForm" :rules="resetrules" ref="resetPassForm">
        <el-form-item label="密码" prop='pass'>
          <el-input v-model="resetPassForm.pass" placeholder="第一次"></el-input>
        </el-form-item>
        <el-form-item label="再输一次" prop="checkpass">
          <el-input v-model="resetPassForm.checkpass" placeholder="第二次"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetPassSubmit('resetPassForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加用户" :visible.sync="adduserVisible" width="30%" center>
      <el-form :model="addUserForm" status-icon :rules="addUserRules" ref="addUserForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username" style="padding-bottom: 20px">
          <el-input v-model.number="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" style="padding-bottom: 20px">
          <el-input type="password" v-model="addUserForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" style="padding-bottom: 20px">
          <el-input type="password" v-model="addUserForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否激活" prop="checkActive">
          <el-select v-model="addUserForm.active" placeholder="是否激活">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetaddUser('addUserForm')">重 置</el-button>
        <el-button type="primary" @click="addUser('addUserForm')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import http from '@/common/js/utils/http';
  import api from '@/api';

  export default {
    methods: {
      searchUsers(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getUsers();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getUsers() {
        http(api.getusers, {
          params: {username: this.formInline.username}
        }).then(res => {
          this.authusersTable = res.data;
        }).catch(error => {
          console.log(error)
        })
      },
      delUser(row) {
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          http(api.deluser, {
            headers:{'Content-Type': 'application/json; charset=UTF-8'},
            type: 'post',
            data: {
              authid: row.id
            }
          }).then(res => {
            this.$message({type:"success",message:"删除成功"})
            this.getUsers();
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {})
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        if(row.is_active == '是' && columnIndex == 2){
          return 'color: green'
        } else if (row.is_active == '否' && columnIndex == 2){
          return 'color: red'
        }
      },
      resetPassword(row) {
        this.dialogFormVisible = true;
        this.resetPassForm.authid = row.id;
      },
      resetPassSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            http(api.resetpassword, {
              headers: {'Content-Type': 'application/json; charset=UTF-8'},
              type: 'post',
              data: {
                authid: this.resetPassForm.authid,
                newpassword: this.resetPassForm.pass
              }
            }).then(res => {
              this.$message({type:"success",message:"修改成功"});
              this.dialogFormVisible = false;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetaddUser(formName) {
        this.$refs[formName].resetFields();
      },
      addUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            http(api.adduser, {
              headers: {'Content-Type': 'application/json; charset=UTF-8'},
              type: 'post',
              data: {
                username: this.addUserForm.username,
                password: this.addUserForm.pass,
                is_active: this.addUserForm.active
              }
            }).then(res => {
              this.$message({type:"success",message:"添加成功"});
              this.adduserVisible = false;
              this.resetaddUser('addUserForm');
              this.getUsers();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted() {
      this.getUsers()
    },

    data() {
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.resetPassForm.checkPass !== '') {
            this.$refs.resetPassForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetPassForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
       var addUservalidatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.addUserForm.checkPass !== '') {
            this.$refs.addUserForm.validateField('checkPass');
          }
          callback();
        }
      };
      var addUservalidatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.addUserForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        formInline: {
          username: '',
        },
        rules: {
          username: [{required: true, min: 1, message: '请输入一个用户名', trigger: 'blur'}],
        },
        authusersTable: [],
        dialogFormVisible: false,
        resetPassForm: {
          authid: '',
          pass: '',
          checkpass: ''
        },
        resetrules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
        adduserVisible: false,
        addUserForm: {
          username: '',
          pass: '',
          checkPass: '',
          active: '1'
        },
        addUserRules: {
          username: [{required: true, min: 1, message: '请输入一个用户名', trigger: 'blur'}],
          pass: [
            {required:true, validator: addUservalidatePass, trigger: 'blur' }
          ],
          checkPass: [
            {required:true, validator: addUservalidatePass2, trigger: 'blur' }
          ],
        },
      }
    }
  }
</script>

<style scoped lang="scss">
  @import './style.scss';
</style>
