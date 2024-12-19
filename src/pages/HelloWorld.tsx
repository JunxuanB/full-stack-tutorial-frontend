import { useNavigate, useParams } from "react-router-dom";
import Notice from "../components/Notice"
import TemplateComponent from "../components/TemplateComponent";
import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { myAPI } from "../axios";

const HelloWorld = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState<
        {
            id: number,
            name: string,
            price: number
        }[]
    >([]);

    useEffect(() => {
        myAPI.get('products.json')
            .then(response => {
                setProducts(response.data.products);
            });
    }, []);

    useEffect(() => {
        axios.post('https://jsonplaceholder.typicode.com/posts', {
            name: 'Orange',
            price: 1.49
        })
            .then(response => {
                console.log(response.data);
            });
    }, []);

    return (
        <Flex vertical gap={'middle'}>
            <button onClick={() => navigate('/cart')}>购物车</button>

            <div>
                {products.map(product => (
                    <div key={product.id}>
                        {product.id} - {product.name} - ${product.price}
                    </div>
                ))}
            </div>

            <Button type="primary">Hello World</Button>
            <button onClick={() => navigate('/temp/1')}>跳转到 /hello/2</button>
            <TemplateComponent>
                <>
                    <Notice title={"提示条 #" + id} content="这是一个内容" />
                    <p>
                        Hello world!
                    </p>
                </>
            </TemplateComponent>
        </Flex>
    )
}

export default HelloWorld