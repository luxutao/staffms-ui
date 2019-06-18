
var Url = {
	//私有属性
	_query: null,
	/*--
		获取URL中的参数
		-p str name 参数名
		-r 参数值
		-note 所有返回值都是字符串
		-eg
			//URL: http://open.api.com/ms?from=pc&or=1&dt=2
			Url.getParam('dt'); //返回'2'
			Url.getParam(); //返回对象：{from:'pc', or:'1', dt:'2'}
	*/
	getParam: function(name){
		var query = this._query;
		if(query===null){
			query = this._query = this.parseParam(window.location.search.slice(1));
		}
		return name ? (query[name.toLowerCase()]||'') : query;
	},
	/*--
		把一个对象序列化成URL参数字符串
		-p object param 参数对象
		-note 空字符串不能传
		-note 参数值会被进行encodeURIComponent编码
		-eg
			//返回 a=1&c=false&d=0
			Url.serializeParam({a:1, b:'', c:false, d:0});
	*/
	serializeParam: function(param){
		var k, v, p = [];
		for(k in param){
			v = param[k];
			v!=='' && param.hasOwnProperty(k) && p.push(k+'='+encodeURIComponent(v));
		}
		return p.join('&');
	},
	/*--
		解析URL参数格式的字符串
		-p string url 可以是url但不一定是url
		-eg
			//返回 {a:1, e:0, f:'false'}
			Url.parseParam('http://xyz.com/?a=1&e=0&f=false#some');
	*/
	parseParam: function(url){
		url = url.split('#')[0]; //去掉hash
		if(url.indexOf('?')>0){
			url = url.split('?')[1];
		}
		url = url.split('&');
		var query = {},
			i = 0, l = url.length,
			p, j,v;
		for(; i < l; i++){
			p = url[i];
			if(p){
				j = p.indexOf('=');
				v = p.slice(j+1);
				v && j>0 && (query[p.slice(0,j).toLowerCase()] = decodeURIComponent(v));
			}
		}
		return query;
	},
	/*--
		把一个URL拼接上一个参数对象
		-p string url url地址
		-p object param 参数对象
		-eg
			//返回 http://xyz.com/?a=1&e=0#some
			Url.setParam('http://xyz.com/#some', {a:1, b:'', e:0});
	*/
	setParam: function(url, param){
		var hash = '';
		if(url.indexOf('#')>-1){
			url = url.split('#');
			hash = '#'+url[1];
			url = url[0];
		}
		if(url.indexOf('?')>0){
			var query = this.parseParam(url);
			for(var k in query){
				param.hasOwnProperty(k) || 
					(query.hasOwnProperty(k) && (param[k] = query[k]));
			}
			url = url.split('?')[0];
		}
		return url + '?' + this.serializeParam(param) + hash;
	}
};

export default Url

