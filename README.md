# threejs 学习

# 安装的插件

- 格式化工具用 clang-format

  > 1. 要上面的起作用必须 下载编译器
  > 2. [编译器官网](https://releases.llvm.org/)
  > 3. [直接下载地址](https://github.com/llvm/llvm-project/releases) 我这边下载的是`LLVM-14.0.6-win64.exe`
  > 4. 下载完成之后 配置 clang-format 的执行文件路径
  > 5. 看看自己的环境变量中有没有下面的 path `C:\Program Files\LLVM\bin` 我这边装在了 c 盘

- 编译器 glslify
  > 这边使用的是 vite 插件`vite3-plugin-glslif` 为了配合 vite3 的发布 我 fork 原地址将其升级到了 vite3
  > 用法 这边可以直接解析 `.vs`,`.fs`,`.glsl`,`.frag`,`.vert`
