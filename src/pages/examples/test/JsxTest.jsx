import { defineComponent } from "vue"

const FunctionHeader = (props) => <h1>{props?.header}</h1>
const FunctionBody = (props) => <p>{props?.body}</p>

export default defineComponent(() => {
  const header = <span class="text-red-400 text-xl font-bold">我是一个头部</span>
  const body = "我是一段描述性文字"
  return () => (
    <div>
      <FunctionHeader header={header} />
      <FunctionBody body={body} />
    </div>
  )
})
