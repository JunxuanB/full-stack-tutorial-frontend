import { useNavigate, useParams } from "react-router-dom";
import Notice from "../components/Notice"
import TemplateComponent from "../components/TemplateComponent";

const HelloWorld = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <>
            <button onClick={() => navigate('/temp/1')}>跳转到 /hello/2</button>
            <TemplateComponent>
                <>
                    <Notice title={"提示条 #" + id} content="这是一个内容" />
                    <p>
                        Hello world!
                    </p>
                </>
            </TemplateComponent>
        </>
    )
}

export default HelloWorld