const TemplateComponent = ( props: { children: JSX.Element } ) => {
    return (
      <div
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3>测试页面</h3>
        {props.children}
      </div>
    );
  }

export default TemplateComponent