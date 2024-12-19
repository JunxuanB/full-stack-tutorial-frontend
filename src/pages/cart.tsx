import { Card, Col, Flex, Row, Typography, Image, Tag, Button, message } from "antd"
import { useEffect, useState } from "react";
import { myAPI } from "../axios";
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Decimal from 'decimal.js';

const Cart = () => {
    const { Title, Text } = Typography;
    const [messageApi, contextHolder] = message.useMessage();

    type Product = {
        id: number,
        name: string,
        price: number,
        discount: number,
        stock: number,
        image: string,
        realPrice: number
    }

    const [products, setProducts] = useState<Product[]>([]);

    const [cart, setCart] = useState<
        {
            id: number,
            quantity: number
        }[]
    >([]);

    useEffect(() => {
        myAPI.get('products.json')
            .then(response => {
                const newProducts = response.data.products as Product[];
                newProducts.forEach(product => {
                    product.realPrice = new Decimal(product.price).minus(product.discount).toDecimalPlaces(2).toNumber();

                });
                setProducts(newProducts);
            });
    }, []);

    const total = () => {
        let sum = new Decimal(0);
        cart.forEach(item => {
            const product = products.find(product => product.id === item.id);
            if (product) {
                sum = sum.plus(new Decimal(product.realPrice).times(item.quantity));
            }
        });
        return sum.toDecimalPlaces(2).toNumber();
    }

    const updateCart = (id: number, quantity: number) => {
        const product = products.find(product => product.id === id);
        if (!product || product.stock < quantity) {
            return;
        }
        let newCart = [...cart];
        let found = false;
        newCart.forEach(item => {
            if (item.id === id) {
                item.quantity += quantity;
                found = true;
                if (item.quantity <= 0) {
                    newCart = newCart.filter(item => item.id !== id);
                }
            }
        });
        if (!found && quantity > 0) {
            newCart.push({ id, quantity });
        }
        setCart(newCart);
        const updateProducts = [...products];
        updateProducts.forEach(product => {
            if (product.id === id) {
                product.stock -= quantity;
            }
        });
        setProducts(updateProducts);
    }

    return (
        <Card>
            {contextHolder}
            <Row>
                <Col span={16}>
                    <Title level={3} style={{ marginTop: 0 }}>水果商城 🍎</Title>
                    <Flex gap={5} wrap>
                        {products.map(product => (
                            <Card key={product.id}>
                                <Flex gap={1} vertical>
                                    <Title level={5} style={{ marginTop: -10 }}>
                                        <Tag color="cyan">#{product.id}</Tag>
                                        {product.name}
                                    </Title>
                                    <Text delete={product.discount > 0}>单价：${product.price}</Text>
                                    {product.discount > 0 && <Text mark>折后价：${product.realPrice}</Text>}
                                    <Text type="secondary">库存：{product.stock}</Text>
                                    <Image
                                        width={100}
                                        src={product.image}
                                    />
                                    <Button style={{ marginTop: 10 }} onClick={() => updateCart(product.id, 1)} disabled={product.stock <= 0}>加入购物车</Button>
                                </Flex>
                            </Card>
                        ))}
                    </Flex>
                </Col>
                <Col span={8}>
                    <Card title="购物车">
                        <Flex gap={5} vertical>
                            {cart.map(item => (
                                <Card key={item.id} size="small" style={{ marginBottom: 10 }}>
                                    <DeleteOutlined style={{ marginRight: 10, color: 'red' }} onClick={() => updateCart(item.id, -item.quantity)} />
                                    {products.find(product => product.id === item.id)?.name} - ${products.find(product => product.id === item.id)?.realPrice} |
                                    数量：<MinusCircleOutlined onClick={() => updateCart(item.id, -1)} /> {item.quantity} <PlusCircleOutlined onClick={() => updateCart(item.id, +1)} />
                                </Card>
                            ))}
                            <Title level={5}>总价：${total()}</Title>
                            <Button type="primary" onClick={() => { messageApi.success('已结算'); setCart([]) }}>结算</Button>
                        </Flex>
                    </Card>
                </Col>
            </Row>
        </Card>
    )
}

export default Cart