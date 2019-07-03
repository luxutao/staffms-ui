import axios from 'axios';

let host = '';
// let host = 'http://demo.staffms.animekid.cn';

export default {
    login:host + '/api/auth/login',
    getusers:host + '/api/auth/getusers',
    adduser:host + '/api/auth/adduser',
    deluser:host + '/api/auth/deluser',
    resetpassword:host + '/api/auth/resetpassword',

    getcompanys:host + '/api/company/getcompanys',
    addcompany:host + '/api/company/addcompany',
    delcompany:host + '/api/company/delcompany',
    changecompany:host + '/api/company/changecompany',

    gettitles:host + '/api/job/gettitles',
    getjobs:host + '/api/job/getjobs',
    addjob:host + '/api/job/addjob',
    deljob:host + '/api/job/deljob',

    getOrganization:host + '/api/department/getOrganization',
    getleaders:host + '/api/department/getleaders',
    getdeparts:host + '/api/department/getdeparts',
    adddepart:host + '/api/department/adddepart',
    deldepart:host + '/api/department/deldepart',
    
    getEasystaffs:host + '/api/staff/getEasystaffs',
    staffRegistration:host + '/api/staff/staffRegistration',
    getStaffs:host + '/api/staff/getStaffs',
    getChartdata:host + '/api/staff/getChartdata',
    getcard:host + '/api/staff/getcard',
    getnews:host + '/api/staff/getnews',
    

}