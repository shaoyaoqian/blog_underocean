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
# ibamr 及其依赖将安装到 $HOME/ibamr 文件夹下，需要先删除 $HOME/ibamr 文件夹，确保安装过程不受影响。
rm -rf $HOME/ibamr

# .IBAMR.BAK 中的备份文件拷贝到 $HOME/ibamr 目录下。
cp -r $HOME/.IBAMR.BAK $HOME/ibamr

# 第一步：安装boost
cd ~/ibamr
tar xfz boost_1_64_0.tar.gz
mv boost_1_64_0 boost
export BOOST_ROOT=$HOME/ibamr/boost
mkdir -p $BOOST_ROOT/include
ln -s $BOOST_ROOT/boost $BOOST_ROOT/include
rm boost_1_64_0.tar.gz

# 安装HDF5
cd ~/ibamr
mkdir -p hdf5
tar xfz hdf5-1.8.12.tar.gz
cd hdf5-1.8.12
./configure \
  CC=gcc \
  CXX=g++ \
  FC=gfortran \
  F77=gfortran \
  --enable-production \
  --disable-debug \
  --prefix=$HOME/ibamr/hdf5
  
make -j36
make install
cd $HOME/ibamr
rm hdf5-1.8.12.tar.gz
rm -r hdf5-1.8.12

# 安装silo
cd $HOME/ibamr
tar xfz silo-4.10.tar.gz
cd silo-4.10
./configure \
  CC=gcc \
  CXX=g++ \
  FC=gfortran \
  F77=gfortran \
  --prefix=$HOME/ibamr/silo \
  --disable-silex

make -j72
make install
cd $HOME/ibamr
rm -r silo-4.10
rm silo-4.10.tar.gz

# 安装petsc
cd ~/ibamr
export PETSC_DIR=$HOME/ibamr/petsc
export PETSC_ARCH=linux-opt
tar xfz petsc-v3.10.5.tar.gz
mv petsc-v3.10.5 petsc
tar -xf externalpackages.tar
mkdir -p $PETSC_DIR/$PETSC_ARCH
mv externalpackages $PETSC_DIR/$PETSC_ARCH

cd $PETSC_DIR
./configure \
  --CC=mpicc \
  --CXX=mpicxx \
  --FC=mpif90 \
  --COPTFLAGS="-O3" \
  --CXXOPTFLAGS="-O3" \
  --FOPTFLAGS="-O3" \
  --PETSC_ARCH=$PETSC_ARCH \
  --with-debugging=0 \
  --download-hypre=1 \
  --download-fblaslapack=1 \
  --with-x=0
make -j36
make test

# 安装samrai
cd ~/ibamr
tar xfz SAMRAI-v2.4.4.tar.gz
mv SAMRAI samrai
cd samrai
cp ../ibamr-samrai-fixes.patch ibamr-samrai-fixes.patch
patch -p1 < ibamr-samrai-fixes.patch

# 配置安装
./configure \
  CFLAGS="-O3" \
  CXXFLAGS="-O3" \
  FFLAGS="-O3" \
  --prefix=$HOME/ibamr/samrai/linux-g++-opt \
  --with-CC=mpicc \
  --with-CXX=mpicxx \
  --with-F77=mpifort \
  --with-hdf5=$HOME/ibamr/hdf5 \
  --without-hypre \
  --without-silo \
  --without-blaslapack \
  --without-cubes \
  --without-eleven \
  --without-kinsol \
  --without-petsc \
  --without-sundials \
  --without-x \
  --with-doxygen \
  --with-dot \
  --disable-debug \
  --enable-opt \
  --enable-implicit-template-instantiation \
  --disable-deprecated

make -j36
make install
cd ~/ibamr
rm SAMRAI-v2.4.4.tar.gz

# 注意：最新版的IBAMR需要libmesh1.1.0以上版本
cd $HOME/ibamr/
tar xfz libmesh-1.2.1.tar.gz
mv libmesh-1.2.1 libmesh
cd ~/ibamr/libmesh
mkdir -p objs-opt
cd objs-opt
../configure \
  --prefix=$HOME/ibamr/libmesh/1.2.1-opt \
  --with-methods=opt \
  PETSC_DIR=$HOME/ibamr/petsc \
  PETSC_ARCH=linux-opt \
  CC=mpicc \
  CXX=mpicxx \
  FC=mpif90 \
  F77=mpif90 \
  --enable-exodus \
  --enable-triangle \
  --disable-boost \
  --disable-openmp \
  --disable-perflog \
  --disable-pthreads \
  --disable-strict-lgpl \
  --disable-glibcxx-debugging

make -j36
make install
cd $HOME/ibamr/
rm libmesh-1.2.1.tar.gz

# 安装ibamr
cd ~/ibamr
tar xfz IBAMR-0.5.1.tar.gz
mv IBAMR-0.5.1 IBAMR
cd IBAMR
mkdir -p ibamr-objs-opt
cd ibamr-objs-opt
../configure \
  CC=mpicc \
  CXX=mpicxx \
  F77=mpif90 \
  FC=mpif90 \
  MPICC=mpicc \
  MPICXX=mpicxx \
  CFLAGS="-O3 -Wall" \
  CXXFLAGS="-O3 -Wall -std=c++11" \
  FFLAGS="-O3 -Wall" \
  FCFLAGS="-O3 -Wall" \
  CPPFLAGS="-DOMPI_SKIP_MPICXX" \
  --with-hypre=$PETSC_DIR/$PETSC_ARCH \
  --with-samrai=$HOME/ibamr/samrai \
  --with-hdf5=$HOME/ibamr/hdf5 \
  --with-silo=$HOME/ibamr/silo \
  --with-boost=$HOME/ibamr/boost \
  --enable-libmesh \
  --with-libmesh=$HOME/ibamr/libmesh/1.2.1-opt \
  --with-libmesh-method=opt

make lib -j36

echo 'export PETSC_DIR=$HOME/ibamr/petsc'                >> $HOME/.bashrc
echo 'export PETSC_ARCH=linux-opt'                       >> $HOME/.bashrc
echo 'export IBAMR_DIR=$HOME/ibamr/IBAMR/ibamr-objs-opt' >> $HOME/.bashrc
echo 'export BOOST_ROOT=$HOME/ibamr/boost'               >> $HOME/.bashrc

source $HOME/.bashrc
```


