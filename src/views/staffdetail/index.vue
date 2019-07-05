<template>
  <section>
    <el-col :span="24"><el-divider></el-divider></el-col>
    <el-col :span="5" :offset="2">
      <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
    </el-col>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-tabs v-model="choiceName" :stretch="true">
          <el-tab-pane label="基本信息" name="first">
            <el-col :span="18" :offset="3">
              <table v-if="staff.job">
                <tbody>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>姓名</strong></td>
                    <td style="padding: 20px 10px">{{ staff.name }}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>员工编号</strong></td>
                    <td style="padding: 20px 10px">{{ staff.number }}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>公司邮箱</strong></td>
                    <td style="padding: 20px 10px">{{ staff.email }}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>职位</strong></td>
                    <td style="padding: 20px 10px">{{ staff.job.name }}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>是否离职</strong></td>
                    <td style="padding: 20px 10px">{{ staff.is_leave }}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>所属公司</strong></td>
                    <td style="padding: 20px 10px">{{ staff.company.name }}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>所属部门</strong></td>
                    <td style="padding: 20px 10px">{{ staff.department.name }}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>直属领导</strong></td>
                    <td style="padding: 20px 10px">{{ staff.leader }}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>入职时间</strong></td>
                    <td style="padding: 20px 10px">{{ staff.jointime }}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>离职时间</strong></td>
                    <td style="padding: 20px 10px">{{ staff.leavetime }}</td>
                  </tr>
                </tbody>
              </table>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="薪资福利" name="second">
            <el-col :span="18" :offset="3">
              <table v-if="staff.job">
                <tbody>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>基本薪资</strong></td>
                    <td style="padding: 20px 10px">{{ staff.salary }}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>薪资结构</strong></td>
                    <td style="padding: 20px 10px">{{ staff.salary_structure }}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>股权/期权</strong></td>
                    <td style="padding: 20px 10px">{{ staff.equity }}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #DCDFE6;">
                    <td style="padding: 20px 10px;width: 20%;"><strong>绩效奖金</strong></td>
                    <td style="padding: 20px 10px">{{ staff.performance }}</td>
                  </tr>
                </tbody>
              </table>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="考勤信息" name="third">考勤信息</el-tab-pane>
          <el-tab-pane label="变更日志" name="fourth">
            <el-col :span="18" :offset="3">
              <el-table :data="staff.log" style="width: 100%">
                <el-table-column align="center" prop="id" label="序号" width="125"></el-table-column>
                <el-table-column align="center" prop="message" label="操作日志" width="500"></el-table-column>
                <el-table-column align="center" prop="operator" label="操作人" width="150"></el-table-column>
              </el-table>
            </el-col>
          </el-tab-pane>
        </el-tabs>
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
        fit: 'fill',
        url: 'https://image.animekid.cn/images/2019/02/02/81fb6509f1dcd646de41a322e0c29006.th.jpg',
        choiceName: 'first',
        staff: {}
      }
    },
    methods: {
      getstaff() {
        http(api.getStaffs, {
          params: {
            id: this.$route.query.id
          }
        }).then(res => {
          if (res.data.total == 0) {
            this.$message({type: 'error', message: '未查询到该用户，将返回上一页'});
            this.$router.back(-1);
            return false;
          }
          this.staff = res.data.data[0];
        }).catch(error => {
          console.log(error);
        })
      }
    },
    mounted() {
      this.getstaff();
    }
  }
</script>

<style scoped lang='scss'>
  @import './style.scss'
</style>
