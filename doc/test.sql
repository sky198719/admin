/*
Navicat MySQL Data Transfer

Source Server         : demo
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2018-12-29 15:15:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectname` varchar(255) NOT NULL DEFAULT '',
  `opentime` varchar(255) DEFAULT '',
  `limittime` varchar(255) DEFAULT '',
  `ownerid` varchar(255) DEFAULT '',
  `endtime` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('31', '浦东北蔡项目引导页', '', '', '1', '');
INSERT INTO `project` VALUES ('32', '浦东北蔡镇河道监控大屏', '', '', '1', '');
INSERT INTO `project` VALUES ('33', '浦东北蔡镇环境监控大屏', '', '', '4', '');
INSERT INTO `project` VALUES ('34', '浦东潍坊街道大屏项目', '', '', '12', '');
INSERT INTO `project` VALUES ('35', '浦东潍坊后台管理', '', '', '4', '');
INSERT INTO `project` VALUES ('36', '长妇幼网络监控可视化大屏项目', '', '', '4', '');
INSERT INTO `project` VALUES ('37', '智能药店分析系统', '', '', '4', '');
INSERT INTO `project` VALUES ('38', '街道智慧停车', '', '', '11', '');
INSERT INTO `project` VALUES ('39', '信导短信服务', '', '', '4', '');
INSERT INTO `project` VALUES ('40', '智能销售系统', '', '', '11', '');
INSERT INTO `project` VALUES ('41', '精准营销短信渠道服务', '', '', '12', '');
INSERT INTO `project` VALUES ('42', '存量维系大屏', '', '', '1', '');
INSERT INTO `project` VALUES ('43', '存量维系功能页面', '', '', '11', '');
INSERT INTO `project` VALUES ('44', '医保智能监督系统', '', '', '1', '');
INSERT INTO `project` VALUES ('54', '浦东北蔡智能小区', '', '', '11', '');
INSERT INTO `project` VALUES ('55', '潍坊视频分析大屏', '', '', '4', '');
INSERT INTO `project` VALUES ('56', '智能外呼系统', '', '', '12', '');

-- ----------------------------
-- Table structure for tokenkey
-- ----------------------------
DROP TABLE IF EXISTS `tokenkey`;
CREATE TABLE `tokenkey` (
  `key` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tokenkey
-- ----------------------------
INSERT INTO `tokenkey` VALUES ('unicom');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `realname` varchar(255) NOT NULL DEFAULT '',
  `token` varchar(255) DEFAULT '',
  `usertype` varchar(255) NOT NULL DEFAULT '',
  `lastlogin` varchar(255) DEFAULT '',
  `img` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'zhangjunjie', 'skycat8719', '张俊杰', '154606f1dfc85c143c4d2f9a0bcd5f0140698e4f06997188', '0', '2018/12/29 15:3:17', '/static/images/sculpture/1/E8FooIg6EN5rYdmV9IOPDU7s.png');
INSERT INTO `user` VALUES ('4', 'chengyaru', '123456', '程雅茹', '154589f4d39da2ee2ff7ebbd0e52e4fde0fffbf1d9528106', '1', '2018/12/27 16:32:8', '');
INSERT INTO `user` VALUES ('11', 'lijinhui', '111111', '李金辉', '', '1', '2018/12/28 10:50:3', '/static/images/sculpture/11/P3HXqJhd6dOa1eiPM3eh85R7.png');
INSERT INTO `user` VALUES ('12', 'donglei', '111111', '董雷', '', '1', '2018/12/28 10:50:15', '/static/images/sculpture/12/x0uP-G6QjHkUgpc5RBRAGJwz.png');
