import {Alert, Button, InputAdornment, TextField, Typography} from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import React, {useState} from "react"
import { useNavigate } from "react-router-dom"

import { Pages } from "../../constans"
import styles from "./AuthForm.module.css"
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../redux/store";
import {fetchAuthUser, selectUser} from "../../redux/slices/userSlice";

export type Form = {
  login: string
  password: string
}

export const AuthForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { error } = useSelector(selectUser)
  const [formValues, setFormValues] = useState<Form>({
    login: "",
    password: "",
  })

  const handleInputChange = (e: React.FormEvent<EventTarget>) => {
    const {name, value} = e.target as HTMLInputElement
    setFormValues({...formValues, [name]: value})
  };

  const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()
    setFormValues({ login: "", password: "", } )
    const isUser = await dispatch(fetchAuthUser(formValues)).unwrap()

    if (isUser) {
      navigate(Pages.Contacts)
    }
  }

  return (
      <div className={styles.root}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Typography variant="h4" sx={{textAlign: "center"}}>
            Авторизация
          </Typography>
          <TextField
              margin="normal"
              label="Логин"
              name="login"
              type="text"
              value={formValues.login}
              fullWidth
              onChange={handleInputChange}
              required
              InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                ),
              }}
          />

          <TextField
              margin="normal"
              label="Пароль"
              name="password"
              type="password"
              value={formValues.password}
              fullWidth
              onChange={handleInputChange}
              required
              InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                ),
              }}
          />
          <Button
              sx={{mt: '10px'}}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="sd"
          >
            Вход
          </Button>
        </form>
        {error && (
            <Alert severity="error" sx={{marginTop: 2, justifyContent: "center"}}>
              {error}
            </Alert>
        )}
      </div>
  );
}
