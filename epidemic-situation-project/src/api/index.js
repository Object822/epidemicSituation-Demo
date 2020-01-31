/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://api.tianapi.com/txapi/ncovcity/index'
const BASE_URL = '/api'
const key = '7695a5b7dfc1f80fabda9191bb5cda85'

// 1、获取中国各地区的疫情情况
export const getEpidemicSituation = () => ajax(`${BASE_URL}/txapi/ncovcity/index?key=${key}`)
export const getResistEpidemicSituation = () => ajax(`${BASE_URL}/txapi/ncov/index?key=${key}`)
export const getRumourData = () => ajax(`${BASE_URL}/txapi/rumour/index?key=${key}`)


