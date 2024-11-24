import { createRoot } from 'react-dom/client'
import './index.css'
import Notice from './components/Notice'

createRoot(document.getElementById('root')!).render(
  <>
    <Notice title="这是一个标题" content="这是一个内容" />
    <p>
      Hello world!
    </p>
  </>
  ,
)

