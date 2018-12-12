'use strict';

const { JDateRepository, CacheSpaceOnJDate } = require('@behaver/jdate');
const IAU1976Seqs = require('./data/IAU1976');
const IAU2000Seqs = require('./data/IAU2000');
const IAU2006Seqs = require('./data/IAU2006');

/**
 * Precession
 *
 * Precession 是IAU岁差计算组件。
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 2.0.0
 * @license MIT
 */
class Precession {

  /**
   * 构造函数
   *
   * @param  {JDateRepository} options.epoch 儒略时间仓库 对象
   * @param  {String}          options.model 计算模型
   */
  constructor({
    epoch,
    model,
  }) {
    this.private = {};
    this.epoch = epoch;

    if (model === undefined) model = 'iau2006';
    this.model = model;
  }

  /**
   * 设置 计算历元对象
   * 
   * @param  {JDateRepository} value 计算历元对象
   */
  set epoch(value) {
    if (!(value instanceof JDateRepository)) throw Error('The param epoch has to be a JDateRepository.');
    
    this.private.epoch = value;

    // 创建基于历元的缓存空间
    this.cache = new CacheSpaceOnJDate(value);
  }

  /**
   * 获取 计算历元对象
   * 
   * @return {JDateRepository} 计算历元对象
   */
  get epoch() {
    return this.private.epoch;
  }

  /**
   * 设置 计算模型字串
   * 
   * @param  {String} value 计算模型字串
   */
  set model(value) {
    if (typeof(value) !== 'string') throw Error('The property model should be a String.');

    let model = value.toLowerCase();

    if (model !== this.private.model) {
      switch(model) {

        case 'iau1976':
          this.seqs = IAU1976Seqs;
          break;

        case 'iau2000':
          this.seqs = IAU2000Seqs;
          break;
          
        case 'iau2006': 
          this.seqs = IAU2006Seqs;
          break;

        default: 
          throw Error('The property model should be iau1976, iau2000 or iau2006.');
      }

      this.private.model = model;

      // 清空缓存
      this.cache.clear();
    }
  }

  /**
   * 获取 计算模型字串
   * 
   * @return {String} 计算模型字串
   */
  get model() {
    return this.private.model;
  }

  /**
   * 获取 岁差计算项 数值
   *
   * 单位：角秒
   *
   * @param  {String} key          岁差计算项
   * @return {Number}              计算结果
   */
  get(key) {
    if (key === 'epsilon0') return this.seqs['epsilon'][0];
    else if (key in this.seqs) {
      if (!this.cache.has(key)) {
        this.cache.set(key, this.calc(key));
      }

      return this.cache.get(key);
    } else throw Error('The param key is illegality.')
  }

  /**
   * 岁差项运算（运算结果不进入缓存）
   *
   * @private
   * @param  {String} key          岁差计算项
   * @return {Number}              计算结果
   */
  calc(key) {
    // 指定的项数据
    const idata = this.seqs[key];

    let res = 0,
        epoch = this.private.epoch;

    // 执行累加计算
    for (var i = 0; i < idata.length; i++) {
      res += idata[i] * epoch.JDECP(i);
    }

    return res;
  }

  /**
   * 获取 岁差计算项 Ρ 的数值
   *
   * 黄道岁差 P = sin(pi) * sin(II)
   * 单位：角秒
   *
   * @return {Number}              Ρ 的数值
   */
  get P() {
    return this.get('P');
  }

  /**
   * 获取 岁差计算项 Q 的数值
   *
   * 黄道岁差 Q = sin(pi) * cos(Π)
   * 单位：角秒
   *
   * @return {Number}              Q 的数值
   */
  get Q() {
    return this.get('Q');
  }

  /**
   * 获取 岁差计算项 η 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              η 的数值
   */
  get eta() {
    return this.get('eta');
  }

  /**
   * 获取 岁差计算项 Π 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              Π 的数值
   */
  get pi() {
    return this.get('pi');
  }

  /**
   * 获取 岁差计算项 ι 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              ι 的数值
   */
  get p() {
    return this.get('p');
  }

  /**
   * 获取 岁差计算项 ε0 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              ε0 的数值
   */
  get epsilon0() {
    return this.get('epsilon0');
  }

  /**
   * 获取 岁差计算项 ε 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              ε 的数值
   */
  get epsilon() {
    return this.get('epsilon');
  }

  /**
   * 获取 岁差计算项 χ 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              χ 的数值
   */
  get chi() {
    return this.get('chi');
  }

  /**
   * 获取 岁差计算项 ω 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              ω 的数值
   */
  get omega() {
    return this.get('omega');
  }

  /**
   * 获取 岁差计算项 ψ 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              ψ 的数值
   */
  get psi() {
    return this.get('psi');
  }

  /**
   * 获取 岁差计算项 θ 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              θ 的数值
   */
  get theta() {
    return this.get('theta');
  }

  /**
   * 获取 岁差计算项 ζ 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              ζ 的数值
   */
  get zeta() {
    return this.get('zeta');
  }

  /**
   * 获取 岁差计算项 zA 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              zA 的数值
   */
  get z() {
    return this.get('z');
  }
}

module.exports = Precession;
