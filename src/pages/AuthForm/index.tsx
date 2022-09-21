import { Alert, Button, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./AuthForm.module.css"

type Form = {
  login: string
  password: string
}

type UsersName = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export const AuthForm = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<UsersName[]>([])
  const [error, setError] = useState<Boolean>(false)
  const [formValues, setFormValues] = useState<Form>({
    login: "",
    password: "",
  })

  const handleInputChange = (e: React.FormEvent<EventTarget>) => {
    const { name, value } = e.target as HTMLInputElement
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()
    setFormValues({ login: "", password: "" })
  }

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
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
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="sd"
        >
          Вход
        </Button>
      </form>
    </div>
  )
}
