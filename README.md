# RN_MovieTime

## 介绍
使用React Native开发的仿豆瓣APP，集成了Redux以及React Navigation4.0

本项目是我的毕业设计，由于没有mac电脑（ps：穷逼落泪），只适配了安卓端！！！

## 软件结构

主要代码都在`src`目录下

```cmd
├─action      // 项目中所有的action
│  ├─collection
│  ├─hot
│  ├─login
│  └─theme
├─common      // 一些小组件
├─expand   
│  └─localdb  // 数据相关的模块
├─navigator   // 导航相关模块
├─page        // 所有页面
├─reducer     // 项目中所有的reducer
│  ├─collection
│  ├─hot
│  ├─login
│  └─theme
├─res         // 一些公共参数，工厂类等
├─store       // redux的store
└─util        // 工具类
```


## 安装教程

1.  先确保你已安装好了React Native 所需的依赖环境
2.  在根目录下执行 `npm install`
3.  在执行 `react-native run-android`

## 部分界面展示

<figure>
<img src="https://gitee.com/kuanglangsheng/imgAreas/raw/master/Screenshot_2020-05-11-19-48-00-821_com.movietime.jpg" style="zoom:25%;" />
<img src="https://gitee.com/kuanglangsheng/imgAreas/raw/master/Screenshot_2020-05-11-19-48-23-541_com.movietime.jpg" style="zoom:25%;" />
<img src="https://gitee.com/kuanglangsheng/imgAreas/raw/master/Screenshot_2020-05-11-19-32-00-754_com.movietime.jpg" style="zoom:25%;" />
<img src="https://gitee.com/kuanglangsheng/imgAreas/raw/master/Screenshot_2020-05-11-19-42-03-956_com.movietime.jpg" style="zoom:25%;" />
</figure>



## 说明

此程序仅供学习参考，喜欢就动手点个star吧o(∩_∩)o

需要后台和数据库的童鞋可以提个issue问我要，后台采用的是Django+mysql

## 联系方式

可以在我的[博客](https://blog.csdn.net/qq_42002651/category_9556687.html)留言，博客里也会有部分代码解析