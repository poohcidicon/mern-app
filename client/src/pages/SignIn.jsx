import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const dispatch = useDispatch()

  const handleSingin = async (e) => {
    e.preventDefault()
    dispatch(loginStart())
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_KEY}/auth/signin`, {name: username, password})
      console.log(res)
      dispatch(loginSuccess(res.data))
    }
    catch (err) {
      dispatch(loginFailure())
    }
  }

  const signinWithGoogle = async () => {
    const userCredential  = await signInWithPopup(auth, provider)
      .then((res) => {
        return res
      })
      .catch((err) => console.log(err))
    
    if (userCredential){
      const res = await axios.post(`${process.env.REACT_APP_API_KEY}/auth/google`, {
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        img: userCredential.user.photoURL
      })
      if (res.data){
        dispatch(loginSuccess(res.data))
      }
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={handleSingin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signinWithGoogle}>Sign in with Google</Button>
        <Input placeholder="username" />
        <Input placeholder="email" />
        <Input type="password" placeholder="password" />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
