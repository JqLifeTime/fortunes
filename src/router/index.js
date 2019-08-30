import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('pages/home')
    },
		{
		  path: '/cart',
		  name: 'cart',
		  component: () => import('pages/cart')
		},
		{
		  path: '/personal',
		  name: 'personal',
		  component: () => import('pages/personal')
		},
		{
		  path: '/qimingjieguo',
		  name: 'qimingjieguo',
		  component: () => import('pages/qimingjieguo')
		},
		{
		  path: '/bazisuanming',
		  name: 'bazisuanming',
		  component: () => import('pages/bazisuanming')
		},
		{
		  path: '/bihuasuanming',
		  name: 'bihuasuanming',
		  component: () => import('pages/bihuasuanming')
		},
		{
		  path: '/ceming',
		  name: 'ceming',
		  component: () => import('pages/ceming')
		},
		{
		  path: '/chenggusuanming',
		  name: 'chenggusuanming',
		  component: () => import('pages/chenggusuanming')
		},
		{
		  path: '/dingdanchaxun',
		  name: 'dingdanchaxun',
		  component: () => import('pages/dingdanchaxun')
		},
		{
		  path: '/fengshuipeixun',
		  name: 'fengshuipeixun',
		  component: () => import('pages/fengshuipeixun')
		},
		{
		  path: '/gongsiqiming',
		  name: 'gongsiqiming',
		  component: () => import('pages/gongsiqiming')
		},
		{
		  path: '/rengongqiming',
		  name: 'rengongqiming',
		  component: () => import('pages/rengongqiming')
		},
		{
		  path: '/shuxiangpeidui',
		  name: 'shuxiangpeidui',
		  component: () => import('pages/shuxiangpeidui')
		},
		{
		  path: '/zaixianqiming',
		  name: 'zaixianqiming',
		  component: () => import('pages/zaixianqiming')
		},
		{
		  path: '/news',
		  name: 'news',
		  component: () => import('pages/news')
		},
		{
		  path: '/yangzhai',
		  name: 'yangzhai',
		  component: () => import('pages/yangzhai')
		},
		{
		  path: '/yinzhai',
		  name: 'yinzhai',
		  component: () => import('pages/yinzhai')
		},
		{
		  path: '/kaiyunshangcheng',
		  name: 'kaiyunshangcheng',
		  component: () => import('pages/kaiyunshangcheng')
		},
		{
		  path: '/dingdanzhongxin',
		  name: 'dingdanzhongxin',
		  component: () => import('pages/dingdanzhongxin')
		},
		{
		  path: '/dingdanxiangqing',
		  name: 'dingdanxiangqing',
		  component: () => import('pages/dingdanxiangqing')
		},
		{
		  path: '/tijiaodingdan',
		  name: 'tijiaodingdan',
		  component: () => import('pages/tijiaodingdan')
		},
		{
		  path: '/dizhiguanli',
		  name: 'dizhiguanli',
		  component: () => import('pages/dizhiguanli')
		},
		{
		  path: '/productDetail:proId',
		  name: 'productDetail',
		  component: () => import('pages/productDetail')
		}
  ]
})
