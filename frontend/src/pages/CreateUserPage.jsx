import React, {useState} from 'react'
import axios from 'axios'

const CreateUserPage = () => {
  //https://www.youtube.com/watch?v=8QgQKRcAUvM
  
  // Input fields state (set to empty)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Handling form sumbmission and preventing reload
  const submission = async (e) => {
    e.preventDefault()
    const userData = {username, email, password}
    console.log("Form submitted...")
    try{
      const response = await axios.post('http://localhost:5000/api/users/auth/signup', userData)
      localStorage.setItem('token', response.data.token)
      alert('User created')
    }
    catch(error) {
      console.error('Error creating user: ', error.response.data)
    }
  }



  // Basic user input for email, username, and password
  return (
    <div className = 'containter'>
      <div className = "header">
        <div className = "text"> Sign Up </div>
        <div className = "underline"></div>
      </div>

      <div className = "inputs">
      <form onSubmit={submission}>
        <div className = "input">
          <label htmlFor = "email"> Email:</label>
          <input 
          type="email" 
          id ="email" 
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className = "input">
          <label htmlFor = "username"> Username:</label>
          <input 
          type="username" 
          id ="username" 
          name="username"
          value={username}
          onChange={(e) =>setUsername(e.target.value)}/>
        </div>
        <div className = "input">
          <label htmlFor = "password"> Password:</label>
          <input 
          type="password" 
          id ="password" 
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit"> Create Account </button>
        </form>
      </div>

    </div>
  )

}

export default CreateUserPage