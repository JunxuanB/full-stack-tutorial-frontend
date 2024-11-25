import { Button } from "antd";
import { useState } from "react";

interface Props {
  title: string;
  content: string;
}

const Notice = (props: Props) => {
  const [closed, setClosed] = useState(false);
  return (
    !closed && // 如果 closed 为 true 则不显示
    <div
      style={{
        width: '50%', // 我在这里修改为了 50% 为了确保他可以被完整地显示
        border: '1px dotted #aaa',
        borderRadius: '5px',
        padding: '10px',
        position: 'relative',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h4
        style={{
          margin: 0,
          paddingBottom: '5px',
          fontSize: '16px',
          color: '#333',
          borderBottom: '1px solid #ddd',
        }}
      >
        {props.title}

        {/* 使用 antd 的按钮 新增一个靠右的按钮 */}
        <Button
        type="link"
        onClick={() => setClosed(!closed)}
        style={{
          position: 'absolute',
          right: '0px',
          top: '5px',
          fontSize: '14px',
        }}
        >
          隐藏
        </Button>
      </h4>
      <p
        style={{
          margin: '10px 0 0',
          fontSize: '14px',
          color: '#555',
        }}
      >
        {props.content}
      </p>
    </div>
  );
};

export default Notice