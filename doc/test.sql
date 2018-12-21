/*
Navicat MySQL Data Transfer

Source Server         : demo
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2018-12-21 17:57:25
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
  `point` varchar(255) DEFAULT '',
  `endtime` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('23', '测试项目', '2018-11-11', '2018-12-01', '1', '5', '');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'zhangjunjie', 'skycat8719', '张俊杰', '154538e0d10b30832e57ad1267ff0f8a5410076065256', '0', '2018/12/21 17:54:25');
INSERT INTO `user` VALUES ('4', 'chengyaru', '123456', '程雅茹', '', '0', '2018/12/21 17:14:6');
INSERT INTO `user` VALUES ('11', 'lijinhui', '123456', '李金辉', '', '0', '2018/12/21 13:53:42');
INSERT INTO `user` VALUES ('12', 'donglei', '123456', '董雷', '', '0', '2018/12/21 17:54:7');
INSERT INTO `user` VALUES ('57', 'test', '111111', '测试', '1545389ab090671ac73a9da8614c329081b16d4457024', '1', '2018/12/21 17:27:37');
INSERT INTO `user` VALUES ('73', '132123', '333333', '1232', '', '1', '');
