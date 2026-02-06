# Page snapshot

```yaml
- generic [ref=e2]:
  - main [ref=e3]:
    - link "Shop System" [ref=e7] [cursor=pointer]:
      - /url: /
    - generic [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]: Вход в систему
        - generic [ref=e13]: Введите ваш email и пароль для входа.
      - generic [ref=e15]:
        - generic [ref=e16]:
          - text: Email
          - textbox "Email" [ref=e17]:
            - /placeholder: user@example.com
        - generic [ref=e18]:
          - text: Пароль
          - textbox "Пароль" [ref=e19]:
            - /placeholder: ••••••••
        - button "Войти" [ref=e20] [cursor=pointer]
        - generic [ref=e21]:
          - text: Нет аккаунта?
          - link "Зарегистрироваться" [ref=e22] [cursor=pointer]:
            - /url: /register
  - region "Notifications alt+T"
```