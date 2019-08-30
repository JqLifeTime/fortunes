import jsonp from 'jsonp';

const parseParam = param =>{
	let params = [];
	for(const key in param){
		params.push([key,param[key]])
	}
	return params.map(value => value.join('=')).join('&')
}

export default (url,data,options) => {
	url+= (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data);
	
	return new Promise((resolve,reject) => {
		jsonp(url,options,(err,data) => {
			if(err){
				reject(err);
			}else{
				resolve(data);
			}
		})
	})
}