<template>
  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules"
      status-icon
      ref="ruleForm" 
      label-position="left" 
      label-width="0px" 
      class="demo-ruleForm login-page">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="username">
          <el-input type="text" 
              v-model="ruleForm.username" 
              auto-complete="off" 
              placeholder="用户名"
          ></el-input>
        </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" 
                v-model="ruleForm.password" 
                auto-complete="off"
                placeholder="密码"
            ></el-input>
          </el-form-item>
        <el-checkbox 
            v-model="checked"
            class="rememberme"
        >记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import http from '@/common/js/utils/http';
  import api from '@/api';
  import Cookie from '@/common/js/utils/cookie';

  export default {
    data(){
        return {
            logining: false,
            ruleForm: {
                username: '',
                password: '',
            },
            rules: {
                username: [{required: true, message: '请输入一个用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入一个密码', trigger: 'blur'}]
            },
            checked: false
        }
    },
    methods: {
        handleSubmit(event){
            this.$refs.ruleForm.validate((valid) => {
                if(valid){
                    this.logining = true;
                    http(api.login, {
                      headers:{'Content-Type': 'application/json; charset=UTF-8'},
                      type: 'post',
                      data: {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password
                      }
                    }).then(res => {
                      this.logining = false;
                      console.log(res);
                      this.$router.push({path: '/'})
                    }).catch(err => {
                      this.logining = false;
                      console.log(err);
                    })
                }else{
                    console.log('error submit!');
                    return false;
                }
            })
        }
    },
    created() {
      let cookie = Cookie.get('token');
      if (cookie){
        this.$router.push({path: '/'})
      }
    }
  };
</script>

<style scoped>
  @import "./style.scss";
</style>