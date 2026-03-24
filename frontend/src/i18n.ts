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
                    title: "AGM Library Demo",
      username: "Username",
      password: "Password",
      button: "Login",
      error: "Login error!",
      error_creds: "Please check your credentials."
                },
      main: {
          search: "Search by title, author, tags...",
      empty: "No media has been added.",
      logout: "Logout",
      submit: "Submit",
      erase: "Delete",
      edit: "Edit",
      cancel: "Cancel",
      save: "Save"
      },
      media: {
          add: "Add Media",
      title: "Title",
      creator: "Creator",
      desc: "Description",
      tags: "Tags (comma separated)",
      erase: "Are you sure you want to erase?",
      },
      status: {
          ready: "ready",
      loaned: "loaned",
      returned: "returned",
      checkout: "Checkout",
      checkin: "Return"
      }
            }
        },

      es: {
          translation: {
              login: {
                  title: "Demo de Biblioteca AGM",
      username: "Usuario",
      password: "Contraseña",
      button: "Entrar",
      error: "¡Error de inicio de sesión!",
      error_creds: "Por favor verifique sus credenciales."
              },
      main: {
          search: "Buscar por título, autor, etiquetas...",
      empty: "No se ha agregado ningún elemento.",
      logout: "Cerrar sesión",
      submit: "Enviar",
      erase: "Eliminar",
      edit: "Editar",
      cancel: "Cancelar",
      save: "Guardar"
      },
      media: {
          add: "Agregar medio",
          title: "Título",
          creator: "Autor",
          desc: "Descripción",
          tags: "Etiquetas (separadas por comas)",
      erase: "¿Está seguro de que desea eliminar?"
      },
      status: {
          ready: "disponible",
          loaned: "prestado",
          returned: "devuelto",
          checkout: "Prestar",
          checkin: "Devolver"
      }
          }
      },

      fr: {
          translation: {
              login: {
                  title: "Démo Bibliothèque AGM",
                  username: "Nom d'utilisateur",
                  password: "Mot de passe",
                  button: "Se connecter",
                  error: "Erreur de connexion !",
                  error_creds: "Veuillez vérifier vos identifiants."
              },
              main: {
                  search: "Rechercher par titre, auteur, tags...",
      empty: "Aucun média n'a été ajouté.",
      logout: "Se déconnecter",
      submit: "Soumettre",
      erase: "Supprimer",
      edit: "Modifier",
      cancel: "Annuler",
      save: "Enregistrer"
              },
              media: {
                  add: "Ajouter un média",
      title: "Titre",
      creator: "Auteur",
      desc: "Description",
      tags: "Tags (séparés par des virgules)",
      erase: "Êtes-vous sûr de vouloir supprimer ?"
              },
              status: {
                  ready: "disponible",
      loaned: "emprunté",
      returned: "retourné",
      checkout: "Emprunter",
      checkin: "Retourner"
              }
          }
      }
    }
})

export default i18n
