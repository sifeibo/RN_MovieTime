import Types from '../types'
import DataStore from '../../expand/localdb/DataStore'
/**
 * 根据tab不同获取最热数据的异步action
 * @param {*} themeColor 
 */
export function onLoadHotData(storeName, url){
    // 这里的dispatch是一个对象，不是那个传入reducer的方法
    return dispatch=>{
        // 显示loading，获取数据
        dispatch({type: Types.HOT_REFRESH, storeName: storeName}); 
        // 获取数据，成功则返回 success，失败则返回 fail
        let dataStore = new DataStore();
        dataStore.fetchData(url)
            .then(data=>{
                handleData(dispatch, storeName, data)
                
            }).catch(error => {
                console.log(error);
                dispatch({
                    type: Types.HOT_LOAD_FAIL,
                    storeName: storeName,
                    error
                });
            })

    }
}



/**
 * 下拉加载更多数据
 * 通过改变url参数进行获取数据
 * @export
 * @param {*} storeName tab名称
 * @param {*} pageIndex 第几页
 * @param {*} dataArray 原始数据
 * @param {*} url       访问的地址
 * @param {*} callback  回调函数，可以通过回调函数来调用页面通信：比如异常，无法显示更多了
 */
export function onLoadMoreHotData(storeName, pageIndex, dataArray=[], url, callBack) {
    return dispatch =>{
        // 改变url 获取数据，成功则返回 success，失败则返回 fail
        let dataStore = new DataStore();
        let index = pageIndex*20
        let nexturl = url + "&start="+ index + "&count=20";
        dataStore.fetchData(nexturl)
            .then(data=>{
                let items = data.data.data.subjects
                if(items.length!=0){
                    dispatch({
                        type: Types.HOT_LOAD_MORE_SUCCESS,
                        storeName: storeName,
                        pageIndex: pageIndex,
                        items: [...dataArray, ...items]
                    })
                }else{
                    if(typeof callBack === 'function'){
                        console.log('调用回调')
                        callBack('no more')
                    }
                    dispatch({
                        type: Types.HOT_LOAD_MORE_FAIL,
                        error: 'no more',
                        storeName: storeName,
                        pageIndex: --pageIndex,
                    })
                }
            }).catch(error => {
                console.log(error);
                dispatch({
                    type: Types.HOT_LOAD_MORE_FAIL,
                    error: 'network error',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                })
                })
        
    }
}

function handleData(dispatch, storeName, data){
    dispatch({
        type:Types.HOT_LOAD_SUCCESS,
        items: data.data.data.subjects,
        storeName: storeName,
        pageIndex: 0
    })
}
