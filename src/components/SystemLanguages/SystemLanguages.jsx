import React from 'react'
import { useTranslation } from 'react-i18next'
import { setUserSettings } from '../../utils/loginDataManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import OurModal from '../common/OurModal/OurModal'
import FormSystemLanguages from './FormSystemLanguages'

const SystemLanguages = () => {
  const { t, i18n } = useTranslation('languages')

  const languagesOptions = () => [
    { label: t('languageOptionEnglish'), value: 'en-GB' },
    { label: t('languageOptionPortuguese'), value: 'pt-BR' },
  ]

  const handleInputChange = ({ target: { value } }) => {
    i18n.changeLanguage(value)
    setUserSettings({ language: value })
  }

  const title = (
    <React.Fragment>
      {' '}
      <FontAwesomeIcon icon={faLanguage} /> {`${t('title')}`}{' '}
    </React.Fragment>
  )

  return (
    <OurModal
      body={FormSystemLanguages}
      size="sm"
      title={title}
      valueSelected={i18n.language}
      optionsLanguages={languagesOptions()}
      handleInputChange={handleInputChange}
      buttonText={<FontAwesomeIcon icon={faLanguage} />}
      buttonVariant="primary"
    />
  )
}

export default SystemLanguages
