<template>
  <section>
    <el-row :gutter="20">
      <el-col :span="14" :offset="5">
        <el-form :model="staffinfoForm" :show-message="false" :rules="staffinfoRules" :status-icon="true" ref="staffinfoForm" label-width="100px" class="demo-ruleForm">
          <table width="827" border="0" cellpadding="0" cellspacing="0" style='width:620.25pt;border-collapse:collapse;table-layout:fixed;margin-top: 20px'>
            <tr>
                <td colspan="7">
                  <h2 style="margin: 0px">员工信息登记表</h2>
                  <h5 style="margin: 0px"><span style="color: red">*</span> 号代表必填项</h5>
                </td>
                <td><img src="https://image.animekid.cn/images/2019/02/02/40ae499b51143646b373e766b4ef7b37.png" style="width:94px;"></td>
              </tr>
              <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
                <td class="xl69" height="300" rowspan="9" style='height:225.00pt' x:str><span style="margin: 0 45%">基</span><span style="margin: 0 45%">本</span><span style="margin: 0 45%">信</span><span style="margin: 0 45%">息</span></td>
                <td class="xl70" x:str><span style="color: red">*</span> 姓名</td>
                <td class="xl70">
                  <el-form-item prop="name">
                    <el-input type="text" v-model="staffinfoForm.name"></el-input>
                  </el-form-item>
                </td>
                <td class="xl70" x:str><span style="color: red">*</span> 性别</td>
                <td class="xl70">
                  <el-form-item prop="gender">
                    <el-select placeholder="请选择" v-model="staffinfoForm.gender">
                      <el-option  label="女" value="0"></el-option>
                      <el-option  label="男" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="xl70" x:str>民族</td>
                <td class="xl70" colspan="2">
                  <el-form-item>
                    <el-input type="text" v-model="staffinfoForm.national"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
                <td class="xl70" x:str><span style="color: red">*</span> 身份证号</td>
                <td class="xl70" colspan="3">
                  <el-form-item prop="card">
                    <el-input type="text" v-model="staffinfoForm.card"></el-input>
                  </el-form-item>
                </td>
                <td class="xl70" x:str><span style="color: red">*</span> 出生日期</td>
                <td class="xl70" colspan="2">
                  <el-form-item prop="birth">
                    <el-date-picker type="date" placeholder="选择日期" v-model="staffinfoForm.birth" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </td>
              </tr>
              <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
                <td class="xl70" x:str><span style="color: red">*</span> 联系地址</td>
                <td class="xl70" colspan="3">
                  <el-form-item prop="address">
                    <el-input type="text" v-model="staffinfoForm.address"></el-input>
                  </el-form-item>
                </td>
                <td class="xl70" x:str><span style="color: red">*</span> 联系电话</td>
                <td class="xl70" colspan="2">
                  <el-form-item prop="phone">
                    <el-input type="text" v-model="staffinfoForm.phone"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
                <td class="xl70" x:str>身高</td>
                <td class="xl70">
                  <el-form-item>
                    <el-input type="number" v-model.number="staffinfoForm.height"></el-input>
                  </el-form-item>
                </td>
                <td class="xl70" x:str>体重</td>
                <td class="xl70">
                  <el-form-item>
                    <el-input type="number" v-model.number="staffinfoForm.weight"></el-input>
                  </el-form-item>
                </td>
                <td class="xl70" x:str>婚否</td>
                <td class="xl70" colspan="2">
                  <el-form-item>
                    <el-select placeholder="请选择" v-model="staffinfoForm.marriage">
                      <el-option  label="未婚" value="0"></el-option>
                      <el-option  label="已婚" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
                <td class="xl70" x:str>血型</td>
                <td class="xl70">
                  <el-form-item>
                    <el-input type="text" v-model="staffinfoForm.blookd"></el-input>
                  </el-form-item>
                </td>
                <td class="xl70" x:str><span style="color: red">*</span> 籍贯</td>
                <td class="xl71" colspan="4">
                  <el-form-item prop="place">
                    <el-input type="text" v-model="staffinfoForm.place"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
                <td class="xl71" x:str><span style="color: red">*</span> 毕业院校</td>
                <td class="xl72" colspan="3">
                  <el-form-item prop="school">
                    <el-input type="text" v-model="staffinfoForm.school"></el-input>
                  </el-form-item>
                </td>
                <td class="xl71" x:str><span style="color: red">*</span> 文化程度</td>
                <td class="xl72" colspan="2">
                  <el-form-item prop="schooling">
                    <el-select placeholder="请选择" v-model="staffinfoForm.schooling">
                      <el-option  label="专科以下" value="专科以下"></el-option>
                      <el-option  label="专科" value="专科"></el-option>
                      <el-option  label="本科" value="本科"></el-option>
                      <el-option  label="硕士" value="硕士"></el-option>
                      <el-option  label="博士" value="博士"></el-option>
                      <el-option  label="博士以上" value="博士以上"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
                <td class="xl71" x:str><span style="color: red">*</span> 专业</td>
                <td class="xl71" colspan="2">
                  <el-form-item prop="professional">
                    <el-input type="text" v-model="staffinfoForm.professional"></el-input>
                  </el-form-item>
                </td>
                <td class="xl71" x:str>QQ</td>
                <td class="xl71">
                  <el-form-item>
                    <el-input type="text" v-model.number="staffinfoForm.qq"></el-input>
                  </el-form-item>
                </td>
                <td class="xl71" x:str>微信</td>
                <td class="xl71">
                  <el-form-item>
                    <el-input type="text" v-model="staffinfoForm.wechat"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
                <td class="xl71" x:str><span style="color: red">*</span> 紧急联系人</td>
                <td class="xl71">
                  <el-form-item prop="emergency">
                    <el-input type="text" v-model="staffinfoForm.emergency"></el-input>
                  </el-form-item>
                </td>
                <td class="xl71" x:str colspan="2"><span style="color: red">*</span> 紧急联系电话</td>
                <td class="xl71" colspan="2">
                  <el-form-item prop="emergency_phone">
                    <el-input type="text" v-model="staffinfoForm.emergency_phone"></el-input>
                  </el-form-item>
                </td>
                <td class="x171"></td>
              </tr>
              <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
                <td class="xl71" x:str>其他邮箱</td>
                <td class="xl71" colspan="2">
                  <el-form-item>
                    <el-input type="text" v-model="staffinfoForm.oemail"></el-input>
                  </el-form-item>
                </td>
                <td class="xl71" x:str>兴趣爱好</td>
                <td class="xl71" colspan="3">
                  <el-form-item>
                    <el-input type="text" v-model="staffinfoForm.hobby"></el-input>
                  </el-form-item>
                </td>
              </tr>
            <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
              <td class="xl69" height="200" rowspan="6" style='height:150.00pt;' x:str><span style="margin: 0 45%">HR</span><span style="margin: 0 45%">填</span><span style="margin: 0 45%">写</span><span style="margin: 0 45%">信</span><span style="margin: 0 45%">息</span></td>
              <td class="xl71" x:str>员工编号</td>
              <td class="xl71">
                <el-form-item>
                  <el-input type="text" :disabled="true"></el-input>
                </el-form-item>
              </td>
              <td class="xl71" x:str>公司邮箱</td>
              <td class="xl71" colspan="2">
                <el-form-item>
                  <el-input type="text" :disabled="true"></el-input>
                </el-form-item>
              </td>
              <td class="xl71" x:str>入职时间</td>
              <td class="xl71">
                <el-form-item>
                  <el-input type="text" :disabled="true"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
              <td class="xl71" x:str>工作岗位</td>
              <td class="xl71">
                <el-form-item>
                  <el-input type="text" :disabled="true"></el-input>
                </el-form-item>
              </td>
              <td class="xl71" x:str>所属公司</td>
              <td class="xl71" colspan="2">
                <el-form-item>
                  <el-input type="text" :disabled="true"></el-input>
                </el-form-item>
              </td>
              <td class="xl71" x:str>所属部门</td>
              <td class="xl71">
                <el-form-item>
                  <el-input type="text" :disabled="true"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
              <td class="xl71" x:str>薪酬</td>
              <td class="xl71">
                <el-form-item>
                  <el-input type="text" :disabled="true"></el-input>
                </el-form-item>
              </td>
              <td class="xl71" x:str>直属领导</td>
              <td class="xl71">
                <el-form-item>
                  <el-input type="text" :disabled="true"></el-input>
                </el-form-item>
              </td>
              <td class="xl71" x:str>薪资结构</td>
              <td class="xl71" colspan="2">
                <el-form-item>
                  <el-input type="text" :disabled="true"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
              <td class="xl71" x:str>股权/期权</td>
              <td class="xl71">
                <el-form-item>
                  <el-input type="text" :disabled="true"></el-input>
                </el-form-item>
              </td>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
            </tr>
            <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
            </tr>
            <tr height="33.33" style='height:25.00pt;mso-height-source:userset;mso-height-alt:500;'>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
              <td class="xl71"></td>
            </tr>
            <![if supportMisalignedColumns]>
              <tr width="0" style='display:none;'>
              <td width="92" style='width:69;'></td>
              <td width="102" style='width:77;'></td>
              <td width="110" style='width:83;'></td>
              <td width="97" style='width:73;'></td>
              <td width="86" style='width:65;'></td>
              <td width="104" style='width:78;'></td>
              <td width="97" style='width:73;'></td>
              <td width="139" style='width:104;'></td>
              <td width="72" style='width:54;'></td>
              </tr>
            <![endif]>
          </table>
          <el-col :span="15" style="margin-top: 15px;margin-bottom: 15px">
            <el-form-item label="密码" prop="password">
              <el-input type="text" v-model="staffinfoForm.password" style="border: 1px solid #dcdfe6; width: 50%;border-radius: 4px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-top: 15px;margin-bottom: 15px">
            <el-button type="info" @click="resetStaffForm('staffinfoForm')">重置</el-button>
            <el-button type="primary" @click="addStaffForm('staffinfoForm')">提交</el-button>
          </el-col>
        </el-form>
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
        staffinfoForm: {
          name: '',
          gender: '1',
          national: '',
          card: '',
          birth: '',
          address: '',
          phone: '',
          height: '',
          weight: '',
          marriage: '',
          blood: '',
          place: '',
          school: '',
          schooling: '',
          professional: '',
          qq: '',
          wechat: '',
          emergency: '',
          emergency_phone: '',
          oemail: '',
          hobby: '',
          password: ''
        },
        staffinfoRules: {
          name: [{required: true, min: 1, message: '请输入姓名', trigger: 'blur'}],
          card: [{required: true, min: 18, max: 18, message: '请输入身份证号', trigger: 'blur'}],
          birth: [{required: true, message: '请输入出生年月', trigger: 'blur'}],
          address: [{required: true, min: 1, message: '请输入联系地址', trigger: 'blur'}],
          phone: [{required: true, min: 11, max: 11, message: '请输入手机号码', trigger: 'blur'}],
          place: [{required: true, min: 1, message: '请输入籍贯', trigger: 'blur'}],
          school: [{required: true, min: 1, message: '请输入毕业院校', trigger: 'blur'}],
          schooling: [{required: true, message: '请输入最高学历', trigger: 'blur'}],
          professional: [{required: true, min: 1, message: '请输入专业名称', trigger: 'blur'}],
          emergency: [{required: true, min: 1, message: '请输入紧急联系人', trigger: 'blur'}],
          emergency_phone: [{required: true, min: 11, max: 11, message: '请输入紧急联系人手机号码', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        }
      }
    },
    methods: {
      resetStaffForm(formName) {
        this.$refs[formName].resetFields();
      },
      addStaffForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            http(api.staffRegistration, {
              headers: {'Content-Type': 'application/json; charset=UTF-8'},
              type: 'post',
              data: this.staffinfoForm
            }).then(res => {
              this.$message({type:"success",message:"添加成功"});
              this.resetStaffForm(formName);
            })
          } else {
            console.log('表单验证错误');
            return false
          }
        })
      }
    }
  }
</script>


<style scoped lang="scss">
  @import './style.scss';
</style>