import React, {Component} from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state ={
      component: null
    }

    componentDidMount () {
      importComponent()
        .then(cmp => {
          this.setState({component: cmp.default});
        });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }
}

export default asyncComponent;

// asyncComponent接收到importComponent後先在componentDidMount執行已得到正確的顯示內容(會以promise方式回傳，並存於default中)，將結果存於state，接著讀取相關內容在render中顯示