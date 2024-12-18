import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import React from 'react'

const cart = () => {
    return (
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Content>Content</Content>
                <Sider width="25%">
                    Sider
                </Sider>
            </Layout>
        </Layout>
    )
}

export default cart