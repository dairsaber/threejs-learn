// import glslify from "glslify"
/** 片元着色器 */
export const fragmentShader = glsl(/* glsl */ `
  #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
  
  precision highp float;
  varying vec2 vUv;
  uniform vec3 color;
  uniform float time;


  void main(){
    // 球形的 uv和我们想的不一样
    vec2 center = vec2(0.5, 0.5);
    vec2 q = vUv;
    // 球的 uv展开 不是一个正方形的  x/y 大概是两倍的关系 这边 *2.0 来近似的弥补误差 当然这只是最简单的 效果并不是很理想
    // 越到 球的两端 畸形的越厉害
    q.x *= 2.0;

    // 现在将vUv 2等分 归一化
    vec2 pos = mod(q * 8.0 , 1.0);

    
    float d = distance(pos, center);

    // 则个三元可以用gl自带的step函数取代
    // float mask = d > 0.25 ? 0.0 : 1.0;
    // float mask = step(0.25, d); // 大于0.25返回1.0 小于返回0 为了有所变化 我们可以将0.25 不写死 用vUv变量控制

    // float mask = step(0.25 + sin(time + vUv.x * 2.0) * 0.25, d);

    float offset = snoise3(vec3(vUv.xy, time ));

    float mask = step(0.25 + offset, d);
    // 这边在做一层反转就和上面一样了
    mask = 1.0 - mask;

    // 混合颜色
    vec3 fragColor = mix(color, vec3(1), mask);

    gl_FragColor = vec4(vec3(fragColor) ,1.0 ); 
  }
`)

/** 顶点着色器 */
export const vertexShader = glsl(/* glsl */ `

  precision highp float;

  varying vec2 vUv;
  void main(){
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position ,1 );
  }

`)
