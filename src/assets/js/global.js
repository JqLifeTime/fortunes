// 全局变量,方法函数
const imgurl = 'https://www.91yxg.com/Data/'
const url = 'https://www.91yxg.com/index.php/';
var buynow = null;
var buycart = null;
var buytype = null;
var user = null;
var sysconfig = null;
import qs from 'qs'
export default {
	url, //接口地址
	qs,  //axios请求方式变为formData
	imgurl,  //图片路径
	buynow,   //立即购买暂存数据
	buycart,   //购物车购买暂存数据
	buytype,    //保存状态，判断从购物车进入还是直接购买
	user,  //用户名
	sysconfig //配置信息
}
