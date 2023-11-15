---
title: 安装IBAMR-0.5.1
categories: []
tags: []
katex: false
comments: false
license: false
cc_license: false
date: 2023-11-02 14:13:35
---
安装IBAMR-0.5.1
<!--more-->
### 安装命令
``` bash
echo 'export PETSC_DIR=$HOME/ibamr/petsc'                >> $HOME/.bashrc
echo 'export PETSC_ARCH=linux-opt'                       >> $HOME/.bashrc
echo 'export IBAMR_DIR=$HOME/ibamr/IBAMR/ibamr-objs-opt' >> $HOME/.bashrc
echo 'export BOOST_ROOT=$HOME/ibamr/boost'               >> $HOME/.bashrc

source $HOME/.bashrc
```


