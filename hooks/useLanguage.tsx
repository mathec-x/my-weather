import React from 'react'

export default function useLanguage() {
  const [lang, setLang] = React.useState(navigator?.language || '')

  React.useEffect(() => {
    if (navigator && "language" in navigator) {
      setLang(navigator.language)
    }
  })

  return lang
}