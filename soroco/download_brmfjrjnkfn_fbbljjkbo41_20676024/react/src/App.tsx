import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  let cancelToken;
  const defaultList = [];

  const [list, updateList] = useState(defaultList);
  const [intialList, updateIntialList] = useState(defaultList);
  const [commentText, updateTodo] = useState("");
  const [count, updateCount] = useState(1);
  const [searchText, updateSearchText] = useState("");

  /**
   * @abstract this is called when component is rendered for the first time
   * @author rajat Kumar
   */
  useEffect(() => {
    axios.get(`http://localhost:3001/api/comments/`).then((res) => {
      const comments = res.data;
      updateList(comments);
      updateIntialList(comments);
    });
  }, []);

  /**
   * @abstract This function is used to remove the comment
   * @param {number} idx  index
   * @author Rajat Kumar
   */
  const handleRemoveItem = (idx) => {
    axios
      .delete(`http://localhost:3001/api/comments/${list[idx].id}`)
      .then((res) => {});
    // assigning the list to temp variable
    const temp = [...list];
    // removing the element using splice
    temp.splice(idx, 1);
    // updating the list
    updateList(temp);
  };

  /**
   * @abstract this function is used to add comment
   * @author Rajat Kumar
   */
  const addTodo = () => {
    updateCount(count + 1);
    axios
      .post(`http://localhost:3001/api/comments/`, { text: commentText })
      .then((res) => {});

    const temp = [...list, { id: count, text: commentText }];
    updateList(temp);
    updateTodo("");
  };

  /**
   * @abstract this function is used to reset the database to intial content
   * @author Rajat Kumar
   */
  const resetCommentFeed = () => {
    axios.post(`/api/reset-comments`).then((res) => {});
    setTimeout(reset, 1000);
  };
  const reset = () => {
    axios.get(`http://localhost:3001/api/comments/`).then((res) => {
      const comments = res.data;
      updateList(comments);
    });
  };

  /**
   * @abstract this function is used to search
   * @param {String} text this used to search
   * @author Rajat Kumar
   */
  const search = async (text) => {
    const searchTerm = text;
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.");
    }
    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();
    try {
      const results = await axios.get(
        `http://localhost:3001/api/comments?q=${searchTerm}`,
        { cancelToken: cancelToken.token } //Pass the cancel token to the current request
      );

      updateList(results.data);
    } catch (error) {}
    updateSearchText(text);
  };
  return (
    <div>
      <header>
        <h1 className="header">Comment Feed</h1>
        <button onClick={resetCommentFeed}>Reset comment feed</button>
      </header>

      <input
        type="text"
        id="inputSearch"
        maxLength={80}
        className="inputText"
        value={searchText}
        onChange={(e) => search(e.target.value)}
      ></input>
      <button id="add-btn" className="add">
        Search
      </button>
      <input
        type="text"
        id="input"
        maxLength={80}
        className="inputText"
        value={commentText}
        onChange={(e) => updateTodo(e.target.value)}
      ></input>
      <button id="add-btn" className="add" onClick={addTodo}>
        Add
      </button>
      {list.map((item, idx) => {
        return (
          <div key={idx} className="todoText">
            <button onClick={() => handleRemoveItem(idx)} id={item.del}>
              {" "}
              Remove{" "}
            </button>
            <p id={item.paraId}>{item.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
