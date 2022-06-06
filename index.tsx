import * as React from "react";
import * as ReactDOM from "react-dom";
import MenuBar from "./menu-bar/menu-bar";
import Footer from "./footer/footer";

class Index extends React.Component {

    render(): JSX.Element {
        return <div className={'index'}>
            <MenuBar />
            <div className={"content"} />
            <Footer />
        </div>
    }
}

ReactDOM.render(<Index />, document.getElementById("root"));
