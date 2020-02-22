/**
 * 全局导航跳转工具
 * @export
 * @class NavigationUtil
 */
export default class NavigationUtil{
     
    
    /**
     * 跳转到指定页面
     * @param {*} params 要传递的参数  这里的...是rest参数代替arguments对象（类似数组的对象，正常使用需要Array.prototype.slice.call先将其转为数组）
     * @param {*} page   传递页面名称
     * @memberof NavigationUtil
     */
    static movePage(params,page){
        // 从Home主导航中提取出来的navigation
        const navigation = NavigationUtil.navigation;
        if(!navigation){
            console.log("没有该页面，请检查代码！");
            return;
        }
        navigation.navigate(page,  
        {
            ...params
        });
    }

    /**
     * 返回上一页
     * @param {*} navigation  传递this.props.navigation
     * @memberof NavigationUtil
     */
    static goBack(navigation){
        navigation.goBack();
    }

    /**
     * 重置到首页
     * @param {*} params
     * @memberof NavigationUtil
     */
    static resetToHomePage(params){
        const {navigation} = params;
        navigation.navigate('Main');
    }
}