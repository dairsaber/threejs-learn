/** 片元着色器 */
export const fragmentShader = /* glsl */ `

  precision highp float;

  varying vec2 vUv;
  uniform vec3 color;
  uniform float time;
  void main(){
    vec2 center = vec2(0.5, 0.5);
    // vec2 pos = vUv;

    // 现在将vUv 2等分 归一化
    vec2 pos = mod(vUv * 8.0 , 1.0);

    
    float d = distance(pos, center);

    // 则个三元可以用gl自带的step函数取代
    // float mask = d > 0.25 ? 0.0 : 1.0;
    // float mask = step(0.25, d); // 大于0.25返回1.0 小于返回0 为了有所变化 我们可以将0.25 不写死 用vUv变量控制

    float mask = step(0.25 + sin(time + vUv.x * 2.0) * 0.25, d);
    // 这边在做一层反转就和上面一样了
    mask = 1.0 - mask;

    // 混合颜色
    vec3 fragColor = mix(color, vec3(1), mask);

    gl_FragColor = vec4(vec3(fragColor) ,1.0 ); 
  }
`

/** 顶点着色器 */
export const vertexShader = /* glsl */ `

  precision highp float;

  varying vec2 vUv;
  void main(){
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position ,1 );
  }

`
