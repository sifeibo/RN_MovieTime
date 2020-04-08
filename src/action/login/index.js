import Types from '../types'
import axios from 'axios';

var tag = 0
/**
 * 登录获取用户信息
 * @export
 * @param {*} name
 * @param {*} password
 * @returns
 */
export function onLogin(name, password){
    // 这里的dispatch是一个对象，不是那个传入reducer的方法
    return dispatch=>{
        // 解决axios的post格式问题，原格式为application/json，传递json字符串：{"name":"123","password":"123"}
        // 而我需要传递application/x-www-form-urlencoded格式，类似 key-value的格式
        // 1. 使用formData 去创建数据，传递的自然就是formData格式
        // let formData = new FormData()
        // formData.append('name',this.state.name)
        // formData.append('password',this.state.password)
        axios({method: 'post',
        url: 'http://192.168.43.62:9999/login/', 
        // data: formData,
        // 2. 增加transformRequest方法在发送post数据之前改变数据格式
        data:{
          name: name,
          password: password
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      })
      .then(response =>{
        if(response.data.msg === '登录成功'){
          dispatch({
            type: Types.LOGIN_SUCCESS,
            msg: response.data.msg,
            userInfo: response.data.data
          })
        }else{
          dispatch({
            type: Types.LOGIN_FAIL,
            msg: response.data.msg,
          })
        }
       
      })
      .catch(error =>{
        dispatch({
            type: Types.LOGIN_NETFAIL,
            msg: '网络错误',
            error
        })
      });
    }
}

/**
 * 更改用户信息
 * @export
 * @param {*} name
 * @param {*} password
 * @returns
 */
export function onChangeUser(userInfo){
  // 这里的dispatch是一个对象，不是那个传入reducer的方法
  return dispatch=>{
      axios({method: 'post',
      url: 'http://192.168.43.62:9999/changeUser/', 
      data:{
        obj: JSON.stringify(userInfo)
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    })
    .then(response =>{
      if(response.data.msg === '修改成功'){
        dispatch({
          type: Types.CHANGE_SUCCESS,
          tag: ++tag,
          msg1: response.data.msg,
          userInfo: userInfo
        })
      }else{
        dispatch({
          type: Types.CHANGE_FAIL,
          tag: ++tag,
          msg1: response.data.msg,
        })
      }
     
    })
    .catch(error =>{
      dispatch({
          type: Types.CHANGE_NETFAIL,
          tag: ++tag,
          msg1: '网络错误',
          error
      })
    });
  }
}