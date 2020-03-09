import React from "react";

const withStatus = (WrappedComponent: any) => {
    class WithStatus extends React.Component<any, any> {
        constructor(props: any) {
            super(props);
        }

        render() {
            return (
                <WrappedComponent  {...this.props}  ></WrappedComponent>
            );
        }
    }

    return WithStatus;
}


export default withStatus;
