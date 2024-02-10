import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import Pills from './components/Pills';

function App() {
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedUsersSet, setSelectedUsersSet] = useState(new Set([]));
  const inputRef = useRef(null);

  const handleSelectUser = (user) =>{
    console.log('added user details : ', user);
    setSelectedUsers([...selectedUsers,user]);
    setSelectedUsersSet(new Set([...selectedUsersSet, user.email]));
    setUserInput('');
    setSuggestions([]); 
    inputRef.current.focus();
  }
  console.log('selected users : ',selectedUsers);
  
  const removePillHandler = (user) =>{
    console.log('on cancel user : ',user);
    const updatedUsers = selectedUsers.filter((selectedUser)=>selectedUser.id !== user.id);
    setSelectedUsers(updatedUsers);
    const updatedEmails = new Set(selectedUsersSet);
    updatedEmails.delete(user.email);
    setSelectedUsersSet(updatedEmails);

  }
  useEffect(() => {
    const userApiCalling = async()=>{
      if(userInput.trim() === '')
      {
        setSuggestions([]);
        return; 
      }
      const searchUser = await axios.get(`https://dummyjson.com/users/search?q=${userInput}`);
      // console.log('searched user  : ',searchUser );
      // console.log('searched user data : ',searchUser.data.users );
      setSuggestions(searchUser.data.users);
    }
    userApiCalling();
  }, [userInput])
  
  const onBackspaceDeleteHandler =(event)=>{
    console.log('events : ',event);
    console.log('backspace value : ',event.code);
    if(event.key === 'Backspace' && event.target.value === '' && selectedUsers.length > 0)
    {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      removePillHandler(lastUser);
      setSuggestions([]);
    }

  }

  return ( 
    <>
      <div className="outer-container">
        <h1>Select Multiple Options From Search Suggestion.</h1>
        <div className="multi-select-search-container">
          <div className="user-search-input">
            {/* Pills */}
            <div className='pills-container'>
              {
                selectedUsers?.map((user,index)=>{
                  return <Pills key={index} userImg={user.image} email={user.email} name={`${user.firstName}  ${user.lastName}`} handler={(e)=>removePillHandler(user)} />
                })
              }
            </div>
            {/* <div> */}
              <input type="text" ref={inputRef} onKeyDown={onBackspaceDeleteHandler} autoFocus={true} value={userInput} placeholder='Search User...' onChange={(e)=>setUserInput(e.target.value)} />
            {/* </div> */}
            {/* Suggestions */}
            <div className='suggest-list'>
              {
                suggestions?.map((item,index)=>{
                  return !selectedUsersSet.has(item.email) && (<div className='suggest-list-item' key={item.email} onClick={(e)=>handleSelectUser(item)}>
                    <img src={item.image} alt={item.firstName} />
                    <span>{`${item.firstName}   ${item.lastName}`}</span>
                  </div>)  
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
