import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
        escapeValue: false
    },

    resources: {
        en: {
            translation: {
                login: {
                    title: "Library Demo App",
                    username: "Username",
                    password: "Password",
                    button: "Login",
                    error: "Login error! Please check your credentials."
                }
            }
        },
      es: {
          translation: {
              login: {
                title: "Library Demo App",
                username: "Usuario",
                password: "Contraseña",
                button: "Entrar",
                error: "Error de ingreso! Por favor verifique sus credenciales."
              }
          }
      },
      fr: {
          translation: {
              login: {
                title: "Library Demo App",
                username: "Nom",
                password: "Passe",
                button: "Entrer",
                error: "Erreur de connexion ! Veuillez vérifier vos identifiants."
            }
          }
      }
    }
})

export default i18n
