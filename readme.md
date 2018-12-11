# Precession 组件库

[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](#) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/@behaver/precession) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

## 简介

Precession 组件库用于计算天文学中的地球岁差运动，它包含计算模型: IAU1976、IAU2000 和 IAU2006 作为岁差。

Precession 系列组件的使用依赖于 [JDateRepository](https://github.com/behaver/jdate/blob/master/doc/JDateRepository.md)

## 用例

通过npm安装，在项目目录下执行：

`npm i @behaver/precession`

---

使用 Precession 组件计算岁差项：

```js
const Precession = require('@behaver/precession');
const { JDateRepository } = require('@behaver/jdate');

let jdr = new JDateRepository(new Date('1992/8/15 08:25:12'), 'date');
let precession = new Precession({
  epoch: jdr,
  model: 'iau1976',
});

// 岁差计算项 ε 的数值
console.log(precession.epsilon);

// 岁差计算项 ω 的数值
console.log(precession.omega);
```

## API

`constructor(options)`

构造函数:

* epoch 儒略时间仓库 对象
* model 计算模型

`set epoch(value)`

设置 计算历元对象

`get epoch()`

获取 计算历元对象

`set model(value)`

设置 计算模型字串

`get model()`

获取 计算模型字串

`get(key)`

获取 岁差计算项 数值，单位：角秒。

`get P()`

获取 岁差计算项 Ρ 的数值，单位：角秒。

`get Q()`

获取 岁差计算项 Q 的数值，单位：角秒。

`get eta()`

获取 岁差计算项 η 的数值，单位：角秒。
岁差项 η(eta) 是 J2000 黄道面与终历元黄道面的夹角

`get pi()`

获取 岁差计算项 Π 的数值，单位：角秒。

`get p()`

获取 岁差计算项 p 的数值，单位：角秒。

`get epsilon0()`

获取 岁差计算项 ε0 的数值，单位：角秒。
岁差项 ε0(epsilon) 为 J2000 历元的黄赤交角。

`get epsilon()`

获取 岁差计算项 ε 的数值，单位：角秒。
岁差项 ε(epsilon) 为黄赤交角。

`get chi()`

获取 岁差计算项 χ 的数值，单位：角秒。
岁差项 χ(chi) 为黄道岁差（行星岁差），是 J2000 春分点与终历元春分点在赤道上东移的夹角。

`get omega()`

获取 岁差计算项 ω 的数值，单位：角秒。
岁差项 ω(omega) 为瞬时赤道与历元黄道间的夹角。

`get psi()`

获取 岁差计算项 ψ 的数值，单位：角秒。
岁差项 ψ(psi) 为赤道岁差（日月岁差），是 J2000 春分点与终历元春分点在黄道上西移的夹角。

`get theta()`

获取 岁差计算项 θ 的数值，单位：角秒。

`get zeta()`

获取 岁差计算项 ζ 的数值，单位：角秒。

`get z()`

获取 岁差计算项 z 的数值，单位：角秒。

## 许可证书

The MIT license.