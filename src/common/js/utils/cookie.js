
let Cookie = {
    //设置cookie
    set:function(name, value, iDay) {
        let oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + value + ';expires=' + oDate;
    },
    //获取cookie
    get:function(name) {
        let arr = document.cookie.split('; '),arr2;
        for (let i = 0; i < arr.length; i++) {
            arr2 = arr[i].split('=');
            if (arr2[0] === name) {
                return arr2[1];
            }
        }
        return '';
    },
    //删除cookie
    remove:function(name) {
        this.setCookie(name, 1, -1);
    }
}

export default Cookie