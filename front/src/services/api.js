import axios from 'axios';

const saveAccount = (account) => {
  return axios.post('http://localhost:3000/users',
    {
      email: account.email,
      password: account.password
    }
  )
}

export { saveAccount }