/**
 * hot相关的reducer汇总
 */
import Types from '../../action/types'


/**
 * hot:{
 *   喜剧: {
 *      items: [],
 *      isLoading: false,
 *   },
 *   灾难: {
 *      items: [],
 *      isLoading: false,
 *   }
 *  ...
 * }
 * state树，横向扩展
 * 动态的设置store，和动态获取store（难点：storeName不固定）
 * @export
 * @param {*} [state=defaultState]
 * @param {*} action
 * @returns
 */

const defaultState={}
export default function onAction(state = defaultState, action){
    switch(action.type){
        case Types.HOT_REFRESH: // 下拉刷新
            return {
                // 复制一份
                ...state,
                // 取出storeName对应的数据然后加上isLoading
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore:true,
                }
            }
        case Types.HOT_LOAD_SUCCESS: // 下拉刷新成功
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    items: action.items,
                    isLoading: false,
                    hideLoadingMore:false,
                    pageIndex: action.pageIndex
                }
            }
        case Types.HOT_LOAD_FAIL: // 下拉刷新失败
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading: false,
                    hideLoadingMore:true,
                }
            }
        case Types.HOT_LOAD_MORE_SUCCESS: // 上拉加载成功
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    items: action.items,
                    hideLoadingMore: false,
                    pageIndex:action.pageIndex,
                }
            }
        case Types.HOT_LOAD_MORE_FAIL: // 上拉加载失败
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex:action.pageIndex,
                }
            }
        default:
            return state
    }

}