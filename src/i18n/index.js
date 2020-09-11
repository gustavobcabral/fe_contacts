import enUS from './languages/en-US'
import ptBR from './languages/pt-BR'

export default {
  dateTimeFormats: {
    'en-US': {
      long: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      },
      date: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      time: {
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    'pt-BR': {
      long: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      },
      date: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      time: {
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  },
  messages: {
    'en-US': enUS,
    'pt-BR': ptBR

  }
}
