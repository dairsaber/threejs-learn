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

- 注意

  > 这边格式化 在 glsl 中要启用手动格式化,这边有冲突, 比如
  >
  > ```glsl
  > #pragma glslify: snoise3 = require('glsl-noise/simplex/3d'); // 这句话并不输入glsl语法, 他是glslify 的导入语法 在格式化之后,会变的不可解析
  >
  > precision highp float;
  > varying vec2 vUv;
  > uniform vec3 color;
  > uniform float time;
  >
  > void main() {
  >   // 球形的 uv和我们想的不一样
  >   vec2 center = vec2(0.5, 0.5);
  >   vec2 q = vUv;
  >   // 球的 uv展开 不是一个正方形的  x/y 大概是两倍的关系 这边 *2.0
  >   // 来近似的弥补误差 当然这只是最简单的 效果并不是很理想 越到 球的两端
  >   // 畸形的越厉害
  >   q.x *= 2.0;
  >
  >   // 现在将vUv 2等分 归一化
  >   vec2 pos = mod(q * 8.0, 1.0);
  >
  >   float d = distance(pos, center);
  >
  >   // 则个三元可以用gl自带的step函数取代
  >   // float mask = d > 0.25 ? 0.0 : 1.0;
  >   // float mask = step(0.25, d); // 大于0.25返回1.0 小于返回0 为了有所变化
  >   // 我们可以将0.25 不写死 用vUv变量控制
  >
  >   // float mask = step(0.25 + sin(time + vUv.x * 2.0) * 0.25, d);
  >
  >   float offset = snoise3(vec3(vUv.xy, time));
  >
  >   float mask = step(0.25 + offset, d);
  >   // 这边在做一层反转就和上面一样了
  >   mask = 1.0 - mask;
  >
  >   // 混合颜色
  >   vec3 fragColor = mix(color, vec3(1), mask);
  >
  >   gl_FragColor = vec4(vec3(fragColor), 1.0);
  > }
  > ```
  >
  > 解决办法 现在实在配置的时候 将 clang-format 保存自动格式化取消, 在格式化文档时选择行的格式化
