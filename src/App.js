import React, { Component } from 'react';
// npm install react-router react-router-dom --save (安裝react-router-dom 即可)
import { BrowserRouter } from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      // 最外層加上BrowserRouter，裡面即可使用Route
      // 使用react-router時，可能因為回傳的過程無法被正常讀取而顯示404 error，因此需設定永遠顯示index；當網頁內容設定在網域子folder時，須設定basepath方能順利運行
      <BrowserRouter basename="/">
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
