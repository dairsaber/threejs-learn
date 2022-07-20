/** 片元着色器 */
export const fragmentShader = /* glsl */ `

  precision highp float;

  varying vec2 vUv;
  uniform vec3 color;
  uniform float time;
  void main(){
    gl_FragColor = vec4(vec3(vUv.x * sin(time),sin(time),vUv.y*cos(time)) * color ,1.0 ); 
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
